const injectIntl = require('react-intl').injectIntl;
const PropTypes = require('prop-types');
const intlShape = require('react-intl').intlShape;
const FormattedMessage = require('react-intl').FormattedMessage;

const MediaQuery = require('react-responsive').default;
const React = require('react');
const Formsy = require('formsy-react').default;
const classNames = require('classnames');

const GUI = require('scratch-gui').default;
const IntlGUI = injectIntl(GUI);

const AdminPanel = require('../../components/adminpanel/adminpanel.jsx');
const CommentingStatus = require('../../components/commenting-status/commenting-status.jsx');
const decorateText = require('../../lib/decorate-text.jsx');
const FlexRow = require('../../components/flex-row/flex-row.jsx');
const Button = require('../../components/forms/button.jsx');
const Avatar = require('../../components/avatar/avatar.jsx');
const Banner = require('./banner.jsx');
const CensoredMessage = require('./censored-message.jsx');
const ModInfo = require('./mod-info.jsx');
const RemixCredit = require('./remix-credit.jsx');
const RemixList = require('./remix-list.jsx');
const Stats = require('./stats.jsx');
const StudioList = require('./studio-list.jsx');
const Subactions = require('./subactions.jsx');
const InplaceInput = require('../../components/forms/inplace-input.jsx');
const ToggleSlider = require('../../components/forms/toggle-slider.jsx');
const TopLevelComment = require('./comment/top-level-comment.jsx');
const ComposeComment = require('./comment/compose-comment.jsx');
const ExtensionChip = require('./extension-chip.jsx');
const thumbnailUrl = require('../../lib/user-thumbnail');
const FormsyProjectUpdater = require('./formsy-project-updater.jsx');

const projectShape = require('./projectshape.jsx').projectShape;
require('./preview.scss');

const frameless = require('../../lib/frameless');

// disable enter key submission on formsy input fields; otherwise formsy thinks
// we meant to trigger the "See inside" button. Instead, treat these keypresses
// as a blur, which will trigger a save.
const onKeyPress = e => {
    if (e.target.type === 'text' && e.which === 13 /* Enter */) {
        e.preventDefault();
        e.target.blur();
    }
};

const PreviewPresentation = ({
    addToStudioOpen,
    adminModalOpen,
    adminPanelOpen,
    assetHost,
    authorUsername,
    backpackHost,
    canAddToStudio,
    canDeleteComments,
    canRemix,
    canReport,
    canRestoreComments,
    canSave,
    canShare,
    canToggleComments,
    canUseBackpack,
    cloudHost,
    comments,
    editable,
    extensions,
    faved,
    favoriteCount,
    intl,
    isAdmin,
    isFullScreen,
    isLoggedIn,
    isNewScratcher,
    isProjectCommentsGloballyEnabled,
    isProjectLoaded,
    isRemixing,
    isScratcher,
    isShared,
    justRemixed,
    justShared,
    loveCount,
    loved,
    modInfo,
    moreCommentsToLoad,
    onAddComment,
    onAddToStudioClicked,
    onAddToStudioClosed,
    onCloseAdminPanel,
    onDeleteComment,
    onFavoriteClicked,
    onGreenFlag,
    onLoadMore,
    onLoadMoreReplies,
    onLoveClicked,
    onOpenAdminPanel,
    onProjectLoaded,
    onRemix,
    onRemixing,
    onReportClicked,
    onReportClose,
    onReportComment,
    onReportSubmit,
    onRestoreComment,
    onSeeAllComments,
    onSeeInside,
    onSetProjectThumbnailer,
    onShare,
    onSocialClicked,
    onSocialClosed,
    onToggleComments,
    onToggleStudio,
    onUpdateProjectData,
    onUpdateProjectId,
    onUpdateProjectThumbnail,
    originalInfo,
    parentInfo,
    showCloudDataAlert,
    showUsernameBlockAlert,
    projectHost,
    projectId,
    projectInfo,
    projectStudios,
    remixes,
    replies,
    reportOpen,
    showAdminPanel,
    showModInfo,
    singleCommentId,
    socialOpen,
    userOwnsProject,
    visibilityInfo
}) => {
    const shareDate = ((projectInfo.history && projectInfo.history.shared)) ? projectInfo.history.shared : '';
    const revisedDate = ((projectInfo.history && projectInfo.history.modified)) ? projectInfo.history.modified : '';
    const showInstructions = editable || projectInfo.instructions ||
        (!projectInfo.instructions && !projectInfo.description); // show if both are empty
    const showNotesAndCredits = editable || projectInfo.description ||
        (!projectInfo.instructions && !projectInfo.description); // show if both are empty
    let banner;
    if (visibilityInfo.deleted) { // If both censored and deleted, prioritize deleted banner
        banner = (<Banner
            className="banner-danger"
            message={<FormattedMessage id="project.deletedBanner" />}
        />);
    } else if (visibilityInfo.censored) {
        const censoredMessage = (
            <CensoredMessage
                censoredByCommunity={visibilityInfo.censoredByCommunity}
                messageHTML={visibilityInfo.message}
                reshareable={visibilityInfo.reshareable}
            />
        );
        banner = (<Banner
            className="banner-danger"
            message={censoredMessage}
        />);
    } else if (justRemixed) {
        banner = (
            <Banner
                className="banner-success"
                message={
                    <FormattedMessage
                        id="project.remix.justRemixed"
                        values={{title: projectInfo.title}}
                    />
                }
            />
        );
    } else if (canShare) {
        if (isShared && justShared) { // if was shared a while ago, don't show any share banner
            if (isNewScratcher) {
                banner = (<Banner
                    className="banner-success"
                    message={<FormattedMessage id="project.share.sharedLong" />}
                />);
            } else {
                banner = (<Banner
                    className="banner-success"
                    message={<FormattedMessage id="project.share.sharedShort" />}
                />);
            }
        } else if (!isShared) {
            banner = (<Banner
                actionMessage={<FormattedMessage id="project.share.shareButton" />}
                message={<FormattedMessage id="project.share.notShared" />}
                onAction={onShare}
            />);
        }
    }

    const extensionChips = (
        <FlexRow className="extension-list">
            {extensions && extensions.map(extension => (
                <ExtensionChip
                    action={extension.action}
                    extensionL10n={extension.l10nId}
                    extensionName={extension.name}
                    hasStatus={extension.hasStatus}
                    iconURI={extension.icon && `/svgs/project/${extension.icon}`}
                    key={extension.name || extension.l10nId}
                />
            ))}
        </FlexRow>
    );
    return (
        <div className="preview">
            {showAdminPanel && (
                <AdminPanel
                    className={classNames('project-admin-panel', {
                        'admin-panel-open': adminPanelOpen,
                        'modal-open': adminModalOpen
                    })}
                    isOpen={adminPanelOpen}
                    onClose={onCloseAdminPanel}
                    onOpen={onOpenAdminPanel}
                >
                    <iframe
                        className={classNames('admin-iframe', {
                            'modal-open': adminModalOpen
                        })}
                        src={`/scratch2/${projectId}/adminpanel/`}
                    />
                </AdminPanel>
            )}
            { projectInfo && projectInfo.author && projectInfo.author.id && (
                <React.Fragment>
                    {banner}
                    <div className="inner">
                        <FlexRow className="preview-row force-row">
                            <FlexRow className="project-header">
                                <a href={`/users/${projectInfo.author.username}`}>
                                    <Avatar
                                        alt={projectInfo.author.username}
                                        src={thumbnailUrl(projectInfo.author.id, 48)}
                                    />
                                </a>
                                <div className="title">
                                    {editable ?
                                        <FormsyProjectUpdater
                                            field="title"
                                            initialValue={projectInfo.title}
                                        >
                                            {(value, ref, handleUpdate) => (
                                                <Formsy
                                                    ref={ref}
                                                    onKeyPress={onKeyPress}
                                                >
                                                    <InplaceInput
                                                        className="project-title"
                                                        handleUpdate={handleUpdate}
                                                        name="title"
                                                        validationErrors={{
                                                            maxLength: intl.formatMessage({
                                                                id: 'project.titleMaxLength'
                                                            })
                                                        }}
                                                        validations={{
                                                            maxLength: 100
                                                        }}
                                                        value={value}
                                                    />
                                                </Formsy>
                                            )}
                                        </FormsyProjectUpdater> :
                                        <React.Fragment>
                                            <div
                                                className="project-title no-edit"
                                                title={projectInfo.title}
                                            >{projectInfo.title}</div>
                                            {'by '}
                                            <a href={`/users/${projectInfo.author.username}`}>
                                                {projectInfo.author.username}
                                            </a>
                                        </React.Fragment>
                                    }
                                </div>
                            </FlexRow>
                            <MediaQuery minWidth={frameless.mobile}>
                                <div className="project-buttons">
                                    {canRemix &&
                                        <Button
                                            alt={intl.formatMessage({id: 'project.remixButton.altText'})}
                                            className={classNames([
                                                'remix-button',
                                                {
                                                    disabled: isRemixing || !isProjectLoaded,
                                                    remixing: isRemixing
                                                }
                                            ])}
                                            disabled={isRemixing || !isProjectLoaded}
                                            title={intl.formatMessage({id: 'project.remixButton.altText'})}
                                            onClick={onRemix}
                                        >
                                            {isRemixing ? (
                                                <FormattedMessage id="project.remixButton.remixing" />
                                            ) : (
                                                <FormattedMessage id="project.remixButton" />
                                            )}
                                        </Button>
                                    }
                                    <Button
                                        className="button see-inside-button"
                                        onClick={onSeeInside}
                                    >
                                        <FormattedMessage id="project.seeInsideButton" />
                                    </Button>
                                </div>
                            </MediaQuery>
                        </FlexRow>
                        <FlexRow className="preview-row">
                            <div
                                className={classNames(
                                    'guiPlayer',
                                    {fullscreen: isFullScreen}
                                )}
                            >
                                {showCloudDataAlert && (
                                    <FlexRow className="project-info-alert">
                                        <FormattedMessage id="project.cloudDataAlert" />
                                    </FlexRow>
                                )}
                                {showUsernameBlockAlert && (
                                    <FlexRow className="project-info-alert">
                                        <FormattedMessage id="project.usernameBlockAlert" />
                                    </FlexRow>
                                )}
                                <IntlGUI
                                    isPlayerOnly
                                    assetHost={assetHost}
                                    backpackHost={backpackHost}
                                    backpackVisible={canUseBackpack}
                                    basePath="/"
                                    canRemix={canRemix}
                                    canSave={canSave}
                                    className="guiPlayer"
                                    cloudHost={cloudHost}
                                    hasCloudPermission={isScratcher}
                                    isFullScreen={isFullScreen}
                                    previewInfoVisible="false"
                                    projectHost={projectHost}
                                    projectId={projectId}
                                    onGreenFlag={onGreenFlag}
                                    onProjectLoaded={onProjectLoaded}
                                    onRemixing={onRemixing}
                                    onSetProjectThumbnailer={onSetProjectThumbnailer}
                                    onUpdateProjectData={onUpdateProjectData}
                                    onUpdateProjectId={onUpdateProjectId}
                                    onUpdateProjectThumbnail={onUpdateProjectThumbnail}
                                />
                            </div>
                            <MediaQuery maxWidth={frameless.tabletPortrait - 1}>
                                <FlexRow className="preview-row force-center">
                                    <div className="wrappable-item">
                                        <Stats
                                            faved={faved}
                                            favoriteCount={favoriteCount}
                                            loveCount={loveCount}
                                            loved={loved}
                                            projectInfo={projectInfo}
                                            onFavoriteClicked={onFavoriteClicked}
                                            onLoveClicked={onLoveClicked}
                                        />
                                    </div>
                                    <div className="wrappable-item">
                                        <Subactions
                                            addToStudioOpen={addToStudioOpen}
                                            canReport={canReport}
                                            isAdmin={isAdmin}
                                            isShared={isShared}
                                            projectInfo={projectInfo}
                                            reportOpen={reportOpen}
                                            shareDate={shareDate}
                                            socialOpen={socialOpen}
                                            userOwnsProject={userOwnsProject}
                                            onAddToStudioClicked={onAddToStudioClicked}
                                            onAddToStudioClosed={onAddToStudioClosed}
                                            onReportClicked={onReportClicked}
                                            onReportClose={onReportClose}
                                            onReportSubmit={onReportSubmit}
                                            onSocialClicked={onSocialClicked}
                                            onSocialClosed={onSocialClosed}
                                            onToggleStudio={onToggleStudio}
                                        />
                                    </div>
                                </FlexRow>
                            </MediaQuery>
                            <FlexRow className="project-notes">
                                <RemixCredit projectInfo={parentInfo} />
                                <RemixCredit projectInfo={originalInfo} />
                                {/*  eslint-disable max-len */}
                                <MediaQuery maxWidth={frameless.tabletPortrait - 1}>
                                    {(extensions && extensions.length) ? (
                                        <FlexRow className="preview-row">
                                            {extensionChips}
                                        </FlexRow>
                                    ) : null}
                                </MediaQuery>
                                {showInstructions && (
                                    <div className="description-block">
                                        <div className="project-textlabel">
                                            <FormattedMessage id="project.instructionsLabel" />
                                        </div>
                                        {editable ?
                                            <FormsyProjectUpdater
                                                field="instructions"
                                                initialValue={projectInfo.instructions}
                                            >
                                                {(value, ref, handleUpdate) => (
                                                    <Formsy
                                                        className="project-description-form"
                                                        ref={ref}
                                                        onKeyPress={onKeyPress}
                                                    >
                                                        <InplaceInput
                                                            className={classNames(
                                                                'project-description-edit',
                                                                {remixes: parentInfo && parentInfo.author}
                                                            )}
                                                            handleUpdate={handleUpdate}
                                                            name="instructions"
                                                            placeholder={intl.formatMessage({
                                                                id: 'project.descriptionPlaceholder'
                                                            })}
                                                            type="textarea"
                                                            validationErrors={{
                                                                maxLength: intl.formatMessage({
                                                                    id: 'project.descriptionMaxLength'
                                                                })
                                                            }}
                                                            validations={{
                                                                maxLength: 5000
                                                            }}
                                                            value={value}
                                                        />
                                                    </Formsy>
                                                )}
                                            </FormsyProjectUpdater> :
                                            <div className="project-description">
                                                {decorateText(projectInfo.instructions, {
                                                    usernames: true,
                                                    hashtags: true,
                                                    scratchLinks: true
                                                })}
                                            </div>
                                        }
                                    </div>
                                )}
                                {showNotesAndCredits && (
                                    <div className="description-block">
                                        <div className="project-textlabel">
                                            <FormattedMessage id="project.notesAndCreditsLabel" />
                                        </div>
                                        {editable ?
                                            <FormsyProjectUpdater
                                                field="description"
                                                initialValue={projectInfo.description}
                                            >
                                                {(value, ref, handleUpdate) => (
                                                    <Formsy
                                                        className="project-description-form"
                                                        ref={ref}
                                                        onKeyPress={onKeyPress}
                                                    >
                                                        <InplaceInput
                                                            className={classNames(
                                                                'project-description-edit',
                                                                'last',
                                                                {remixes: parentInfo && parentInfo.author}
                                                            )}
                                                            handleUpdate={handleUpdate}
                                                            name="description"
                                                            placeholder={intl.formatMessage({
                                                                id: 'project.notesPlaceholder'
                                                            })}
                                                            type="textarea"
                                                            validationErrors={{
                                                                maxLength: intl.formatMessage({
                                                                    id: 'project.descriptionMaxLength'
                                                                })
                                                            }}
                                                            validations={{
                                                                maxLength: 5000
                                                            }}
                                                            value={value}
                                                        />
                                                    </Formsy>
                                                )}
                                            </FormsyProjectUpdater> :
                                            <div className="project-description">
                                                {decorateText(projectInfo.description, {
                                                    usernames: true,
                                                    hashtags: true,
                                                    scratchLinks: true
                                                })}
                                            </div>
                                        }
                                    </div>
                                )}
                                {/*  eslint-enable max-len */}
                            </FlexRow>
                        </FlexRow>
                        <MediaQuery minWidth={frameless.tabletPortrait}>
                            <FlexRow className="preview-row">
                                <Stats
                                    faved={faved}
                                    favoriteCount={favoriteCount}
                                    loveCount={loveCount}
                                    loved={loved}
                                    projectInfo={projectInfo}
                                    onFavoriteClicked={onFavoriteClicked}
                                    onLoveClicked={onLoveClicked}
                                />
                                <Subactions
                                    addToStudioOpen={addToStudioOpen}
                                    canAddToStudio={canAddToStudio}
                                    canReport={canReport}
                                    isAdmin={isAdmin}
                                    isShared={isShared}
                                    projectInfo={projectInfo}
                                    reportOpen={reportOpen}
                                    shareDate={shareDate}
                                    socialOpen={socialOpen}
                                    userOwnsProject={userOwnsProject}
                                    onAddToStudioClicked={onAddToStudioClicked}
                                    onAddToStudioClosed={onAddToStudioClosed}
                                    onReportClicked={onReportClicked}
                                    onReportClose={onReportClose}
                                    onReportSubmit={onReportSubmit}
                                    onSocialClicked={onSocialClicked}
                                    onSocialClosed={onSocialClosed}
                                    onToggleStudio={onToggleStudio}
                                />
                            </FlexRow>
                        </MediaQuery>
                        <MediaQuery minWidth={frameless.tabletPortrait}>
                            {(extensions && extensions.length) ? (
                                <FlexRow className="preview-row">
                                    {extensionChips}
                                </FlexRow>
                            ) : null}
                        </MediaQuery>
                        {showModInfo &&
                            <FlexRow className="preview-row">
                                <ModInfo
                                    authorUsername={authorUsername}
                                    revisedDate={revisedDate}
                                    scripts={modInfo.scriptCount}
                                    sprites={modInfo.spriteCount}
                                />
                            </FlexRow>
                        }
                    </div>
                    <div
                        className={classNames('project-lower-container', {
                            hidden: isFullScreen
                        })}
                    >
                        <div className="inner">
                            <FlexRow className="preview-row">
                                <div className="comments-container">
                                    <FlexRow className="comments-header">
                                        <h4><FormattedMessage id="project.comments.header" /></h4>
                                        {canToggleComments ? (
                                            <div>
                                                {projectInfo.comments_allowed ? (
                                                    <FormattedMessage id="project.comments.toggleOn" />
                                                ) : (
                                                    <FormattedMessage id="project.comments.toggleOff" />
                                                )}
                                                <ToggleSlider
                                                    checked={projectInfo.comments_allowed}
                                                    className="comments-allowed-input"
                                                    onChange={onToggleComments}
                                                />
                                            </div>
                                        ) : null}
                                    </FlexRow>
                                    {isProjectCommentsGloballyEnabled ? (
                                        <React.Fragment>
                                            {/* Do not show the top-level comment form in single comment mode */}
                                            {!singleCommentId && (
                                                <FlexRow className="comments-root-reply">
                                                    {projectInfo.comments_allowed ? (
                                                        isLoggedIn ? (
                                                            isShared && <ComposeComment
                                                                postURI={`/proxy/comments/project/${projectId}`}
                                                                onAddComment={onAddComment}
                                                            />
                                                        ) : (
                                                        /* TODO add box for signing in to leave a comment */
                                                            null
                                                        )
                                                    ) : (
                                                        <div className="comments-turned-off">
                                                            <FormattedMessage id="project.comments.turnedOff" />
                                                        </div>
                                                    )}
                                                </FlexRow>
                                            )}
                                            <FlexRow className="comments-list">
                                                {comments.map(comment => (
                                                    <TopLevelComment
                                                        author={comment.author}
                                                        canDelete={canDeleteComments}
                                                        canDeleteWithoutConfirm={isAdmin}
                                                        canReply={
                                                            isLoggedIn && projectInfo.comments_allowed && isShared
                                                        }
                                                        canReport={isLoggedIn}
                                                        canRestore={canRestoreComments}
                                                        content={comment.content}
                                                        datetimeCreated={comment.datetime_created}
                                                        defaultExpanded={!!singleCommentId}
                                                        highlightedCommentId={singleCommentId}
                                                        id={comment.id}
                                                        key={comment.id}
                                                        moreRepliesToLoad={comment.moreRepliesToLoad}
                                                        parentId={comment.parent_id}
                                                        postURI={`/proxy/comments/project/${projectId}`}
                                                        replies={
                                                            replies && replies[comment.id] ? replies[comment.id] : []
                                                        }
                                                        visibility={comment.visibility}
                                                        onAddComment={onAddComment}
                                                        onDelete={onDeleteComment}
                                                        onLoadMoreReplies={onLoadMoreReplies}
                                                        onReport={onReportComment}
                                                        onRestore={onRestoreComment}
                                                    />
                                                ))}
                                                {moreCommentsToLoad &&
                                                <Button
                                                    className="button load-more-button"
                                                    onClick={onLoadMore}
                                                >
                                                    <FormattedMessage id="general.loadMore" />
                                                </Button>
                                                }
                                                {!!singleCommentId &&
                                                    <Button
                                                        className="button load-more-button"
                                                        onClick={onSeeAllComments}
                                                    >
                                                        <FormattedMessage id="general.seeAllComments" />
                                                    </Button>
                                                }
                                            </FlexRow>
                                        </React.Fragment>
                                    ) : (
                                        <div>
                                            <CommentingStatus>
                                                <p>
                                                    <FormattedMessage id="project.comments.turnedOffGlobally" />
                                                </p>
                                            </CommentingStatus>
                                            <img
                                                className="comment-placeholder-img"
                                                src="/images/comments/comment-placeholder.png"
                                            />
                                        </div>

                                    )}
                                </div>
                                <FlexRow className="column">
                                    <RemixList
                                        projectId={projectId}
                                        remixes={remixes}
                                    />
                                    <StudioList
                                        projectId={projectId}
                                        studios={projectStudios}
                                    />
                                </FlexRow>
                            </FlexRow>
                        </div>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};

PreviewPresentation.propTypes = {
    addToStudioOpen: PropTypes.bool,
    adminModalOpen: PropTypes.bool,
    adminPanelOpen: PropTypes.bool,
    assetHost: PropTypes.string,
    authorUsername: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    backpackHost: PropTypes.string,
    canAddToStudio: PropTypes.bool,
    canDeleteComments: PropTypes.bool,
    canRemix: PropTypes.bool,
    canReport: PropTypes.bool,
    canRestoreComments: PropTypes.bool,
    canSave: PropTypes.bool,
    canShare: PropTypes.bool,
    canToggleComments: PropTypes.bool,
    canUseBackpack: PropTypes.bool,
    cloudHost: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.object),
    editable: PropTypes.bool,
    extensions: PropTypes.arrayOf(PropTypes.object),
    faved: PropTypes.bool,
    favoriteCount: PropTypes.number,
    intl: intlShape,
    isAdmin: PropTypes.bool,
    isFullScreen: PropTypes.bool,
    isLoggedIn: PropTypes.bool,
    isNewScratcher: PropTypes.bool,
    isProjectCommentsGloballyEnabled: PropTypes.bool,
    isProjectLoaded: PropTypes.bool,
    isRemixing: PropTypes.bool,
    isScratcher: PropTypes.bool,
    isShared: PropTypes.bool,
    justRemixed: PropTypes.bool,
    justShared: PropTypes.bool,
    loveCount: PropTypes.number,
    loved: PropTypes.bool,
    modInfo: PropTypes.shape({
        scriptCount: PropTypes.number,
        spriteCount: PropTypes.number
    }),
    moreCommentsToLoad: PropTypes.bool,
    onAddComment: PropTypes.func,
    onAddToStudioClicked: PropTypes.func,
    onAddToStudioClosed: PropTypes.func,
    onCloseAdminPanel: PropTypes.func,
    onDeleteComment: PropTypes.func,
    onFavoriteClicked: PropTypes.func,
    onGreenFlag: PropTypes.func,
    onLoadMore: PropTypes.func,
    onLoadMoreReplies: PropTypes.func,
    onLoveClicked: PropTypes.func,
    onOpenAdminPanel: PropTypes.func,
    onProjectLoaded: PropTypes.func,
    onRemix: PropTypes.func,
    onRemixing: PropTypes.func,
    onReportClicked: PropTypes.func.isRequired,
    onReportClose: PropTypes.func.isRequired,
    onReportComment: PropTypes.func.isRequired,
    onReportSubmit: PropTypes.func.isRequired,
    onRestoreComment: PropTypes.func,
    onSeeAllComments: PropTypes.func,
    onSeeInside: PropTypes.func,
    onSetProjectThumbnailer: PropTypes.func,
    onShare: PropTypes.func,
    onSocialClicked: PropTypes.func,
    onSocialClosed: PropTypes.func,
    onToggleComments: PropTypes.func,
    onToggleStudio: PropTypes.func,
    onUpdateProjectData: PropTypes.func,
    onUpdateProjectId: PropTypes.func,
    onUpdateProjectThumbnail: PropTypes.func,
    originalInfo: projectShape,
    parentInfo: projectShape,
    projectHost: PropTypes.string,
    projectId: PropTypes.string,
    projectInfo: projectShape,
    projectStudios: PropTypes.arrayOf(PropTypes.object),
    remixes: PropTypes.arrayOf(PropTypes.object),
    replies: PropTypes.objectOf(PropTypes.array),
    reportOpen: PropTypes.bool,
    showAdminPanel: PropTypes.bool,
    showCloudDataAlert: PropTypes.bool,
    showModInfo: PropTypes.bool,
    showUsernameBlockAlert: PropTypes.bool,
    singleCommentId: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    socialOpen: PropTypes.bool,
    userOwnsProject: PropTypes.bool,
    visibilityInfo: PropTypes.shape({
        censored: PropTypes.bool,
        censoredByAdmin: PropTypes.bool,
        censoredByCommunity: PropTypes.bool,
        message: PropTypes.string,
        deleted: PropTypes.bool,
        reshareable: PropTypes.bool
    })
};

module.exports = injectIntl(PreviewPresentation);
