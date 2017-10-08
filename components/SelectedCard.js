import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

import config from '../config.json';

const settings = {
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: true,
  speed: 500,
  autoplay: true,
};

const SelectedCard =
  ({ images, name, type, desc, placeDesc, from, to, placeName, phone, email, features, address, handleBack }) => {
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
        <div className="images">
          <Slider {...settings} >
            {images.map((image, i) => (
              <div
                key={i}
                className="image"
                style={{
                  backgroundImage: `url(${image})`,
                }}
              />
            ))}
          </Slider>
          <i
            className="icon back"
            role="button"
            tabIndex="0"
            onClick={handleBack}
          />
        </div>
        <div className="description">
          <div className="heading">
            <h2>{name}</h2>
            <p className="address">{address}</p>
            <div className="type">{type}</div>
          </div>
          <p className="placeName">{placeName}</p>
          <div className="event-time">
            <span className="from">{from}h</span> - <span className="to">{to}h</span>
          </div>
          <p className="description-text">{desc}</p>
          <h3>Contact</h3>
          <a className="description-action" href={`tel:${phone}`}>{phone}</a>
          <a className="description-action" href={`mailto:${email}`}>{email}</a>
          <h3>About</h3>
          <p className="description-place">{placeDesc}</p>
          <div className="features">
            <ul>
              {features.map((feature, i) => (
                <li key={i} className="feature">{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

// SelectedCard.propTypes = {
//   name: PropTypes.string.isRequired,
//   desc: PropTypes.string.isRequired,
//   image: PropTypes.string.isRequired,
//   address: PropTypes.string.isRequired,
//   type: PropTypes.string.isRequired,
//   popularity: PropTypes.number.isRequired,
//   handleBack: PropTypes.func.isRequired,
// };

export default SelectedCard;
