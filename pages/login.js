import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Router from 'next/router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { initStore } from '../store';

import Meta from '../components/meta';
import Nav from '../components/Nav';

// Make sure react-tap-event-plugin only gets injected once
// Needed for material-ui
if (!process.tapEventInjected) {
  injectTapEventPlugin();
  process.tapEventInjected = true;
}

const muiTheme = {
  fontSize: 14,
  fontFamily: 'Dubai, sans-serif',
  menuItem: {
    selectedTextColor: 'rgba(0,0,0,1)',
  },
  palette: {
  },
};


class LoginPage extends Component {
  static getInitialProps({ req }) {
    // Ensures material-ui renders the correct css prefixes server-side
    let userAgent;
    if (process.browser) {
      userAgent = navigator.userAgent;
    } else {
      userAgent = req.headers['user-agent'];
    }
    return { userAgent };
  }

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.username === 'admin' && this.state.password === 'admin') {
      Router.push('/admin');
    }
  }

  render() {
    const { userAgent } = this.props;
    return (
      <MuiThemeProvider muiTheme={getMuiTheme({ userAgent, ...muiTheme })}>
        <div className="app">
          <Meta />
          <Nav />
          <div className="login-wrapper">
            <div className="login">
              <h2>Login</h2>
              <form onSubmit={this.onSubmit}>
                <TextField
                  onChange={e => this.setState({ username: e.target.value })}
                  hintText="Username"
                  floatingLabelText="Username"
                  className="form-input"
                />
                <TextField
                  onChange={e => this.setState({ password: e.target.value })}
                  hintText="Password"
                  floatingLabelText="Password"
                  type="password"
                  className="form-input"
                />
                <RaisedButton
                  label="Login"
                  type="submit"
                  fullWidth
                  primary
                  style={{ marginTop: 20 }}
                />
              </form>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}


export default withRedux(initStore, null, null)(LoginPage); // store, mapStateToProps, mapDispatchToProps
