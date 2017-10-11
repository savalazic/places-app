import includes from 'lodash/includes';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import LazyLoad, { forceCheck } from 'react-lazyload';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { Link } from '../routes';

import { fetchEvents } from '../actions';

import Card from '../components/Card';
import Filter from '../components/Filter';

class AdminEvents extends Component {
  componentDidMount() {
    this.props.fetchEvents();
  }

  componentDidUpdate() {
    forceCheck();
  }

  render() {
    return (
      <div className="container siteWidth">
        <div className="col col-12">
          <Link route="eventNew">
            <FloatingActionButton style={{ float: 'right' }}>
              <ContentAdd />
            </FloatingActionButton>
          </Link>
          <Filter />
        </div>
        {
          this.props.events.map(event => (
            <div key={event._id} className="col col-4">
              <LazyLoad key={event._id} height={400} once>
                <Link route="eventEdit" params={{ slug: event._id }}>
                  <Card
                    key={event._id}
                    id={event._id}
                    type={event.place.category.name}
                    image={event.place.images[0]}
                    name={event.name}
                    street={event.place.address}
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

AdminEvents.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
};

// Getting visible movies from state.
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
    fetchEvents,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminEvents);
