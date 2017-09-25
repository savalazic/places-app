import React from 'react';
import PropTypes from 'prop-types';

import Chart from './Chart';
import config from '../config.json';

const Card =
  ({ id, type, image, popularity, name, street, distance, onClick }) => {
    let typeColor = '';

    if (type.toLowerCase() === 'bar') {
      typeColor = config.colors.bar;
    } else if (type.toLowerCase() === 'club') {
      typeColor = config.colors.club;
    } else if (type.toLowerCase() === 'restaurant') {
      typeColor = config.colors.restaurant;
    } else {
      typeColor = config.colors.cafe;
    }

    return (
      <div
        key={id}
        className={`card ${type.trim().toLowerCase()}`}
        role="button"
        tabIndex="0"
        onClick={onClick}
      >
        <div
          className="card-image"
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
        <div className="card-description">
          <div className="card-chart">
            <Chart
              gradientSize={150}
              chartColor={typeColor}
              chartHeight={200}
            />
          </div>
          <p className="card-popularity">{popularity}%</p>
          <div className="card-info">
            <h3 className="card-name">{name}</h3>
            <p className="card-address">{street}</p>
          </div>
          <p className="card-type">{type}</p>
          <p className="card-distance">{distance} km</p>
        </div>
      </div>
    );
  };

Card.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  popularity: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  distance: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Card;
