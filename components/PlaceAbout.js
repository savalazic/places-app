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

const PlaceAbout = () => (
  <div className="place-about">
    <div className="container siteWidth">
      <div className="contact">
        <p>
          <i className="icon location" />
          <span>Sajamski kej bb</span>
        </p>
        <a href="#">
          <i className="icon phone" />
          <span>0637644874</span>
        </a>
        <a href="mailto:mail@gmail.com">
          <i className="icon email" />
          <span>mail@gmail.com</span>
        </a>
        <p>
          <i className="icon clock" />
          <span>00:00h - 06:00h</span>
        </p>
      </div>
    </div>
    <div className="container siteWidth">
      <div className="place-heading col col-12">
        <h1>Brankow Club</h1>
        <div className="rating">
          <Rating
            readonly
            initialRate={3}
            empty={<span className="icon emptyStar" />}
            full={<span className="icon fullStar" />}
          />
        </div>
        <span className="type club">Club</span>
        <p className="address">Cara Lazara 86</p>
      </div>
      <div className="col col-12">
        <h3>Description</h3>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non assumenda odio impedit aliquam velit praesentium quis atque minus quas quam distinctio unde qui temporibus, facere quia accusamus porro! Excepturi, quia. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates maiores ex consequatur asperiores qui eum corrupti ducimus consequuntur placeat totam error adipisci, necessitatibus laboriosam! Voluptatum?</p>
        <div className="features">
          <h3>Features</h3>
          <ul>
            <li>Wi-Fi</li>
            <li>Parking</li>
            <li>Balcony</li>
            <li>Cards Accepted</li>
            <li>Air Condition</li>
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
        <div>
          <div
            className="gallery-image"
            style={{
              backgroundImage: 'url(https://kenzaandrea11.files.wordpress.com/2014/12/txwidhqogg5ewnnvu75xq0bvl_2014-07-27-15-26-34.jpeg)',
            }}
          />
        </div>
        <div>
          <div
            className="gallery-image"
            style={{
              backgroundImage: 'url(https://static1.squarespace.com/static/55b7ea68e4b0be339cc75dad/t/55b805a8e4b0a6b779d3af11/1438123434780/Nightclub+Shooting+Lawsuit.jpg?format=1500w)',
            }}
          />
        </div>
        <div>
          <div
            className="gallery-image"
            style={{
              backgroundImage: 'url(https://kenzaandrea11.files.wordpress.com/2014/12/txwidhqogg5ewnnvu75xq0bvl_2014-07-27-15-26-34.jpeg)',
            }}
          />
        </div>
        <div>
          <div
            className="gallery-image"
            style={{
              backgroundImage: 'url(https://static1.squarespace.com/static/55b7ea68e4b0be339cc75dad/t/55b805a8e4b0a6b779d3af11/1438123434780/Nightclub+Shooting+Lawsuit.jpg?format=1500w)',
            }}
          />
        </div>
      </Slider>
    </div>
  </div>
);

export default PlaceAbout;
