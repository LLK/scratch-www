var omit = require('lodash.omit');
var React = require('react');
var ReactIntl = require('react-intl');
var FormattedMessage = ReactIntl.FormattedMessage;
var FormattedHTMLMessage = ReactIntl.FormattedHTMLMessage;

var Modal = require('../modal/modal.jsx');

require('./intro.scss');

Modal.setAppElement(document.getElementById('view'));

var Intro = React.createClass({
    type: 'Intro',
    propTypes: {
        projectCount: React.PropTypes.number
    },
    getDefaultProps: function () {
        return {
            projectCount: 10569070
        };
    },
    getInitialState: function () {
        return {
            videoOpen: false
        };
    },
    showVideo: function () {
        this.setState({videoOpen: true});
    },
    closeVideo: function () {
        this.setState({videoOpen: false});
    },
    render: function () {
        var frameSettings = {
            width: 570,
            height: 357,
            padding: 15
        };
        return (
            <div className="intro">
                <div className="content">
                    <h1>
                        <FormattedHTMLMessage
                            id='intro.tagLine'
                            defaultMessage={
                                'Create stories, games, and animations<br /> ' +
                                'Share with others around the world'
                            } />
                    </h1>
                    <div className="sprites">
                        <a className="sprite sprite-1" href="/projects/editor/?tip_bar=getStarted">
                            <img
                                className="costume costume-1"
                                src="//cdn.scratch.mit.edu/scratchr2/static/images/cat-a.png" />
                            <img
                                className="costume costume-2"
                                src="//cdn.scratch.mit.edu/scratchr2/static/images/cat-b.png" />
                            <div className="circle"></div>
                            <div className="text">
                                <FormattedMessage
                                    id='intro.tryItOut'
                                    defaultMessage='TRY IT OUT' />
                            </div>
                        </a>
                        <a className="sprite sprite-2" href="/starter_projects/">
                            <img
                                className="costume costume-1"
                                src="//cdn.scratch.mit.edu/scratchr2/static/images/tera-a.png" />
                            <img
                                className="costume costume-2"
                                src="//cdn.scratch.mit.edu/scratchr2/static/images/tera-b.png" />
                            <div className="circle"></div>
                            <div className="text">
                                <FormattedMessage
                                    id='intro.seeExamples'
                                    defaultMessage='SEE EXAMPLES' />
                            </div>
                        </a>
                        <a className="sprite sprite-3" href="#">
                            <img
                                className="costume costume-1"
                                src="//cdn.scratch.mit.edu/scratchr2/static/images/gobo-a.png" />
                            <img
                                className="costume costume-2"
                                src="//cdn.scratch.mit.edu/scratchr2/static/images/gobo-b.png" />
                            <div className="circle"></div>
                            <div className="text">
                                <FormattedMessage
                                    id='intro.joinScratch'
                                    defaultMessage='JOIN SCRATCH' />
                            </div>
                            <div className="text subtext">( it&rsquo;s free )</div>
                        </a>
                    </div>
                    <div className="description">
                        A creative learning community with
                        <span className="project-count"> {this.props.projectCount.toLocaleString()} </span>
                        projects shared
                    </div>
                    <div className="links">
                        <a href="/about/">
                            <FormattedMessage
                                id='intro.aboutScratch'
                                defaultMessage='ABOUT SCRATCH' />
                        </a>
                        <a href="/educators/">
                            <FormattedMessage
                                id='intro.forEducators'
                                defaultMessage='FOR EDUCATORS' />
                        </a>
                        <a className="last" href="/parents/">
                            <FormattedMessage
                                id='intro.forParents'
                                defaultMessage='FOR PARENTS' />
                        </a>
                    </div>
                </div>
                <div className="video">
                    <div className="play-button" onClick={this.showVideo}></div>
                    <img src="//cdn.scratch.mit.edu/scratchr2/static/images/hp-video-screenshot.png" />
                </div>
                <Modal
                        className="video-modal"
                        isOpen={this.state.videoOpen}
                        onRequestClose={this.closeVideo}
                        frameSettings={frameSettings}>
                    <iframe
                        src="//player.vimeo.com/video/65583694?title=0&amp;byline=0&amp;portrait=0"
                        {...omit(frameSettings, 'padding')} />
                </Modal>
            </div>
        );
    }
});

module.exports = Intro;
