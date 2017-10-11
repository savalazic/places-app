import includes from 'lodash/includes';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import LazyLoad, { forceCheck } from 'react-lazyload';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { Link } from '../routes';

import { fetchPlaces } from '../actions';

import Card from '../components/Card';
import Filter from '../components/Filter';

class AdminPlaces extends Component {
  componentDidMount() {
    this.props.fetchPlaces();
  }

  componentDidUpdate() {
    forceCheck();
  }

  render() {
    return (
      <div className="container siteWidth">
        <div className="col col-12">
          <Link route="placeNew">
            <FloatingActionButton style={{ float: 'right' }}>
              <ContentAdd />
            </FloatingActionButton>
          </Link>
          <Filter />
        </div>
        {
          this.props.places.map(place => (
            <div key={place._id} className="col col-4">
              <LazyLoad key={place._id} height={400} once>
                <Link route="placeEdit" params={{ slug: place._id }}>
                  <Card
                    key={place._id}
                    id={place._id}
                    type={place.category.name}
                    image={place.images[0]}
                    name={place.name}
                    street={place.address}
                    date={''}
                    size={'large'}
                  />
                </Link>
              </LazyLoad>
            </div>
          ))
        }
      </div>
    );
  }
}

AdminPlaces.propTypes = {
  places: PropTypes.arrayOf(PropTypes.object).isRequired,
};

// Getting visible movies from state.
function getVisiblePlaces(showing, sorting, places) {
  return places
    .filter(place => (
      (includes(showing.type, place.category.name.toLowerCase()) || includes(showing.type, 'all')) &&
      (showing.city === place.city)
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
    fetchPlaces,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPlaces);
