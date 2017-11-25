import React from 'react';
import render from '../../../../lib/render.jsx';

import Button from '../../../../components/forms/button.jsx';
import FlexRow from '../../../../components/flex-row/flex-row.jsx';
import Page from '../../../../components/page/conference/2016/page.jsx';
import TitleBanner from '../../../../components/title-banner/title-banner.jsx';

require('./index.scss');

var ConferenceSplash = React.createClass({
    type: 'ConferenceSplash',

    render: function () {
        return (
            <div className="index mod-2016">
                <TitleBanner className="mod-conference">
                    <h1>
                        Many Paths, Many Styles
                    </h1>
                    <h3>
                        August 4 - 6, 2016 | Cambridge, MA, USA
                    </h3>
                    <p>
                        <a href="/conference/2016/schedule">
                            <Button>
                                See the Schedule
                            </Button>
                        </a>
                    </p>
                    <p className="sub-button">
                        <b>
                            <a href="https://youtu.be/alsfSTVn2es?list=PLpfxVARjkP-8chnTrjtDeo88Pcz6-xf_B"
                                target="_blank">
                                Watch videos of the keynote sessions
                            </a>
                        </b>
                    </p>
                </TitleBanner>
                <section className="inner">
                    <FlexRow>
                        <div>
                            <h3>
                                <a href="/conference/2016/expect">
                                    <img src="/images/conference/expect/what-to-expect.png" alt="expect-image" />
                                    What to Expect
                                </a>
                            </h3>
                            <p>
                                Learn more about participating in Scratch@MIT
                            </p>
                        </div>
                        <div>
                            <h3>
                                <a href="/conference/2016/plan">
                                    <img src="/images/conference/plan/plan-your-visit.png" alt="plan-image" />
                                    Plan Your Visit
                                </a>
                            </h3>
                            <p>
                                Information on traveling, staying, and exploring around the Media Lab
                            </p>
                        </div>
                        <div>
                            <h3>
                                <a href="/conference/2016/schedule">
                                    <img src="/images/conference/schedule/schedule.png" alt="schedule" />
                                    Schedule
                                </a>
                            </h3>
                            <p>
                                Full schedule of events and sessions
                            </p>
                        </div>
                    </FlexRow>
                </section>
            </div>
        );
    }
});

render(<Page><ConferenceSplash /></Page>, document.getElementById('app'));
