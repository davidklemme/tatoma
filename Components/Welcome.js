import React, * as react from 'react';
import {View, Text, Button} from 'react-native';
import styles from '../assets/styles/globalStyles';
import AppContext from './AppContext';

const Welcome = () => {
  const {username, logInUser} = react.useContext(AppContext);
  const {isAuthenticated} = react.useContext(AppContext);
  return (
    <View>
      <Text style={styles.h2}>
        Hi {username}, {'\n'}
      </Text>
      <Text style={styles.paragraph}>
        {isAuthenticated ? (
          'Shouts & pings on selected topic appear on the map. Switch to see other topics.'
        ) : (
          <Button
            title="Please log in to continue"
            style={styles.button}
            onPress={logInUser}
          />
        )}
      </Text>
    </View>
  );
};
export default Welcome;

//TODO show fallback button
