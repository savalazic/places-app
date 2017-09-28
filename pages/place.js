/* eslint-disable */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { initStore } from '../store';
import withRedux from 'next-redux-wrapper';
import dynamic from 'next/dynamic';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import LazyLoad, { forceCheck } from 'react-lazyload';

import Meta from '../components/meta';
import Nav from '../components/Nav';
import PlaceAbout from '../components/PlaceAbout';
import PlaceReview from '../components/PlaceReview';

const HeaderMap = dynamic(
  import('../components/HeaderMap'),
  {
    ssr: false,
    loading: () => {
      return (
        <div className="loading">
          <div className="inner">
          </div>
        </div>

      );
    }
  }
);

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


class PlacePage extends Component {
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
          <HeaderMap center={[20.494431799999998, 44.812046499999996]} />
          <PlaceAbout />
          <PlaceReview />
        </div>
      </MuiThemeProvider>
    );
  }
}


export default withRedux(initStore, null, null)(PlacePage); // store, mapStateToProps, mapDispatchToProps
