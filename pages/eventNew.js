import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

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


class EventNewPage extends Component {
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

  render() {
    const { userAgent } = this.props;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme({ userAgent, ...muiTheme })}>
        <div className="app">
          <Meta />
          <Nav />
          <h1>New</h1>
        </div>
      </MuiThemeProvider>
    );
  }
}


export default withRedux(initStore, null, null)(EventNewPage); // store, mapStateToProps, mapDispatchToProps
