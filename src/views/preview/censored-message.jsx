const injectIntl = require('react-intl').injectIntl;
const PropTypes = require('prop-types');
const React = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;

// Allow embedding html in banner messages coming from the server
const embedCensorMessage = message => (
    // eslint-disable-next-line react/no-danger
    <span dangerouslySetInnerHTML={{__html: message}} />
);

const communityGuidelinesLink = (
    <a href="/community_guidelines/">
        <FormattedMessage id="project.communityGuidelines" />
    </a>
);

const CensoredMessage = ({censoredByCommunity, messageHTML, reshareable}) => (
    <React.Fragment>
        {/* if message HTML is provided, set innerHTML with it */}
        {messageHTML ? embedCensorMessage(messageHTML) :
            (censoredByCommunity ? (
                <React.Fragment>
                    <FormattedMessage id="project.communityCensoredMessage" />
                    <br />
                    <br />
                    <FormattedMessage
                        id="project.willReviewCensoredMessage"
                        values={{communityGuidelinesLink: communityGuidelinesLink}}
                    />
                </React.Fragment>
            ) : (
                // if message is blank or missing, use default
                <React.Fragment>
                    <FormattedMessage
                        id="project.defaultCensoredMessage"
                        values={{communityGuidelinesLink: communityGuidelinesLink}}
                    />
                    <br />
                    <br />
                    {reshareable ? (
                        <FormattedMessage
                            id="project.tempCensoredMessage"
                            values={{communityGuidelinesLink: communityGuidelinesLink}}
                        />
                    ) : (
                        <FormattedMessage id="project.permCensoredMessage" />
                    )}
                </React.Fragment>
            ))
        }
    </React.Fragment>
);

CensoredMessage.propTypes = {
    censoredByCommunity: PropTypes.bool,
    messageHTML: PropTypes.string,
    reshareable: PropTypes.bool
};

module.exports = injectIntl(CensoredMessage);
