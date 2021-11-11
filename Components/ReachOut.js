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

const ReachOut = ({navigation}) => {
  const {focusTopic, isAuthenticated, pubnub, uuid, location} =
    react.useContext(AppContext);
  const ping = async message => {
    if (!focusTopic || !isAuthenticated) {
      console.warn('Dude - pick a topic first!', focusTopic);
      return;
    }
    const publish = async () => {
      try {
        await pnPublish(pubnub, focusTopic, location, uuid);
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
          ping();
        }}>
        <Text style={styles.reachOutButtonText}>Send a Ping</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.reachOutButton}
        onPress={() => {
          navigation.navigate('Shouts', {screen: 'Shouts'});
        }}>
        <Text style={styles.reachOutButtonText}>Send a Shout</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ReachOut;
