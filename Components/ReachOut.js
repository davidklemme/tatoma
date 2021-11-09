import React, * as react from 'react';
import {
  View,
  Button,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import styles from '../assets/styles/globalStyles';
import AppContext from './AppContext';
import pnPublish from '../API/PubNubHelper';

const ReachOut = () => {
  const {focusTopic, isAuthenticated, pn, uuid} = react.useContext(AppContext);
  const pingOrShout = message => {
    if (!focusTopic || isAuthenticated) {
      //Alert.alert('Dude - pick a topic first!');
    }
    const publish = async message => {
      await pnPublish(pn, focusTopic, message, uuid);
    };
    publish();
  };

  return (
    <View style={styles.reachOut}>
      <TouchableOpacity
        style={styles.reachOutButton}
        onPress={pingOrShout('ping')}>
        <Text style={styles.reachOutButtonText}>Send a Ping</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.reachOutButton}
        onPress={pingOrShout('shout')}>
        <Text style={styles.reachOutButtonText}>Send a Shout</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ReachOut;
