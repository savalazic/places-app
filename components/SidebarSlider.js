import React from 'react';
import Slider from 'rc-slider';
import moment from 'moment';

const now = moment().hour();

const marks = {};
for (let i = 0; i <= 24; i++) {
  marks[i] = i < 10 ? `0${i}` : `${i}`;
}

const SidebarSlider = () => (
  <div className="slider-container">
    <Slider
      min={0}
      max={24}
      included={false}
      defaultValue={now}
      marks={marks}
      onChange={() => console.log('slider changes')}
    />
  </div>
);

export default SidebarSlider;
