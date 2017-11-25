import React from 'react';
import ReactIntl from 'react-intl';

var injectIntl = ReactIntl.injectIntl;
var FormattedMessage = ReactIntl.FormattedMessage;

import FlexRow from '../../../flex-row/flex-row.jsx';
import FooterBox from '../../container/footer.jsx';
import LanguageChooser from '../../../languagechooser/languagechooser.jsx';

require('../footer.scss');

var ConferenceFooter = React.createClass({
    type: 'ConferenceFooter',
    render: function () {
        return (
            <FooterBox>
                <FlexRow className="scratch-links">
                    <div className="family">
                        <h4><FormattedMessage id='footer.scratchFamily' /></h4>
                        <FlexRow>
                            <FlexRow as="ul" className="column">
                                <li>
                                    <a href="https://scratch.mit.edu" target="_blank">Scratch</a>
                                </li>
                                <li>
                                    <a href="http://www.scratchjr.org/" target="_blank">ScratchJr</a>
                                </li>
                            </FlexRow>
                            <FlexRow as="ul" className="column">
                                <li>
                                    <a href="http://www.scratchfoundation.org/" target="_blank">Scratch Foundation</a>
                                </li>
                                <li>
                                    <a href="http://scratched.gse.harvard.edu/" target="_blank">ScratchEd</a>
                                </li>
                            </FlexRow>
                            <FlexRow as="ul" className="column">
                                <li>
                                    <a href="http://day.scratch.mit.edu" target="_blank">Scratch Day</a>
                                </li>
                            </FlexRow>
                        </FlexRow>
                        <p className="legal">
                            <FormattedMessage id='general.copyright' />
                        </p>
                    </div>
                    <div className="media">
                        <div className="contact-us">
                            <h4>Contact</h4>
                            <p>
                                <a href="mailto:help@scratch.mit.edu" target="_blank">
                                    Email Us
                                </a>
                            </p>
                        </div>
                        <div className="social">
                            <FlexRow as="ul">
                                <li>
                                    <a href="//www.twitter.com/scratch" target="_blank">
                                        <img src="/images/conference/footer/twitter.png" alt="scratch twitter" />
                                    </a>
                                </li>
                                <li>
                                    <a href="//www.facebook.com/scratchteam" target="_blank">
                                        <img src="/images/conference/footer/facebook.png" alt="scratch facebook" />
                                    </a>
                                </li>
                                <li>
                                    <a href="http://medium.com/scratchfoundation-blog" target="_blank">
                                        <img src="/images/conference/footer/medium.png" alt="scratch foundation blog" />
                                    </a>
                                </li>
                            </FlexRow>
                        </div>
                    </div>
                </FlexRow>
                <LanguageChooser locale={this.props.intl.locale} />
            </FooterBox>
        );
    }
});

export default injectIntl(ConferenceFooter);
