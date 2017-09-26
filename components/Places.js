import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import LazyLoad, { forceCheck } from 'react-lazyload';

import { selectPlace } from '../actions';

import Card from './Card';

class Places extends Component {
  componentDidUpdate() {
    forceCheck();
  }

  render() {
    return (
      <div className="places">
        {
          this.props.places.map(place => (
            <LazyLoad key={place.id} height={160} once>
              <Card
                key={place.id}
                id={place.id}
                type={place.type}
                image={place.image}
                popularity={place.popularity}
                name={place.name}
                street={place.street}
                distance={place.distance}
                onClick={() => this.props.selectPlace(place)}
              />
            </LazyLoad>
          ))
        }
      </div>
    );
  }
}

Places.propTypes = {
  places: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectPlace: PropTypes.func.isRequired,
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectPlace,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Places);
