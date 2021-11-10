import React, * as react from 'react';
import {Text, View} from 'react-native';
import styles from '../../assets/styles/globalStyles';
import AppContext from '../../Components/AppContext';

const ChatList = ({route, navigation, screenProps}) => {
  const {username, isAuthenticated, focusTopic, uuid, shoutList} =
    react.useContext(AppContext);

  return (
    <View>
      {shoutList.map(item => {
        console.log(item);
        return (
          <Text style={{textAlign: item.uuid === uuid ? 'right' : 'left'}}>
            {item.message}
          </Text>
        );
      })}
    </View>
  );
};
export default ChatList;
