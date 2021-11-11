import React, * as react from 'react';
import {Text, View, FlatList} from 'react-native';
import styles from '../../assets/styles/globalStyles';
import AppContext from '../../Components/AppContext';
import ChatItem from './ChatItem';

const ChatList = ({route, navigation, screenProps}) => {
  const {username, isAuthenticated, focusTopic, uuid, shoutList} =
    react.useContext(AppContext);

  const focusShoutList = shoutList.filter(item => {
    if (item.channel === focusTopic) {
      return item;
    }
  });
  //TODO sort list before to cutoff at items older than : X
  return (
    <View>
      <FlatList
        data={focusShoutList.sort((a, b) => (a > b ? 1 : -1))}
        renderItem={({item, index}) => {
          return (
            <ChatItem
              message={item.message}
              time={item.timestamp}
              chatUuid={item.uuid}
              userUuid={uuid}
            />
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
export default ChatList;
