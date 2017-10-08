import React from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import PropTypes from 'prop-types';

import { token, styles } from '../config.json';

const Mapbox = ReactMapboxGl({
  minZoom: 10,
  maxZoom: 18,
  accessToken: token,
});

const PlaceMarker = ({ type }) => (
  <div className={`marker place ${type}`} />
);

const HeaderMap = ({ center, type }) => (
  <div className="header-map">
    <Mapbox
      style={styles.light}
      center={center}
      zoom={[14]}
      containerStyle={{
        height: '40vh',
        width: '100%',
      }}
    >
      <Marker
        coordinates={center}
        className="marker-container"
      >
        <PlaceMarker type={type} />
      </Marker>
    </Mapbox>
  </div>
);

HeaderMap.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default HeaderMap;
