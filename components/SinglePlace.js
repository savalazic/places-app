import React, { Component } from 'react';
import PlaceAbout from './PlaceAbout';

class SinglePlace extends Component {
  componentWillMount() {
    console.log('mount');
  }

  render() {
    return (
      <div>
        <PlaceAbout 
        />
      </div>
    );
  }
}

export default SinglePlace;
