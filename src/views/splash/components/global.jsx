var React = require('react');

var Box = require('../../../components/box/box.jsx');
var Carousel = require('../../../components/carousel/carousel.jsx');

require('./splash.scss');

var GlobalRows = (props) => {
    var formatMessage = props.intl.formatMessage;
    return (
        <div>
            <Box
                    title={formatMessage({
                        id: 'splash.featuredProjects',
                        defaultMessage: 'Featured Projects'})}
                    key="community_featured_projects">
                <Carousel items={props.featured.community_featured_projects} />
            </Box>
            <Box
                    title={formatMessage({
                        id: 'splash.featuredStudios',
                        defaultMessage: 'Featured Studios'})}
                    key="community_featured_studios">
                <Carousel items={props.featured.community_featured_studios}
                          settings={{slidesToShow: 4, slidesToScroll: 4, lazyLoad: false}} />
            </Box>
            <Box
                    key="curator_top_projects"
                    title={'Projects Curated by ' + (props.featured.curator_top_projects ?
                    props.featured.curator_top_projects[0].curator_name : '')}
                    moreTitle={formatMessage({id: 'general.learnMore', defaultMessage: 'Learn More'})}
                    moreHref="/studios/386359/" >
                <Carousel
                    items={props.featured.curator_top_projects} />
            </Box>
            <Box
                    key="scratch_design_studio"
                    title={
                        formatMessage({
                            id: 'splash.scratchDesignStudioTitle',
                            defaultMessage: 'Scratch Design Studio' })
                        + ' - ' + (props.featured.scratch_design_studio ?
                        props.featured.scratch_design_studio[0].gallery_title : '')}
                    moreTitle={formatMessage({id: 'splash.visitTheStudio', defaultMessage: 'Visit the studio'})}
                    moreHref={'/studios/' + (props.featured.scratch_design_studio ?
                    props.featured.scratch_design_studio[0].gallery_id : '')}>
                <Carousel
                    items={props.featured.scratch_design_studio} />
            </Box>
            <Box
                    title={
                        formatMessage({
                            id: 'splash.recentlySharedProjects',
                            defaultMessage: 'Recently Shared Projects' })}
                    key="community_newest_projects">
                <Carousel
                    items={props.featured.community_newest_projects} />
            </Box>
        </div>
    );
};

module.exports = GlobalRows;
