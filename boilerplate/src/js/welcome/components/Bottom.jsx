import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Bottom extends Component {
    static propTypes = {
        bottomName: PropTypes.string
    };

    static defaultProps = {
        bottomName: ''
    };

    constructor() {
        super();
        this.state = {
            name: '3'
        };
    }
    render() {
        const {
            bottomName
        } = this.props;

        return (
            <div>{bottomName} {this.state.name}</div>
        );
    }
}

export default Bottom;
