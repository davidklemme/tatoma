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
import {pnPublish} from '../API/PubNubHelper';

const ReachOut = () => {
  const {focusTopic, isAuthenticated, pubnub, uuid, location} =
    react.useContext(AppContext);
  const pingOrShout = async message => {
    if (!focusTopic || !isAuthenticated) {
      console.warn('Dude - pick a topic first!', focusTopic);
      return;
    }
    const publish = async () => {
      try {
        await pnPublish(pubnub, focusTopic, message ? message : location, uuid);
      } catch (e) {
        console.error(e);
      }
    };
    publish();
  };

  return (
    <View style={styles.reachOut}>
      <TouchableOpacity
        style={styles.reachOutButton}
        onPress={() => {
          pingOrShout();
        }}>
        <Text style={styles.reachOutButtonText}>Send a Ping</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.reachOutButton}
        onPress={() => {
          pingOrShout('shout');
        }}>
        <Text style={styles.reachOutButtonText}>Send a Shout</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ReachOut;
