var injectIntl = require('react-intl').injectIntl;
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
var Welcome = require('../../components/welcome/welcome.jsx');

require('./splash.scss');

var Splash = injectIntl(React.createClass({
    type: 'Splash',
    mixins: [
        Api,
        Session
    ],
    getDefaultProps: function () {
        return {
            slidesToShow: 5
        };
    },
    getInitialState: function () {
        return {
            projectCount: 10569070,
            activity: [],
            news: [],
            featuredCustom: {},
            featuredGlobal: {}
        };
    },
    componentDidUpdate: function (prevProps, prevState) {
        if (this.state.session.user != prevState.session.user) {
            if (this.state.session.user) {
                this.getActivity();
                this.getFeaturedCustom();
                this.getNews();
            } else {
                this.setState({featuredCustom: []});
                this.getProjectCount();
            }
        }
    },
    componentDidMount: function () {
        this.getFeaturedGlobal();
        if (this.state.session.user) {
            this.getActivity();
            this.getFeaturedCustom();
            this.getNews();
        } else {
            this.getProjectCount();
        }
    },
    getActivity: function () {
        this.api({
            uri: '/proxy/users/' + this.state.session.user.username + '/activity?limit=5'
        }, function (err, body) {
            if (!err) this.setState({'activity': body});
        }.bind(this));
    },
    getFeaturedGlobal: function () {
        this.api({
            uri: '/proxy/featured'
        }, function (err, body) {
            if (!err) this.setState({featuredGlobal: body});
        }.bind(this));
    },
    getFeaturedCustom: function () {
        this.api({
            uri: '/proxy/users/' + this.state.session.user.id + '/featured'
        }, function (err, body) {
            if (!err) this.setState({featuredCustom: body});
        }.bind(this));
    },
    getNews: function () {
        this.api({
            uri: '/news?limit=3'
        }, function (err, body) {
            if (!err) this.setState({'news': body});
        }.bind(this));
    },
    getProjectCount: function () {
        this.api({
            uri: '/projects/count/all'
        }, function (err, body) {
            if (!err) this.setState({projectCount: body.count});
        }.bind(this));
    },
    handleDismiss: function (cue) {
        this.api({
            host: '',
            uri: '/site-api/users/set-template-cue/',
            method: 'post',
            useCsrf: true,
            json: {cue: cue, value: false}
        }, function (err) {
            if (!err) window.refreshSession();
        });
    },
    renderHomepageRows: function () {
        var formatMessage = this.props.intl.formatMessage;
        var showArrows = true;
        var rows = [
            <Box
                    title={formatMessage({
                        id: 'splash.featuredProjects',
                        defaultMessage: 'Featured Projects'})}
                    key="community_featured_projects">
                <Carousel items={this.state.featuredGlobal.community_featured_projects} />
            </Box>,
            <Box
                    title={formatMessage({
                        id: 'splash.featuredStudios',
                        defaultMessage: 'Featured Studios'})}
                    key="community_featured_studios">
                <Carousel items={this.state.featuredGlobal.community_featured_studios} />
            </Box>
        ];

        if (this.state.featuredGlobal.curator_top_projects &&
            this.state.featuredGlobal.curator_top_projects.length > 4) {
            
            showArrows = this.state.featuredGlobal.curator_top_projects.length > this.props.slidesToShow;
            rows.push(
                <Box
                        key="curator_top_projects"
                        title={
                            'Projects Curated by ' +
                            this.state.featuredGlobal.curator_top_projects[0].curator_name}
                        moreTitle={formatMessage({id: 'general.learnMore', defaultMessage: 'Learn More'})}
                        moreHref="/studios/386359/">
                    <Carousel
                        items={this.state.featuredGlobal.curator_top_projects}
                        arrows={showArrows} />
                </Box>
            );
        }

        if (this.state.featuredGlobal.scratch_design_studio &&
            this.state.featuredGlobal.scratch_design_studio.length > 4) {
            
            showArrows = this.state.featuredGlobal.scratch_design_studio.length > this.props.slidesToShow;
            rows.push(
                <Box
                        key="scratch_design_studio"
                        title={
                            formatMessage({
                                id: 'splash.scratchDesignStudioTitle',
                                defaultMessage: 'Scratch Design Studio' })
                            + ' - ' + this.state.featuredGlobal.scratch_design_studio[0].gallery_title}
                        moreTitle={formatMessage({id: 'splash.visitTheStudio', defaultMessage: 'Visit the studio'})}
                        moreHref={'/studios/' + this.state.featuredGlobal.scratch_design_studio[0].gallery_id + '/'}>
                    <Carousel
                        items={this.state.featuredGlobal.scratch_design_studio}
                        arrows={showArrows} />
                </Box>
            );
        }

        if (this.state.session.user &&
            this.state.featuredGlobal.community_newest_projects &&
            this.state.featuredGlobal.community_newest_projects.length > 0) {
            
            showArrows = this.state.featuredGlobal.community_newest_projects.length > this.props.slidesToShow;
            rows.push(
                <Box
                        title={
                            formatMessage({
                                id: 'splash.recentlySharedProjects',
                                defaultMessage: 'Recently Shared Projects' })}
                        key="community_newest_projects">
                    <Carousel
                        items={this.state.featuredGlobal.community_newest_projects}
                        arrows={showArrows} />
                </Box>
            );
        }

        if (this.state.featuredCustom.custom_projects_by_following &&
            this.state.featuredCustom.custom_projects_by_following.length > 0) {
            
            showArrows = this.state.featuredCustom.custom_projects_by_following.length > this.props.slidesToShow;
            rows.push(
                <Box title={
                            formatMessage({
                                id: 'splash.projectsByScratchersFollowing',
                                defaultMessage: 'Projects by Scratchers I\'m Following'})}
                     key="custom_projects_by_following">
                    
                    <Carousel items={this.state.featuredCustom.custom_projects_by_following}
                              arrows={showArrows} />
                </Box>
            );
        }
        if (this.state.featuredCustom.custom_projects_loved_by_following &&
            this.state.featuredCustom.custom_projects_loved_by_following.length > 0) {

            showArrows = this.state.featuredCustom.custom_projects_loved_by_following.length > this.props.slidesToShow;
            rows.push(
                <Box title={
                            formatMessage({
                                id: 'splash.projectsLovedByScratchersFollowing',
                                defaultMessage: 'Projects Loved by Scratchers I\'m Following'})}
                     key="custom_projects_loved_by_following">
                    
                    <Carousel items={this.state.featuredCustom.custom_projects_loved_by_following}
                              arrows={showArrows} />
                </Box>
            );
        }

        if (this.state.featuredCustom.custom_projects_in_studios_following &&
            this.state.featuredCustom.custom_projects_in_studios_following.length > 0) {
            
            showArrows =
                this.state.featuredCustom.custom_projects_in_studios_following.length > this.props.slidesToShow;
            rows.push(
                <Box title={
                            formatMessage({
                                id:'splash.projectsInStudiosFollowing',
                                defaultMessage: 'Projects in Studios I\'m Following'})}
                     key="custom_projects_in_studios_following">
                    
                    <Carousel items={this.state.featuredCustom.custom_projects_in_studios_following}
                              arrows={showArrows} />
                </Box>
            );
        }

        rows.push(
            <Box title={
                        formatMessage({
                            id: 'splash.communityRemixing',
                            defaultMessage: 'What the Community is Remixing' })}
                 key="community_most_remixed_projects">
                
                <Carousel items={this.state.featuredGlobal.community_most_remixed_projects} showRemixes={true} />
            </Box>,
            <Box title={
                        formatMessage({
                            id: 'splash.communityLoving',
                            defaultMessage: 'What the Community is Loving' })}
                 key="community_most_loved_projects">
                
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
                        {this.state.session.flags.show_welcome ? [
                            <Welcome key="welcome" onDismiss={this.handleDismiss.bind(this, 'welcome')}/>
                        ] : [
                            <Activity key="activity" items={this.state.activity} />
                        ]}
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
}));

render(<Splash />, document.getElementById('view'));
