import React from 'react';
import classNames from 'classnames';

var Avatar = React.createClass({
    type: 'Avatar',
    propTypes: {
        src: React.PropTypes.string
    },
    getDefaultProps: function () {
        return {
            src: '//cdn2.scratch.mit.edu/get_image/user/2584924_24x24.png?v=1438702210.96'
        };
    },
    render: function () {
        var classes = classNames(
            'avatar',
            this.props.className
        );
        return <img {... this.props} className={classes} />;
    }
});

export default Avatar;
