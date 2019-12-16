import React from 'react';
import {Text, View} from 'react-native';

import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = 'AIzaSyAsykd2Uo-e7FBHL8sZfP3_VdbMKDdxsbc';

const Directions = ({place}) => (
  <View>
    <MapView initialRegion={}>
      <MapViewDirections
        origin={place.location}
        destination={place.location}
        apikey={GOOGLE_MAPS_APIKEY}
      />
    </MapView>
  </View>
);

export default Directions;
