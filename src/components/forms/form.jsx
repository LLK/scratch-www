import classNames from 'classnames';
import Formsy from 'formsy-react';
import omit from 'lodash.omit';
import React from 'react';
import {validations} from './validations.jsx';

for (var validation in validations) {
    Formsy.addValidationRule(validation, validations[validation]);
}

var Form = React.createClass({
    getDefaultProps: function () {
        return {
            noValidate: true,
            onChange: function () {}
        };
    },
    getInitialState: function () {
        return {
            allValues: {}
        };
    },
    onChange: function (currentValues, isChanged) {
        this.setState({allValues: omit(currentValues, 'all')});
        this.props.onChange(currentValues, isChanged);
    },
    render: function () {
        var classes = classNames(
            'form',
            this.props.className
        );
        return (
            <Formsy.Form {... this.props} className={classes} ref="formsy" onChange={this.onChange}>
                {React.Children.map(this.props.children, function (child) {
                    if (!child) return child;
                    if (child.props.name === 'all') {
                        return React.cloneElement(child, {value: this.state.allValues});
                    } else {
                        return child;
                    }
                }.bind(this))}
            </Formsy.Form>
        );
    }
});

export default Form;
