import React, * as react from 'react';
import {Text, ImageBackground, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import AppContext from './AppContext';
import styles from '../assets/styles/globalStyles';
import getCurrentLocation from '../API/LocationAPI';
import tatomaLogo from '../assets/tatoma_logo.png';

const TopicMap = () => {
  const {
    username,
    isAuthenticated,
    focusTopic,
    hasLocationAuthorization,
    setLocationAuthorization,
    location,
    setLocation,
    markers,
  } = react.useContext(AppContext);

  const getLocation = async () => {
    await getCurrentLocation();
  };
  if (!location.timestamp) {
    getLocation();
  }

  const focusMarkers = markers.filter(marker => {
    if (marker.channel === focusTopic) {
      return marker;
    }
  });
  console.log('MAP --- Markers: \n', focusMarkers);
  return (
    <MapView region={location} style={styles.map}>
      {focusMarkers.map((val, index) => {
        console.log(val, index);
        return (
          <Marker
            coordinate={{
              latitude: val.latitude,
              longitude: val.longitude,
            }}
            key={index}
            draggable>
            <View style={styles.markerHalo} />
          </Marker>
        );
      })}
    </MapView>
  );
};

export default TopicMap;
