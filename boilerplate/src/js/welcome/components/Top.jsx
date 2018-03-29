import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Top extends Component {
    static propTypes = {
        topName: PropTypes.string
    };

    static defaultProps = {
        topName: ''
    };

    constructor() {
        super();
        this.state = {
            name: '1'
        };
    }
    render() {
        const {
            topName
        } = this.props;

        return (
            <div>{topName} {this.state.name}</div>
        );
    }
}

export default Top;
