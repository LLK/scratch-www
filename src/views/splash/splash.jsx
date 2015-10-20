var React = require('react');
var render = require('../../lib/render.jsx');

var Api = require('../../mixins/api.jsx');
var Session = require('../../mixins/session.jsx');

var Activity = require('../../components/activity/activity.jsx');
var AdminPanel = require('../../components/adminpanel/adminpanel.jsx');
var Box = require('../../components/box/box.jsx');
var Button = require('../../components/forms/button.jsx');
var Carousel = require('../../components/carousel/carousel.jsx');
var Intro = require('../../components/intro/intro.jsx');
var News = require('../../components/news/news.jsx');

require('./splash.scss');

var Splash = React.createClass({
    type: 'Splash',
    mixins: [
        Api,
        Session
    ],
    getInitialState: function () {
        return {
            projectCount: 10569070,
            activity: [],
            news: [],
            featuredCustom: {},
            featuredGlobal: {}
        };
    },
    getNews: function () {
        this.api({
            uri: '/news?limit=3'
        }, function (err, body) {
            if (!err) this.setState({'news': body});
        }.bind(this));
    },
    getGlobalHomepageRows: function () {
        this.api({
            uri: '/proxy/featured'
        }, function (err, body) {
            if (!err) this.setState({featuredGlobal: body});
        }.bind(this));
    },
    getCustomHomepageRows: function () {
        this.api({
            uri: '/proxy/users/' + this.state.session.user.id + '/featured'
        }, function (err, body) {
            if (!err) this.setState({featuredCustom: body});
        }.bind(this));
    },
    componentDidUpdate: function (prevProps, prevState) {
        if (this.state.session.user != prevState.session.user) {
            if (this.state.session.user) {
                this.getNews();
                this.getCustomHomepageRows();
            } else {
                this.setState({featuredCustom: []});
            }
        }
    },
    componentDidMount: function () {
        this.getGlobalHomepageRows();
        if (this.state.session.user) {
            this.getNews();
            this.getCustomHomepageRows();
        }
        // @todo API request for Activity
    },
    renderHomepageRows: function () {
        var rows = [
            <Box title="Featured Projects" key="community_featured_projects">
                <Carousel items={this.state.featuredGlobal.community_featured_projects} />
            </Box>,
            <Box title="Featured Studios" key="community_featured_studios">
                <Carousel items={this.state.featuredGlobal.community_featured_studios} />
            </Box>
        ];

        if (
                this.state.featuredGlobal.curator_top_projects &&
                this.state.featuredGlobal.curator_top_projects.length > 4) {
            rows.push(
                <Box
                        key="curator_top_projects"
                        title={
                            'Projects Curated by ' +
                            this.state.featuredGlobal.curator_top_projects[0].curator_name}
                        moreTitle="Learn More"
                        moreHref="/studios/386359/">
                    <Carousel items={this.state.featuredGlobal.curator_top_projects} />
                </Box>
            );
        }

        if (
                this.state.featuredGlobal.scratch_design_studio &&
                this.state.featuredGlobal.scratch_design_studio.length > 4) {
            rows.push(
                <Box
                        key="scratch_design_studio"
                        title={
                            'Scratch Design Studio - ' +
                            this.state.featuredGlobal.scratch_design_studio[0].gallery_title}
                        moreTitle="Visit the studio"
                        moreHref={'/studios/' + this.state.featuredGlobal.scratch_design_studio[0].gallery_id + '/'}>
                    <Carousel items={this.state.featuredGlobal.scratch_design_studio} />
                </Box>
            );
        }

        if (this.state.session.user) {
            rows.push(
                <Box title="Recently Shared Projects" key="community_newest_projects">
                    <Carousel items={this.state.featuredGlobal.community_newest_projects} />
                </Box>
            );
        }

        if (this.state.featuredCustom.custom_projects_by_following) {
            rows.push(
                <Box title="Projects by Scratchers I'm Following" key="custom_projects_by_following">
                    <Carousel items={this.state.featuredCustom.custom_projects_by_following} />
                </Box>
            );
        }
        if (this.state.featuredCustom.custom_projects_loved_by_following) {
            rows.push(
                <Box title="Projects Loved by Scratchers I'm Following" key="custom_projects_loved_by_following">
                    <Carousel items={this.state.featuredCustom.custom_projects_loved_by_following} />
                </Box>
            );
        }

        if (this.state.featuredCustom.custom_projects_in_studios_following) {
            rows.push(
                <Box title="Projects in Studios I'm Following" key="custom_projects_in_studios_following">
                    <Carousel items={this.state.featuredCustom.custom_projects_in_studios_following} />
                </Box>
            );
        }

        rows.push(
            <Box title="What the Community is Remixing" key="community_most_remixed_projects">
                <Carousel items={this.state.featuredGlobal.community_most_remixed_projects} showRemixes={true} />
            </Box>,
            <Box title="What the Community is Loving" key="community_most_loved_projects">
                <Carousel items={this.state.featuredGlobal.community_most_loved_projects} showLoves={true} />
            </Box>
        );

        return rows;
    },
    render: function () {
        var featured = this.renderHomepageRows();
        return (
            <div className="inner">
                {this.state.session.user ? [
                    <div key="header" className="splash-header">
                        <Activity />
                        <News items={this.state.news} />
                    </div>
                ] : [
                    <Intro projectCount={this.state.projectCount} key="intro"/>
                ]}

                {featured}

                <AdminPanel>
                    <dt>Tools</dt>
                    <dd>
                        <ul>
                            <li>
                                <a href="/scratch_admin/tickets">Ticket Queue</a>
                            </li>
                            <li>
                                <a href="/scratch_admin/ip-search/">IP Search</a>
                            </li>
                            <li>
                                <a href="/scratch_admin/email-search/">Email Search</a>
                            </li>
                        </ul>
                    </dd>
                    <dt>Homepage Cache</dt>
                    <dd>
                        <ul className="cache-list">
                            <li>
                                <form
                                    id="homepage-refresh-form"
                                    method="post"
                                    action="/scratch_admin/homepage/clear-cache/">
                                    
                                    <div className="button-row">
                                        <span>Refresh row data:</span>
                                        <Button type="submit">
                                            <span>Refresh</span>
                                        </Button>
                                    </div>
                                </form>
                            </li>
                        </ul>
                    </dd>
                </AdminPanel>
            </div>
        );
    }
});

render(<Splash />, document.getElementById('view'));
