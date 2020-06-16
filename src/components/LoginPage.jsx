import React, { Component } from 'react';
import {handleLogin} from '../api/helper.js';
import { withRouter } from 'react-router-dom';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    _handleClick = (e) => {
        const username = this._unameInput.value;
        const password = this._passwdInput.value;

        this.props.history.push('/');

        // handleLogin(username, password).then(data => {
        //     console.log('====================================');
        //     console.log(data);
        //     console.log('====================================');
        // });
    };

    render() {
        return (
            <div>
                <h1>Hello, welcome to login</h1>
                <form>
                    <input
                        type="text"
                        name="username"
                        ref = {unameInput => this._unameInput = unameInput}
                    />
                    <input
                        type="password"
                        name="password"
                        ref = {passwdInput => this._passwdInput = passwdInput}
                    />
                    <button
                        type = "button"
                        onClick = {this._handleClick}
                    >
                        login
                    </button>
                </form>
            </div>
        );
    }
}

export default withRouter(LoginPage);