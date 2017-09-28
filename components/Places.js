import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LazyLoad, { forceCheck } from 'react-lazyload';

import Card from '../components/Card';
import Filter from '../components/Filter';

class Places extends Component {
  componentDidUpdate() {
    forceCheck();
  }

  render() {
    return (
      <div className="container siteWidth">
        <div className="col col-12">
          <h2 className="places-heading">Filter</h2>
          <Filter />
        </div>
        {
          this.props.places.map(place => (
            <div key={place.id} className="col col-4">
              <LazyLoad key={place.id} height={400} once>
                <Card
                  key={place.id}
                  id={place.id}
                  type={place.type}
                  image={place.image}
                  popularity={place.popularity}
                  name={place.name}
                  street={place.street}
                  distance={place.distance}
                  onClick={() => console.log('click')}
                  size={'large'}
                />
              </LazyLoad>
            </div>
          ))
        }
      </div>
    );
  }
}

Places.propTypes = {
  places: PropTypes.arrayOf(PropTypes.object).isRequired,
};


// Getting visible movies from state.
function getVisiblePlaces(showing, sorting, places) {
  return places
    .filter(place => (
      (showing === 'all' || showing === place.type.toLowerCase())
      // (type == 'all' || type == place.type) &&
      // (rating == 'all' || rating == place.rating)
    ))
    .sort((a, b) => {
      if (sorting === 'popularity') {
        return b.popularity - a.popularity;
      }
      if (sorting === 'distance') {
        return a.distance - b.distance;
      }
    });
}

function mapStateToProps(state) {
  const { showing, sorting, places } = state.places;
  return {
    places: getVisiblePlaces(showing, sorting, places),
  };
}

export default connect(mapStateToProps, null)(Places);
