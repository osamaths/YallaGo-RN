/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import axios from 'axios';

import MapView, {Marker} from 'react-native-maps';
import {generateCoordinatesArray, getRegionForCoordinates} from './src/helpers';
import {mapStyle} from './src/styles';
import getDirections from 'react-native-google-maps-directions';
import PlacesList from './src/components/placesList';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentRegion: {
        latitude: 31.9515694,
        longitude: 35.9239625,
        latitudeDelta: 1,
        longitudeDelta: 1,
      },
      currentPlaces: [],
    };
  }

  async componentDidMount() {
    const res = await axios.get(
      `https://serene-plateau-10640.herokuapp.com/cities`,
    );

    this.setState({
      currentRegion: getRegionForCoordinates(
        generateCoordinatesArray(res.data),
      ),
      currentPlaces: res.data,
    });
  }

  onRegionChange(region) {
    this.setState({region});
  }

  onMarkerPress = marker => {
    if (marker.type == 'city') this.onSelectCity(marker);
    else this.onSelectPlace(marker);
  };

  onSelectCity = async city => {
    const res = await axios.get(
      `https://serene-plateau-10640.herokuapp.com/places/${city.title}`,
    );

    this.setState({
      currentRegion: getRegionForCoordinates(
        generateCoordinatesArray(res.data),
      ),
      currentPlaces: res.data,
    });
  };

  onSelectPlace = place => {
    const {
      location: {latitude, longitude},
    } = place;

    const data = {
      destination: {
        latitude,
        longitude,
      },
      params: [
        {
          key: 'travelmode',
          value: 'driving', // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: 'dir_action',
          value: 'navigate', // this instantly initializes navigation using the given travel mode
        },
      ],
      waypoints: [
        // {
        //   latitude: -33.8600025,
        //   longitude: 18.697452,
        // },
        // {
        //   latitude: -33.8600026,
        //   longitude: 18.697453,
        // },
        // {
        //   latitude: -33.8600036,
        //   longitude: 18.697493,
        // },
      ],
    };

    getDirections(data);
  };

  render() {
    const {currentPlaces, currentRegion} = this.state;
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={currentRegion}
          // customMapStyle={mapStyle}
        >
          {currentPlaces.map((place, i) => (
            <Marker
              key={i}
              draggable
              coordinate={place.location}
              onDragEnd={e => alert(JSON.stringify(e.nativeEvent.coordinate))}
              title={place.title}
              description={place.description}
              onPress={() => {
                this.onMarkerPress(place);
              }}
            />
          ))}
        </MapView>
        <PlacesList places={currentPlaces} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  map: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});
