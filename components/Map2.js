import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature, Popup, Marker } from 'react-mapbox-gl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { selectPlace, placeBack } from '../actions';

import { token, styles } from '../config.json';

import Sidebar from './Sidebar';
import Places from './Places';
import SelectedCard from './SelectedCard';
import SidebarSlider from './SidebarSlider';

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
    zoom: [10],
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

  onDrag = () => {
    console.log('Drag');
  }

  onToggleHover = (cursor, { map }) => {
    map.getCanvas().style.cursor = cursor;
  }

  onPitch = (map) => {
    console.log('Pitch: ', map.getPitch());
  }

  onZoom = (map) => {
    console.log('Zoom: ', map.getZoom());
  }

  setMove = (end) => {
    if (end !== this.state.end) {
      this.setState({ end });
    }
  }

  popupChange(popupShowLabel) {
    this.setState({ popupShowLabel });
  }

  changeStyle = () => {
    this.setState({
      mapStyle:
        this.state.mapStyle === 'mapbox://styles/mapbox/light-v9'
          ? 'mapbox://styles/mapbox/dark-v9'
          : 'mapbox://styles/mapbox/light-v9',
    });
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
          onDrag={this.onDrag}
          onMoveEnd={this.setMove.bind(this, true)}
          onMove={this.setMove.bind(this, false)}
          containerStyle={{
            height: '100vh',
            width: '100vw',
          }}
        >
          <button
            onClick={this.changeStyle}
            style={{
              position: 'absolute',
              top: 80,
              left: 30,
              zIndex: 100,
              padding: 8,
              border: 'none',
              color: '#fff',
              outline: 'none',
            }}
          >
            CHANGE STYLE
          </button>
          {this.renderUserPin()}
          <Layer
            type="symbol"
            id="marker"
            layout={{ 'icon-image': 'marker-15' }}
          >
            {
              this.props.places.map(place => (
                <Feature
                  key={place.id}
                  coordinates={[place.long, place.lat]}
                  onMouseEnter={this.onToggleHover.bind(this, 'pointer')}
                  onMouseLeave={this.onToggleHover.bind(this, '')}
                  onClick={() => {
                    this.props.selectPlace(place);
                    this.setState({
                      center: [this.props.selectedPlace.long, this.props.selectedPlace.lat],
                      zoom: [17],
                    });
                  }}
                />
              ))
            }
          </Layer>
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
              <SidebarSlider />
            </Sidebar>
          )
            : (
              <Sidebar>
                <Places />
                <SidebarSlider />
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
