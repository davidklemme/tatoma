import React, * as react from 'react';
import {View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import AppContext from './AppContext';
import styles from '../assets/styles/globalStyles';
import getCurrentLocation from '../API/LocationAPI';

const TopicMap = () => {
  const {focusTopic, location, markers} = react.useContext(AppContext);

  const getLocation = async () => {
    await getCurrentLocation();
  };
  if (!location.timestamp) {
    getLocation();
  }
  //TODO - how to bundle - e.g. whats to cutoff point for the number of markers AND the age of the marker
  const focusMarkers = markers.filter(marker => {
    if (marker.channel === focusTopic) {
      return marker;
    }
  });
  console.log('MAP --- Markers: \n', focusMarkers);
  return (
    <MapView region={location} style={styles.map}>
      {focusMarkers.map((val, index) => {
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
