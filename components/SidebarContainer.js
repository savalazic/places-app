import includes from 'lodash/includes';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import Sidebar from './Sidebar';
import Events from './Events';
import SelectedCard from './SelectedCard';
import Filter from './Filter';

import { selectEvent, eventBack, fetchEvents } from '../actions';

class SidebarContainer extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedEvent) {
      this.setState({
        center: [nextProps.selectedEvent.place.lat, nextProps.selectedEvent.place.lng],
        zoom: [17],
      });
    }
  }

  render() {
    return (
      <div>
        {
          this.props.selectedEvent ? (
            <Sidebar>
              <SelectedCard
                images={this.props.selectedEvent.place.images}
                name={this.props.selectedEvent.name}
                desc={this.props.selectedEvent.description}
                placeName={this.props.selectedEvent.place.name}
                from={this.props.selectedEvent.from}
                to={this.props.selectedEvent.to}
                address={this.props.selectedEvent.place.address}
                type={this.props.selectedEvent.place.category.name}
                phone={this.props.selectedEvent.place.telephone}
                email={this.props.selectedEvent.place.email}
                features={this.props.selectedEvent.place.features}
                handleBack={() => this.props.eventBack()}
              />
            </Sidebar>
          )
            : (
              <Sidebar>
                <Filter />
                <Events />
              </Sidebar>
            )
        }
      </div>
    );
  }
}

SidebarContainer.defaultProps = {
  selectedEvent: null,
};

// Getting visible events from state.
function getVisibleEvents(showing, sorting, events) {
  return events
    .filter(event => (
      includes(showing, event.place.category.name.toLowerCase()) || includes(showing, 'all')
    ));
}

function mapStateToProps(state) {
  const { showing, sorting, events } = state.events;
  return {
    events: getVisibleEvents(showing, sorting, events),
    selectedEvent: state.selectedEvent,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchEvents,
    selectEvent,
    eventBack,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);
