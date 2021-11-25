import React from 'react';
import {Text, View} from 'react-native';
import styles from '../../assets/styles/globalStyles';
import {formatTimestamp} from '../../assets/helper';

/*
TODO - structure
split Item into different sections.
Current approach:
-time
-message

no user -tbd
*/

const ChatItem = ({message, time, chatUuid, userUuid}) => {
  const myShout = chatUuid === userUuid ? true : false;
  return (
    <View style={styles.chatItemContainer}>
      <Text
        style={{
          margin: 5,
          borderRadius: 10,
          paddingBottom: 0,
          paddingTop: 0,
          paddingLeft: 10,
          fontWeight: '300',
          maxWidth: 200,
        }}>
        {message}
      </Text>
      <Text
        style={{
          margin: 5,
          borderRadius: 10,
          paddingLeft: 10,
          paddingBottom: 0,
          paddingTop: 0,
          fontWeight: '100',
        }}>
        {formatTimestamp(time)}
      </Text>
    </View>
  );
};
export default ChatItem;
