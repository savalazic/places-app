import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';
import { token, styles } from '../config.json';

import Sidebar from './Sidebar';
import Places from './Places';
import SelectedCard from './SelectedCard';
import SidebarSlider from './SidebarSlider';

import data from '../places.json';

const Mapbox = ReactMapboxGl({
  minZoom: 10,
  maxZoom: 18,
  accessToken: token,
});

class Map extends Component {
  state = {
    center: [-0.109970527, 51.52916347],
    zoom: [14],
    place: '',
    places: {},
    popupShowLabel: true,
    mapStyle: styles.light,
  };

  componentWillMount() {
    this.setState({ places: data.places.place });
  }

  onDrag = () => {
    // if (this.state.place) {
    //   this.setState({ place: '' });
    // }
  }

  onToggleHover = (cursor, { map }) => {
    map.getCanvas().style.cursor = cursor;
  }

  onControlClick = (map, zoomDiff) => {
    const zoom = map.getZoom() + zoomDiff;
    this.setState({ zoom: [zoom] });
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

  markerClick = (place, { feature }) => {
    this.setState({
      center: feature.geometry.coordinates,
      zoom: [16],
      place,
    });
  }

  cardClick = (place) => {
    console.log('card clicked');
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

  handleBack = () => {
    this.setState({ place: '' });
  }

  render() {
    const {
      places,
      place,
      center,
      end,
      zoom,
      popupShowLabel,
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
          <Layer
            // id="3d-buildings"
            // sourceId="composite"
            // layerOptions={{
            //   'source-layer': 'building',
            //   'filter': ['==', 'extrude', 'true'],
            //   'type': 'fill-extrusion',
            //   'minzoom': 14
            // }}
            // paint={{
            //   'fill-extrusion-color': '#abc',
            //   'fill-extrusion-height': {
            //     'type': 'identity',
            //     'property': 'height'
            //   },
            //   'fill-extrusion-base': {
            //     'type': 'identity',
            //     'property': 'min_height'
            //   },
            //   'fill-extrusion-opacity': .6
            // }}
            type="symbol"
            id="marker"
            layout={{ 'icon-image': 'marker-15' }}
          >
            {
              places.map(place => (
                <Feature
                  key={place.id}
                  coordinates={[place.long, place.lat]}
                  onMouseEnter={this.onToggleHover.bind(this, 'pointer')}
                  onMouseLeave={this.onToggleHover.bind(this, '')}
                  onClick={this.markerClick.bind(this, place)}
                />
              ))
            }
          </Layer>

          {
            place && (
              <Popup
                key={place.id}
                offset={[0, -50]}
                coordinates={[place.long, place.lat]}
              >
                <div>
                  <div>
                    {place.name}
                  </div>
                </div>
              </Popup>
            )
          }

        </Mapbox>

        {
          place ? (
            <Sidebar>
              <SelectedCard
                image={place.image}
                name={place.name}
                desc={place.desc}
                address={place.street}
                type={place.type}
                popularity={place.popularity}
                backToList={this.handleBack}
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

export default Map;
