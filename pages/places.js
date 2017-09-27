/* eslint-disable */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { initStore } from '../store';
import withRedux from 'next-redux-wrapper';
import dynamic from 'next/dynamic';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Meta from '../components/meta';
import Nav from '../components/Nav';
import AboutComponent from '../components/About';

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
    selectedTextColor: 'rgba(0,0,0,1)'
  },
  palette: {
  }
};


class Places extends Component {

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
          <div className="container siteWidth">
            <div className="col col-4">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur earum, nihil velit, nostrum esse sequi adipisci quasi consectetur aliquam vero aliquid temporibus dolor veritatis sint beatae illo. Nam, facilis odio.</p>
            </div>
            <div className="col col-4">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur earum, nihil velit, nostrum esse sequi adipisci quasi consectetur aliquam vero aliquid temporibus dolor veritatis sint beatae illo. Nam, facilis odio.</p>
            </div>
            <div className="col col-4">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur earum, nihil velit, nostrum esse sequi adipisci quasi consectetur aliquam vero aliquid temporibus dolor veritatis sint beatae illo. Nam, facilis odio.</p>
            </div>
            <div className="col col-4">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur earum, nihil velit, nostrum esse sequi adipisci quasi consectetur aliquam vero aliquid temporibus dolor veritatis sint beatae illo. Nam, facilis odio.</p>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}


export default withRedux(initStore, null, null)(Places); // store, mapStateToProps, mapDispatchToProps
