/* eslint-disable react/prop-types */
import React, * as react from 'react';
import {Text, View} from 'react-native';
import styles from '../assets/styles/globalStyles';
import AppContext from '../Components/AppContext';
import TopicMap from '../Components/MapComponent';
import ReachOut from '../Components/ReachOut';
import Welcome from '../Components/Welcome';

const defaultLocation = {
  latitude: 52.31,
  longitude: 13.23,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const Home = ({route, navigation, screenProps}) => {
  const {username, isAuthenticated, focusTopic, uuid} =
    react.useContext(AppContext);
  const [showButtons, setShowButtons] = react.useState(false);
  react.useEffect(() => {
    if (isAuthenticated && focusTopic) {
      setShowButtons(true);
    }
  }, [isAuthenticated, focusTopic]);
  return (
    <View style={styles.container}>
      <Welcome
        username={username ? username : 'there'}
        authentication={isAuthenticated}
      />
      {showButtons && <ReachOut />}
      <TopicMap />
    </View>
  );
};
export default Home;
