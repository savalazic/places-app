import React, { Component } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';

import PlaceAbout from './PlaceAbout';

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

class SinglePlace extends Component {
  componentDidMount() {
    const request = axios.get('http://localhost:4000/places/59d983f6df54a901f9658da2');
    request.then(data => console.log(data));
  }

  render() {
    return (
      <div>
        <HeaderMap center={[20.494431799999998, 44.812046499999996]} />
        <PlaceAbout
          name={'sadas'}
        />
      </div>
    );
  }
}

export default SinglePlace;
