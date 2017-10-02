import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import LazyLoad, { forceCheck } from 'react-lazyload';

import { selectEvent } from '../actions';

import Card from './Card';

class Events extends Component {
  componentDidUpdate() {
    forceCheck();
  }

  render() {
    return (
      <div className="places">
        {
          this.props.events.map(event => (
            <LazyLoad key={event.id} height={160} once>
              <Card
                key={event.id}
                id={event.id}
                type={event.type}
                image={event.image}
                popularity={event.popularity}
                name={event.name}
                street={event.street}
                distance={event.distance}
                onClick={() => this.props.selectEvent(event)}
                size={'small'}
              />
            </LazyLoad>
          ))
        }
      </div>
    );
  }
}

Events.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectEvent: PropTypes.func.isRequired,
};

// Getting visible movies from state.
function getVisiblePlaces(showing, sorting, events) {
  return events
    .filter(event => (
      (showing === 'all' || showing === event.type.toLowerCase())
      // (type == 'all' || type == event.type) &&
      // (rating == 'all' || rating == event.rating)
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
  const { showing, sorting, events } = state.events;
  return {
    events: getVisiblePlaces(showing, sorting, events),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectEvent,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);
