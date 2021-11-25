import React, * as react from 'react';
import {View} from 'react-native';
import Welcome from '../Components/Welcome';
import styles from '../assets/styles/globalStyles';
import AppContext from '../Components/AppContext';
import TopicList from '../Components/TopicList';
import TypeAheadTopics from '../Components/TopicSearchBar';

const Profile = ({navigation, route}) => {
  const {username, isAuthenticated} = react.useContext(AppContext);

  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        <>
          <TypeAheadTopics />
          <TopicList />
        </>
      ) : (
        <Welcome
          username={username ? username : 'there'}
          authentication={isAuthenticated}
        />
      )}
    </View>
  );
};
export default Profile;
