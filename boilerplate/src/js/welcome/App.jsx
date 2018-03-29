import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Top from './components/Top';
import Mid from './components/Mid';
import Bottom from './components/Bottom';
import {
    sayHello,
    sayWelcome
} from './WelcomeActions';

class App extends Component {
    static propTypes = {
        text: PropTypes.string,
        sayHello: PropTypes.func,
        sayWelcome: PropTypes.func
    };

    static defaultProps = {
        text: '',
        sayHello: () => {},
        sayWelcome: () => {}
    };

    constructor() {
        super();
        this.state = {
            world: 'World',
            topName: 'TOP',
            midName: 'MID',
            bottomName: 'BOTTOM',
        };
    }

    handleClick = () => {
        if (this.props.text === 'Hello') {
            this.props.sayWelcome();
        } else {
            this.props.sayHello();
        }
    }

    render() {
        return (
            <Fragment>
                <span>{this.props.text} {this.state.world}</span><br />
                <button onClick={this.handleClick}>Click!</button><br />
                <Top {...this.state} /><br />
                <Mid {...this.state} /><br />
                <Bottom {...this.state} />
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        text: state.welcome.text
    };
}

export default connect(mapStateToProps, {
    sayHello,
    sayWelcome
})(App);
