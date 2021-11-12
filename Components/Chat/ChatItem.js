import React, * as react from 'react';
import {Text, View, FlatList} from 'react-native';
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
  return (
    <View style={styles.chatItemContainer}>
      <Text
        style={{
          textAlign: chatUuid === userUuid ? 'right' : 'left',
          margin: 5,
          borderRadius: 10,
          marginRight: chatUuid === userUuid ? 0 : 120,
          marginLeft: chatUuid === userUuid ? 120 : 0,
          paddingBottom: 0,
          paddingTop: 0,
          paddingLeft:10,
          fontWeight: '300',
          maxWidth: 200,
        }}>
        {message}
      </Text>
      <Text
        style={{
          textAlign: chatUuid === userUuid ? 'right' : 'left',
          margin: 5,
          borderRadius: 10,
          marginRight: chatUuid === userUuid ? 0 : 120,
          marginLeft: chatUuid === userUuid ? 120 : 0,
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
