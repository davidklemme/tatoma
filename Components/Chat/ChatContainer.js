import React, * as react from 'react';
import {Text, View} from 'react-native';
import styles from '../../assets/styles/globalStyles';
import AppContext from '../../Components/AppContext';
import ChatList from './ChatList';
const ChatContainer = ({route, navigation, screenProps}) => {
  const {username, isAuthenticated, focusTopic, uuid, shoutList} =
    react.useContext(AppContext);
  return (
    <View style={styles.chatContainer}>
      <Text style={styles.h2}>{focusTopic}</Text>
      <ChatList />
    </View>
  );
};
export default ChatContainer;
