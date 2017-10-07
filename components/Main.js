import React from 'react';
import dynamic from 'next/dynamic';

import Nav from './Nav';
import SidebarContainer from './SidebarContainer';

const Map = dynamic(
  import('./Map'),
  {
    ssr: false,
    loading: () => (
      <div className="loading">
        <div className="inner">
          <h2>Loading...</h2>
        </div>
      </div>
    ),
  }
);

const Main = () => (
  <div className="app">
    <Nav />
    <Map />
    <SidebarContainer />
  </div>
);

export default Main;
