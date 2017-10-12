import includes from 'lodash/includes';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import LazyLoad, { forceCheck } from 'react-lazyload';

import { selectEvent, fetchEvents } from '../actions';

import Card from './Card';

class Events extends Component {
  componentDidMount() {
    this.props.fetchEvents();
  }

  componentDidUpdate() {
    forceCheck();
  }

  render() {
    return (
      <div className="places">
        {
          this.props.events.map(event => (
            <LazyLoad key={event._id} height={160} once>
              <Card
                key={event._id}
                id={event._id}
                type={event.place.category.name}
                placeName={event.place.name}
                image={event.place.images[0]}
                name={event.name}
                street={event.place.address}
                date={event.date}
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
  fetchEvents: PropTypes.func.isRequired,
};

// Getting visible events from state.
function getVisiblePlaces(showing, sorting, events) {
  return events
    .filter(event => (
      (includes(showing.type, event.place.category.name.toLowerCase()) || includes(showing.type, 'all')) &&
      (showing.city === event.place.city)
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
    fetchEvents,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);
