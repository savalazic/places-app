import includes from 'lodash/includes';
import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature, Popup, Marker } from 'react-mapbox-gl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { fetchEvents, selectEvent, eventBack } from '../actions';

import { token, styles } from '../config.json';

import Sidebar from './Sidebar';
import Events from './Events';
import SelectedCard from './SelectedCard';
import Filter from './Filter';

const Mapbox = ReactMapboxGl({
  minZoom: 10,
  maxZoom: 18,
  accessToken: token,
});

const UserMarker = () => (
  <div className="marker user" />
);

const PlaceMarker = ({ type }) => (
  <div className={`marker place ${type}`} />
);

class Map extends Component {
  state = {
    center: [20.494431799999998, 44.812046499999996],
    userPosition: [],
    hasPosition: false,
    zoom: [13],
    popupShowLabel: true,
    mapStyle: styles.light,
  };

  componentDidMount() {
    this.props.fetchEvents();

    const geolocation = navigator.geolocation;

    geolocation.getCurrentPosition((position) => {
      const userPosition = [position.coords.latitude, position.coords.longitude];
      this.setState({
        center: userPosition,
        userPosition,
        hasPosition: true,
        zoom: [13],
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedEvent) {
      this.setState({
        center: [nextProps.selectedEvent.place.lat, nextProps.selectedEvent.place.lng],
        zoom: [17],
      });
    }
  }

  onToggleHover = (cursor, { map }) => {
    map.getCanvas().style.cursor = cursor;
  }

  popupChange(popupShowLabel) {
    this.setState({ popupShowLabel });
  }

  renderUserPin = () => {
    if (!this.state.hasPosition) {
      return null;
    }

    return (
      <Marker
        coordinates={this.state.userPosition}
        className="marker-container"
        ref={(e) => { this.userMarker = e; }}
      >
        <UserMarker />
      </Marker>
    );
  }

  renderPins = () => (
    this.props.events.map(event => (
      <Marker
        key={event._id}
        coordinates={[event.place.lat, event.place.lng]}
        className="marker-container"
        onClick={() => {
          this.props.selectEvent(event);
          this.setState({
            center: [this.props.selectedEvent.place.lat, this.props.selectedEvent.place.lng],
            zoom: [17],
          });
        }}
      >
        <PlaceMarker type={event.place.category.name} />
      </Marker>
    ))
  )

  render() {
    const {
      center,
      zoom,
      mapStyle,
    } = this.state;

    return (
      <div className="main">
        <Mapbox
          style={mapStyle}
          center={center}
          zoom={zoom}
          pitch={50}
          movingMethod={'flyTo'}
          containerStyle={{
            height: '100vh',
            width: '100vw',
          }}
        >
          {this.renderUserPin()}
          {this.renderPins()}
          {
            this.props.selectedEvent && (
              <Popup
                key={this.props.selectedEvent._id}
                offset={[0, -50]}
                coordinates={[this.props.selectedEvent.place.lat, this.props.selectedEvent.place.lng]}
              >
                <div>
                  <div>
                    {this.props.selectedEvent.name}
                  </div>
                </div>
              </Popup>
            )
          }

        </Mapbox>

      </div>
    );
  }
}

// Map.defaultProps = {
//   selectedEvent: null,
// };

// Map.propTypes = {
//   events: PropTypes.arrayOf(PropTypes.object).isRequired,
//   selectedEvent: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     image: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     long: PropTypes.number.isRequired,
//     lat: PropTypes.number.isRequired,
//     desc: PropTypes.string.isRequired,
//     street: PropTypes.string.isRequired,
//     type: PropTypes.string.isRequired,
//     popularity: PropTypes.number.isRequired,
//   }),
//   eventBack: PropTypes.func.isRequired,
//   selectEvent: PropTypes.func.isRequired,
// };

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

export default connect(mapStateToProps, mapDispatchToProps)(Map);
