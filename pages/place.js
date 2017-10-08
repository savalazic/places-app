import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import dynamic from 'next/dynamic';

import { initStore } from '../store';

import Meta from '../components/meta';
import Nav from '../components/Nav';
import PlaceAbout from '../components/PlaceAbout';

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
    const { userAgent, place } = this.props;
    console.log(place);

    return (
      <MuiThemeProvider muiTheme={getMuiTheme({ userAgent, ...muiTheme })}>
        <div className="app">
          <Meta />
          <Nav />
          <HeaderMap 
            center={[place.lat, place.lng]}
            type={place.category.name}
          />
          <PlaceAbout
            name={place.name}
            description={place.description}
            rating={4}
            type={place.category.name}
            address={place.address}
            phone={place.telephone}
            email={place.email}
            workingFrom={place.from}
            workingTo={place.to}
            features={place.features}
            images={place.images}
            fbLink={place.fbLink}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

function getPlace(slug) {
  return fetch(`http://localhost:4000/api/places/${slug}`);
}

PlacePage.getInitialProps = async ({ query }) => {
  const res = await getPlace(query.slug);
  const json = await res.json();
  return { place: json };
};

export default withRedux(initStore, null, null)(PlacePage); // store, mapStateToProps, mapDispatchToProps
