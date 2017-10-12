import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';
import Router from 'next/router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import dynamic from 'next/dynamic';

import { deleteEvent } from '../actions';

import { initStore } from '../store';

import Meta from '../components/meta';
import Nav from '../components/Nav';

const HeaderMap = dynamic(
  import('../components/HeaderMap'),
  {
    ssr: false,
    loading: () => (
      <div className="header-loading">
        <div className="inner">
          Loading...
        </div>
      </div>
    ),
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
    selectedTextColor: 'rgba(0,0,0,1)',
  },
  palette: {
  },
};


class EventEditPage extends Component {
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

  onDelete = () => {
    console.log(this.props.event._id);
    const id = this.props.event._id;
    this.props.deleteEvent(id, () => {
      Router.push('/admin');
    });
  }

  render() {
    const { userAgent, event } = this.props;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme({ userAgent, ...muiTheme })}>
        <div className="app">
          <Meta />
          <Nav />
          <h1>EDIT</h1>
          <h1>EDIT</h1>
          <h1>EDIT</h1>
          <h1>EDIT</h1>
          <h1>EDIT</h1>
          <button onClick={this.onDelete}>REMOVEE</button>
        </div>
      </MuiThemeProvider>
    );
  }
}

function getPlace(slug) {
  return fetch(`http://localhost:4000/api/events/${slug}`);
}

EventEditPage.getInitialProps = async ({ query }) => {
  const res = await getPlace(query.slug);
  const json = await res.json();
  return { event: json };
};

export default withRedux(initStore, null, { deleteEvent })(EventEditPage); // store, mapStateToProps, mapDispatchToProps
