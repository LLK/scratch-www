const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');

const FlexRow = require('../../components/flex-row/flex-row.jsx');
const SubNavigation = require('../../components/subnavigation/subnavigation.jsx');
const TitleBanner = require('../../components/title-banner/title-banner.jsx');

const render = require('../../lib/render.jsx');
const Page = require('../../components/page/www/page.jsx');

require('./sec.scss');

const EducationCollaborative = () => (
    <div className="education-collaborative">
        <TitleBanner className="masthead">
            <div className="inner">
                <FlexRow className="masthead-info uneven">
                    <div className="long">
                        <h1 className="title-banner-h1">
                            <FormattedMessage id="sec.title" />
                        </h1>
                        <p className="title-banner-p intro">
                            <FormattedMessage
                                id="sec.intro"
                            />
                        </p>
                    </div>
                    <img
                        alt=""
                        className="short"
                        src="/images/sec/SEC-Top-img.svg"
                    />
                </FlexRow>
            </div>
        </TitleBanner>

        <div className="inner">
            <section id="projects">
                <h2><FormattedMessage id="sec.projectsTitle" /></h2>
                <p><FormattedMessage id="sec.projectsIntro" /></p>
                <p>
                    <FormattedMessage
                        id="sec.projectsIntro2"
                        values={{
                            culturallySustainingLink: <a
                                href="https://docs.google.com/document/d/1JcRBFhAXvMGKXgHADg1sAZC8b_zb2OSVDjaEOL8tzcw/edit#bookmark=id.4c6pah669jb5"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                <FormattedMessage id="sec.culturallySustaining" />
                            </a>
                        }}
                    />
                </p>
            </section>
            <section id="expectations-for-sec">
                <h3><FormattedMessage id="sec.expectationsFromSec" /></h3>
                <ul>
                    <li><FormattedMessage id="sec.expectationsFromSecPoint1" /></li>
                    <li><FormattedMessage id="sec.expectationsFromSecPoint2" /></li>
                    <li><FormattedMessage id="sec.expectationsFromSecPoint3" /></li>
                    <li><FormattedMessage id="sec.expectationsFromSecPoint4" /></li>
                </ul>
            </section>

            <section id="expectations-for-orgs">
                <h3><FormattedMessage id="sec.expectationsFromOrgs" /></h3>
                <ul>
                    <li><FormattedMessage id="sec.expectationsFromOrgsPoint1" /></li>
                    <li><FormattedMessage id="sec.expectationsFromOrgsPoint2" /></li>
                    <li><FormattedMessage id="sec.expectationsFromOrgsPoint3" /></li>
                    <li><FormattedMessage id="sec.expectationsFromOrgsPoint4" /></li>
                </ul>
            </section>

            <section id="eligibility">
                <h3><FormattedMessage id="sec.eligibilityTitle" /></h3>
                <ul>
                    <li><FormattedMessage id="sec.eligibilityPoint1" /></li>
                    <li><FormattedMessage id="sec.eligibilityPoint2" /></li>
                    <li><FormattedMessage id="sec.eligibilityPoint3" /></li>
                </ul>
            </section>
            <section>
                <p><FormattedMessage
                    id="sec.eligibilityPrompt"
                    values={{
                        link: <a
                            href="https://docs.google.com/document/d/1JcRBFhAXvMGKXgHADg1sAZC8b_zb2OSVDjaEOL8tzcw/edit?usp=sharing"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <FormattedMessage id="sec.eligibilityPromptLink" />
                        </a>
                    }}
                />
                </p>
            </section>
        </div>

        <TitleBanner className="masthead">
            <div className="inner">
                <FlexRow className="masthead-info uneven">
                    <div className="long">
                        <h1><FormattedMessage id="sec.applyTitle" /></h1>
                        <p className="intro">
                            <FormattedMessage id="sec.applyDeadline" />
                        </p>
                        <SubNavigation
                            align="left"
                            className="sec-apply-buttons"
                        >
                            <a
                                href="https://forms.gle/Py7jgaE2ZK1YdbUF7"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                <li><FormattedMessage id="sec.applyButton" /></li>
                            </a>
                        </SubNavigation>
                    </div>
                    <img
                        alt=""
                        className="short"
                        src="/images/sec/SEC-bottom-img.svg"
                    />
                </FlexRow>
            </div>
        </TitleBanner>

        <div className="inner">
            <section>
                <p>
                    <FormattedMessage
                        id="sec.subscribe"
                        values={{
                            subscribeLink: (
                                <a
                                    href=" https://us9.list-manage.com/subscribe?u=96e741c12c99f46f1f3e95e09&id=149bd1a4c2"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.subscribeCallToAction" />
                                </a>
                            )
                        }}
                    />
                </p>
            </section>
        </div>
    </div>
);

render(<Page><EducationCollaborative /></Page>, document.getElementById('app'));
