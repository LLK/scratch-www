const PropTypes = require('prop-types');
const React = require('react');

const classNames = require('classnames');

require('./footer.scss');

const FooterBox = props => (
    <div
        className={classNames('inner', {hidden: props.hidden})}
    >
        {props.children}
    </div>
);

FooterBox.propTypes = {
    children: PropTypes.node,
    hidden: PropTypes.bool
};

module.exports = FooterBox;
