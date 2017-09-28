import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature, Popup, Marker } from 'react-mapbox-gl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

// mock data
import placesData from '../data/places.json';
import eventsData from '../data/events.json';

import { selectPlace, placeBack } from '../actions';

import { token, styles } from '../config.json';

import Sidebar from './Sidebar';
import Events from './Events';
import SelectedCard from './SelectedCard';
import SidebarSlider from './SidebarSlider';
import Filter from './Filter';

const Mapbox = ReactMapboxGl({
  minZoom: 10,
  maxZoom: 18,
  accessToken: token,
});

const UserMarker = () => (
  <div className="user-marker" />
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
    const geolocation = navigator.geolocation;

    geolocation.getCurrentPosition((position) => {
      const userPosition = [position.coords.longitude, position.coords.latitude];
      this.setState({
        center: userPosition,
        userPosition,
        hasPosition: true,
        zoom: [13],
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedPlace) {
      this.setState({
        center: [nextProps.selectedPlace.long, nextProps.selectedPlace.lat],
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

  renderPins = () => {
    this.props.places.map((place) => {
      return (
        <Marker
          coordinates={[place.long, place.lat]}
          className="marker-container"
        >
          <UserMarker />
        </Marker>
      );
    });
  }

  render() {
    const {
      center,
      zoom,
      mapStyle,
    } = this.state;

    console.log(placesData);
    console.log(eventsData);

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
          {
            this.props.places.map(place => (
              <Marker
                key={place.id}
                coordinates={[place.long, place.lat]}
                className="marker-container"
                onClick={() => {
                  this.props.selectPlace(place);
                  this.setState({
                    center: [this.props.selectedPlace.long, this.props.selectedPlace.lat],
                    zoom: [17],
                  });
                }}
              >
                <UserMarker />
              </Marker>
            ))
          }
          {
            this.props.selectedPlace && (
              <Popup
                key={this.props.selectedPlace.id}
                offset={[0, -50]}
                coordinates={[this.props.selectedPlace.long, this.props.selectedPlace.lat]}
              >
                <div>
                  <div>
                    {this.props.selectedPlace.name}
                  </div>
                </div>
              </Popup>
            )
          }

        </Mapbox>

        {
          this.props.selectedPlace ? (
            <Sidebar>
              <SelectedCard
                image={this.props.selectedPlace.image}
                name={this.props.selectedPlace.name}
                desc={this.props.selectedPlace.desc}
                address={this.props.selectedPlace.street}
                type={this.props.selectedPlace.type}
                popularity={this.props.selectedPlace.popularity}
                handleBack={() => this.props.placeBack()}
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

Map.defaultProps = {
  selectedPlace: null,
};

Map.propTypes = {
  places: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedPlace: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    long: PropTypes.number.isRequired,
    lat: PropTypes.number.isRequired,
    desc: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired, // array of strings
    popularity: PropTypes.number.isRequired,
    // people usually spend, string
  }),
  placeBack: PropTypes.func.isRequired,
  selectPlace: PropTypes.func.isRequired,
};

// Getting visible movies from state.
function getVisiblePlaces(showing, sorting, places) {
  return places
    .filter(place => (
      (showing === 'all' || showing === place.type.toLowerCase())
      // (year == 'all' || year == place.year) &&
      // (type == 'all' || type == place.type) &&
      // (rating == 'all' || rating == place.rating)
    ));
}

function mapStateToProps(state) {
  const { showing, sorting, places } = state.places;
  return {
    places: getVisiblePlaces(showing, sorting, places),
    selectedPlace: state.selectedPlace,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectPlace,
    placeBack,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
