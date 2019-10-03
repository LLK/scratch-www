const classNames = require('classnames');
const React = require('react');
const PropTypes = require('prop-types');

const NextStepButton = require('./next-step-button.jsx');
const ModalTitle = require('../modal/base/modal-title.jsx');
const ModalInnerContent = require('../modal/base/modal-inner-content.jsx');

require('./join-flow-step.scss');

class JoinFlowStep extends React.Component {
    componentDidMount () {
        const progressionEls = document.getElementsByClassName('progression');
        const progressionEl = progressionEls[0];
        progressionEl.scrollIntoView();
    }
    render () {
        const {
            children,
            innerClassName,
            description,
            descriptionClassName,
            footerContent,
            headerImgSrc,
            nextButton,
            onSubmit,
            title,
            titleClassName,
            waiting
        } = this.props;
        return (
            <form onSubmit={onSubmit}>
                <div className="join-flow-outer-content">
                    {headerImgSrc && (
                        <div className="join-flow-header-image-wrapper">
                            <img
                                className="join-flow-header-image"
                                src={headerImgSrc}
                            />
                        </div>
                    )}
                    <div>
                        <ModalInnerContent
                            className={classNames(
                                'join-flow-inner-content',
                                innerClassName
                            )}
                        >
                            {title && (
                                <ModalTitle
                                    className={classNames(
                                        'join-flow-title',
                                        titleClassName
                                    )}
                                    title={title}
                                />
                            )}
                            {description && (
                                <div
                                    className={classNames(
                                        'join-flow-description',
                                        descriptionClassName
                                    )}
                                >
                                    {description}
                                </div>
                            )}
                            {children}
                        </ModalInnerContent>
                    </div>
                    <div>
                        {footerContent && (
                            <div className="join-flow-footer-message">
                                {footerContent}
                            </div>
                        )}
                        <NextStepButton
                            content={nextButton}
                            waiting={waiting}
                        />
                    </div>
                </div>
            </form>
        );
    }
}

JoinFlowStep.propTypes = {
    children: PropTypes.node,
    description: PropTypes.string,
    descriptionClassName: PropTypes.string,
    footerContent: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    headerImgSrc: PropTypes.string,
    innerClassName: PropTypes.string,
    nextButton: PropTypes.node,
    onSubmit: PropTypes.func,
    title: PropTypes.string,
    titleClassName: PropTypes.string,
    waiting: PropTypes.bool
};

module.exports = JoinFlowStep;
