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
    <Text style={{textAlign: chatUuid === userUuid ? 'right' : 'left'}}>
      {message} {formatTimestamp(time)}
    </Text>
  );
};
export default ChatItem;
