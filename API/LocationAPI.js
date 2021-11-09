import * as react from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import AppContext from '../Components/AppContext';

export default async function getCurrentLocation() {
  const {
    location,
    setLocation,
    hasLocationAuthorization,
    setLocationAuthorization,
  } = react.useContext(AppContext);

  const setPositionLocation = ({coords: {latitude, longitude}, timestamp}) => {
    console.info('GEOLOCATION --- ', latitude, longitude, timestamp);
    setLocation({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      timestamp: timestamp,
    });
  };

  console.info(
    'PERMISSIONS --- ACCESS_BACKGROUND_LOCATION ',
    hasLocationAuthorization,
  );
  if (!hasLocationAuthorization) {
    getLocationAuhorization(
      hasLocationAuthorization,
      setLocationAuthorization,
      setLocation,
      location,
    );
  } else {
    //TODO make dynamic - with listening to changes (background task with listener)
    if (location.timestamp > Date.now() + 180000) {
      return;
    }
    Geolocation.getCurrentPosition(
      position => {
        setPositionLocation(position);
      },
      error => {
        console.error(`Code ${error.code}`, error.message);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: true,
        forceLocationManager: true,
        showLocationDialog: true,
      },
    );
  }
}

const getLocationAuhorization = async (
  hasLocationAuthorization,
  setLocationAuthorization,
  setLocation,
  location,
) => {
  if (Platform.OS === 'android') {
    try {
      const granted = PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        {
          title: 'tatoma Background Location permission',
          message:
            'tatoma needs to know your location' +
            'in order to send pings and shouts.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the background location');
      } else {
        console.log('background location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  if (Platform.OS === 'ios') {
    const authorization = await Geolocation.requestAuthorization('always');
    if (authorization === 'granted') {
      console.log('authorization has been granted');
      setLocationAuthorization(true);
    }
  }
};
