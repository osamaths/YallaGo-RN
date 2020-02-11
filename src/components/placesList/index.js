import React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Tooltip from 'rn-tooltip';

const IMAGE_URI =
  'http://images2.fanpop.com/images/photos/5900000/The-Beautiful-Place-Where-I-Live-x-missmckena-x-fanpop-users-5961561-2560-1920.jpg';

const PlacesList = ({places, onClick}) => (
  <View style={styles.container}>
    <FlatList
      data={places}
      renderItem={({item}) => <Item title={item.title} onClick={onClick} />}
      keyExtractor={item => item.title}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  </View>
);

function Item({title, imgUri, onClick}) {
  return (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={{flex: 3}}>
        <Image
          source={{
            uri: IMAGE_URI,
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.title}>
        <Tooltip popover={<Text>{title}</Text>}>
          <Text numberOfLines={1}>{title}</Text>
        </Tooltip>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
  itemContainer: {
    height: 130,
    width: 130,
    borderWidth: 0.5,
    borderColor: '#dddddd',
    padding: 5,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  title: {flex: 1, alignSelf: 'center'},
});

export default PlacesList;
