import React from 'react';

const AboutComponent = () => (
  <div className="about">
    <div className="video">
      <div className="col">
        <video src="/static/assets/videos/In-And-Out.mp4" autoPlay muted loop />
      </div>
    </div>
    <div className="about-text">
      <h1>Find awesome events in your city with <strong>Places</strong></h1>
    </div>
  </div>
);

export default AboutComponent;
