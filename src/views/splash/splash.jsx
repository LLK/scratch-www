var React = require('react');

var Api = require('../../mixins/api.jsx');
var Session = require('../../mixins/session.jsx');

var Activity = require('../../components/activity/activity.jsx');
var Box = require('../../components/box/box.jsx');
var Carousel = require('../../components/carousel/carousel.jsx');
var Intro = require('../../components/intro/intro.jsx');
var News = require('../../components/news/news.jsx');

require('./splash.scss');

var View = React.createClass({
    mixins: [
        Api,
        Session
    ],
    getInitialState: function () {
        return {
            projectCount: 10569070,
            activity: [],
            news: [],
            featured: require('./featured.json')
        };
    },
    componentDidMount: function () {
        // @todo API request for News
        // @todo API request for Activity
        // @todo API request for Featured
    },
    render: function () {
        var loggedIn = !!this.state.session.token;
        return (
            <div className="inner">
                {loggedIn ? [
                    <div className="splash-header">
                        <Activity />
                        <News />
                    </div>
                ] : [
                    <Intro projectCount={this.state.projectCount} key="intro"/>
                ]}
                {this.state.featured.map(function (set) {
                    return (
                        <Box
                                key={set.title}
                                className="featured"
                                title={set.title}
                                moreTitle={set.moreTitle}
                                moreHref={set.moreHref}>
                            <Carousel items={set.items} />
                        </Box>
                    );
                })}
            </div>
        );
    }
});

React.render(<View />, document.getElementById('view'));
