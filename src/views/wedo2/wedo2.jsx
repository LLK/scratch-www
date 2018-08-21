const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');


const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');

const FlexRow = require('../../components/flex-row/flex-row.jsx');

const OSChooser = require('../../components/os-chooser/os-chooser.jsx');

const ExtensionLanding = require('../../components/extension-landing/extension-landing.jsx');
const ExtensionHeader = require('../../components/extension-landing/extension-header.jsx');
const ExtensionRequirements = require('../../components/extension-landing/extension-requirements.jsx');
const ExtensionSection = require('../../components/extension-landing/extension-section.jsx');
const InstallScratchLink = require('../../components/extension-landing/install-scratch-link.jsx');
const ProjectCard = require('../../components/extension-landing/project-card.jsx');

const Steps = require('../../components/steps/steps.jsx');
const Step = require('../../components/steps/step.jsx');

require('../../components/extension-landing/extension-landing.scss');
require('./wedo2.scss');

class Wedo2 extends ExtensionLanding {
    render () {
        return (
            <div className="extension-landing wedo2">
                <ExtensionHeader imageSrc="/images/wedo2/wedo2-illustration.png">
                    <FlexRow className="column extension-copy">
                        <h2><img src="/images/wedo2/wedo2.svg" />LEGO WeDo 2.0</h2>
                        <FormattedMessage
                            id="wedo2.headerText"
                            values={{
                                wedo2Link: (
                                    <a
                                        href="https://education.lego.com/en-us/elementary/intro/wedo2"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                                LEGO Education WeDo 2.0
                                    </a>
                                )
                            }}
                        />
                    </FlexRow>
                    <ExtensionRequirements>
                        <span>
                            <img src="/svgs/extensions/windows.svg" />
                                        Windows 10+
                        </span>
                        <span>
                            <img src="/svgs/extensions/mac.svg" />
                                        macOS 10.13+
                        </span>
                        <span>
                            <img src="/svgs/extensions/bluetooth.svg" />
                                        Bluetooth
                        </span>
                        <span>
                            <img src="/svgs/extensions/scratch-link.svg" />
                                        Scratch Link
                        </span>
                    </ExtensionRequirements>
                </ExtensionHeader>
                <OSChooser
                    currentOS={this.state.OS}
                    handleSetOS={this.onSetOS}
                />
                <InstallScratchLink
                    currentOS={this.state.OS}
                />
                <ExtensionSection className="getting-started">
                    <h2><FormattedMessage id="wedo2.gettingStarted" /></h2>
                    <FlexRow className="column getting-started-section">
                        <h3><FormattedMessage id="wedo2.connectingWedo2" /></h3>
                        <Steps>
                            <Step number={1}>
                                <div className="step-image">
                                    <img
                                        className="screenshot"
                                        src="/images/wedo2/wedo2-connect-1.png"
                                    />
                                </div>
                                <p>
                                    <FormattedMessage
                                        id="wedo2.useScratch3"
                                        values={{
                                            scratch3Link: (
                                                <a
                                                    href="https://beta.scratch.mit.edu/"
                                                    rel="noopener noreferrer"
                                                    target="_blank"
                                                >
                                                            Scratch 3.0
                                                </a>
                                            )
                                        }}
                                    />
                                </p>
                            </Step>
                            <Step number={2}>
                                <div className="step-image">
                                    <img
                                        className="screenshot"
                                        src="/images/wedo2/wedo2-connect-2.png"
                                    />
                                </div>
                                <p><FormattedMessage id="wedo2.addExtension" /></p>
                            </Step>
                        </Steps>
                    </FlexRow>
                </ExtensionSection>
                <ExtensionSection className="blue things-to-try">
                    <h2><FormattedMessage id="wedo2.thingsToTry" /></h2>
                    <h3><FormattedMessage id="wedo2.makeMotorMove" /></h3>
                    <Steps>
                        <Step
                            compact
                            number={1}
                        >
                            <span className="step-description">
                                <FormattedMessage id="wedo2.plugMotorIn" />
                            </span>
                            <div className="step-image">
                                <img src="/images/wedo2/wedo2-motor.png" />
                            </div>
                        </Step>
                        <Step
                            compact
                            number={2}
                        >
                            <span className="step-description">
                                <FormattedMessage
                                    id="wedo2.clickMotorBlock"
                                    values={{
                                        motorBlockText: (
                                            <strong><FormattedMessage id="wedo2.motorBlockText" /></strong>
                                        )
                                    }}
                                />
                            </span>
                            <div className="step-image">
                                <img src="/images/wedo2/wedo2-motor-turn-block.png" />
                            </div>
                        </Step>
                    </Steps>
                    <hr />
                    <h3><FormattedMessage id="wedo2.starterProjects" /></h3>
                    <Steps>
                        <ProjectCard
                            cardUrl="https://beta.scratch.mit.edu/#239284992"
                            description={this.props.intl.formatMessage({id: 'wedo2.starter1Description'})}
                            imageSrc="/images/wedo2/wedo2-starter1.png"
                            title={this.props.intl.formatMessage({id: 'wedo2.starter1Title'})}
                        />
                        <ProjectCard
                            cardUrl="https://beta.scratch.mit.edu/#239284997"
                            description={this.props.intl.formatMessage({id: 'wedo2.starter2Description'})}
                            imageSrc="/images/wedo2/wedo2-starter2.png"
                            title={this.props.intl.formatMessage({id: 'wedo2.starter2Title'})}
                        />
                        <ProjectCard
                            cardUrl="https://beta.scratch.mit.edu/#239285001"
                            description={this.props.intl.formatMessage({id: 'wedo2.starter3Description'})}
                            imageSrc="/images/wedo2/wedo2-starter3.png"
                            title={this.props.intl.formatMessage({id: 'wedo2.starter3Title'})}
                        />
                    </Steps>
                </ExtensionSection>
                <ExtensionSection className="faq">
                    <h2><FormattedMessage id="wedo2.troubleshootingTitle" /></h2>
                    <h3 className="faq-title"><FormattedMessage id="wedo2.closeScratchCopiesTitle" /></h3>
                    <p>
                        <FormattedMessage id="wedo2.closeScratchCopiesText" />
                    </p>
                    <h3 className="faq-title"><FormattedMessage id="wedo2.otherComputerConnectedTitle" /></h3>
                    <p>
                        <FormattedMessage id="wedo2.otherComputerConnectedText" />
                    </p>
                    <h3 className="faq-title"><FormattedMessage id="wedo2.legacyInfoTitle" /></h3>
                    <p>
                        <FormattedMessage
                            id="wedo2.legacyInfoText"
                            values={{
                                wedoLegacyLink: (
                                    <a
                                        href="https://scratch.mit.edu/wedo-legacy"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <FormattedMessage id="wedo2.legacyLinkText" />
                                    </a>
                                )
                            }}
                        />
                    </p>
                </ExtensionSection>
            </div>
        );
    }
}

Wedo2.propTypes = {
    intl: intlShape.isRequired
};

const WrappedWedo2 = injectIntl(Wedo2);

render(<Page><WrappedWedo2 /></Page>, document.getElementById('app'));
