import React from 'react';
import FacebookProvider, { Like } from 'react-facebook';
import Slider from 'react-slick';
import Rating from 'react-rating';

const settings = {
  className: 'center',
  centerMode: true,
  infinite: true,
  centerPadding: '60px',
  slidesToShow: 3,
  swipeToSlide: true,
  speed: 500,
  autoplay: true,
  responsive: [{
    breakpoint: 1000,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  }, {
    breakpoint: 600,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  }, {
    breakpoint: 480,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  }],
};

const PlaceAbout = ({ name, description, rating, type, address, phone, email, workingFrom, workingTo, features, images }) => (
  <div className="place-about">
    <div className="container siteWidth">
      <div className="contact">
        <p>
          <i className="icon location" />
          <span>{address}</span>
        </p>
        <a href={`tel:${phone}`}>
          <i className="icon phone" />
          <span>{phone}</span>
        </a>
        <a href={`mailto:${email}`}>
          <i className="icon email" />
          <span>{email}</span>
        </a>
        <p>
          <i className="icon clock" />
          <span>{workingFrom}h - {workingTo}h</span>
        </p>
      </div>
    </div>
    <div className="container siteWidth">
      <div className="place-heading col col-12">
        <h1>{name}</h1>
        <div className="rating">
          <Rating
            readonly
            initialRate={rating}
            empty={<span className="icon emptyStar" />}
            full={<span className="icon fullStar" />}
          />
        </div>
        <span className={`type ${type.toLowerCase()}`}>{type}</span>
        <p className="address">{address}</p>
      </div>
      <div className="col col-12">
        <h3>Description</h3>
        <p>{description}</p>
        <div className="features">
          <h3>Features</h3>
          <ul>
            {features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="col col-12">
        <FacebookProvider appId="121645921818117">
          <Like href="#fbLinkToPlace" colorScheme="dark" showFaces share />
        </FacebookProvider>
      </div>
    </div>
    <div className="gallery">
      <Slider {...settings}>
        {images.map((image, i) => (
          <div
            key={i}
            className="gallery-image"
            style={{
              backgroundImage: `url(${image})`,
            }}
          />
        ))}
      </Slider>
    </div>
  </div>
);

export default PlaceAbout;
