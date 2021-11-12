import React, * as react from 'react';
import {DatePickerAndroid, Text, View} from 'react-native';
import styles from '../../assets/styles/globalStyles';
import AppContext from '../../Components/AppContext';
import ChatList from './ChatList';
import {TextInput} from 'react-native';
import {Input} from 'react-native-elements/dist/input/Input';
import {pnPublish} from '../../API/PubNubHelper';

const ChatContainer = ({route, navigation, screenProps}) => {
  const {username, isAuthenticated, focusTopic, uuid, shoutList, pubnub} =
    react.useContext(AppContext);
  const [shoutContent, setShoutContent] = react.useState(null);
  const shout = async message => {
    if (!focusTopic || !isAuthenticated) {
      console.warn('Dude - pick a topic first!', focusTopic);
      return;
    }
    const publish = async () => {
      const message = {
        message: shoutContent,
        type: 'shout',
        timestamp: Date.now(),
      };
      console.log(message);
      try {
        await pnPublish(pubnub, focusTopic, message, uuid, 'shout');
      } catch (e) {
        console.error(e);
      }
    };
    publish();
  };

  const endEdit = () => {
    lastNameRef.current.blur();
    shout();
    setShoutContent('');
  };
  const lastNameRef = react.useRef();
  return (
    <>
      <View style={styles.chatContainer}>
        <Text style={styles.h2}>
          {focusTopic}
          {'\n'}
        </Text>
        <ChatList />
      </View>
      <TextInput
        ref={lastNameRef}
        style={styles.searchBar}
        value={shoutContent}
        TextInput={Input}
        onChangeText={setShoutContent}
        clearTextOnFocus={true}
        searchIcon={false}
        cancelIcon={false}
        onSubmitEditing={() => {
          endEdit();
        }}
      />
    </>
  );
};
export default ChatContainer;
