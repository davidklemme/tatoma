import React, * as react from 'react';
import {Text} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import AppContext from './AppContext';
import styles from '../assets/styles/globalStyles';
import getCurrentLocation from '../API/LocationAPI';

const TopicMap = () => {
  const {
    location,
    username,
    isAuthenticated,
    focusTopic,
    hasLocationAuthorization,
    setLocationAuthorization,
    setLocation,
  } = react.useContext(AppContext);

  const getLocation = async () => {
    await getCurrentLocation();
  };
  if (!location.timestamp) {
    getLocation();
  }
  react.useEffect(() => {
    console.log('GEOLOCATION --- location has changed ', location);
  }, [location]);

  return <MapView region={location} style={styles.map} />;
};

export default TopicMap;

/*

{markers.map((val, index) => {
			if(val.channel === focusTopic ){
				return (
					<Marker
						coordinate={{
							latitude: val.latitude,
							longitude: val.longitude
						}}
						key={index}
						draggable
						style={styles.marker}
					>
					</Marker>
				);
			}
		})
		}
*/
