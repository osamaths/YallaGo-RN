/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import MapView, {Marker} from 'react-native-maps';
import {joPlaces} from './src/storage';
import {generateCoordinatesArray, getRegionForCoordinates} from './src/helpers';
import {mapStyle} from './src/styles';

export default class App extends React.Component {
  onRegionChange(region) {
    this.setState({region});
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={getRegionForCoordinates(
            generateCoordinatesArray(joPlaces),
          )}
          customMapStyle={mapStyle}>
          {joPlaces.map((place, i) => (
            <Marker
              key={i}
              draggable
              coordinate={place.coordinate}
              onDragEnd={e => alert(JSON.stringify(e.nativeEvent.coordinate))}
              title={place.title}
              description={place.description}
            />
          ))}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
