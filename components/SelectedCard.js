import React from 'react';
import PropTypes from 'prop-types';

import config from '../config.json';

const SelectedCard =
  ({ image, name, type, desc, popularity, address, handleBack }) => {
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
      <div className={`selected-card ${type.trim().toLowerCase()}`}>
        <div
          className="image"
          style={{
            backgroundImage: `url(${image})`,
          }}
        >
          <i
            className="icon back"
            role="button"
            tabIndex="0"
            onClick={handleBack}
          />
          <i
            className="icon search"
            role="button"
            tabIndex="0"
          />
        </div>
        <div className="description">
          <div className="heading">
            <h2>{name}</h2>
            <p className="address">{address}</p>
            <div className="type">{type}</div>
          </div>
          <p className="popularity">{popularity}%</p>
          <p className="description-text">{desc}</p>
        </div>
      </div>
    );
  };

SelectedCard.propTypes = {
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  popularity: PropTypes.number.isRequired,
  handleBack: PropTypes.func.isRequired,
};

export default SelectedCard;
