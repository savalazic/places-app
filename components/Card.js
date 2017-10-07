import React from 'react';
import PropTypes from 'prop-types';

import config from '../config.json';

const Card =
  ({ id, type, image, popularity, name, street, distance, size, onClick }) => {
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
        className={`card ${size} ${type.trim().toLowerCase()}`}
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

// Card.propTypes = {
//   id: PropTypes.string.isRequired,
//   type: PropTypes.string.isRequired,
//   image: PropTypes.string.isRequired,
//   popularity: PropTypes.number.isRequired,
//   name: PropTypes.string.isRequired,
//   street: PropTypes.string.isRequired,
//   distance: PropTypes.number.isRequired,
//   onClick: PropTypes.func.isRequired,
//   size: PropTypes.string.isRequired,
// };

export default Card;
