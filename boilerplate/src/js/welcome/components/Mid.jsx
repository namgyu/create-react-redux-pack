import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Mid extends Component {
    static propTypes = {
        midName: PropTypes.string
    };

    static defaultProps = {
        midName: ''
    };

    constructor() {
        super();
        this.state = {
            name: '2'
        };
    }
    render() {
        const {
            midName
        } = this.props;

        return (
            <div>{midName} {this.state.name}</div>
        );
    }
}

export default Mid;
