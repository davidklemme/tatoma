import React, * as react from 'react';
import {Text, View} from 'react-native';
import styles from '../../assets/styles/globalStyles';
import AppContext from '../../Components/AppContext';
import ChatList from './ChatList';
import {TextInput} from 'react-native';
import {Input} from 'react-native-elements/dist/input/Input';
import {pnPublish} from '../../API/PubNubHelper';

const ChatContainer = ({route, navigation, screenProps}) => {
  const {isAuthenticated, focusTopic, uuid, pubnub} =
    react.useContext(AppContext);
  const [shoutContent, setShoutContent] = react.useState('');

  const shout = async => {
    if (!focusTopic || !isAuthenticated) {
      console.warn('Dude - pick a topic first!', focusTopic);
      return;
    }

    const publish = async () => {
      const shoutMessage = {
        message: shoutContent,
        type: 'shout',
        timestamp: Date.now() / 1000,
        uuid,
      };
      console.log(shoutMessage);
      try {
        await pnPublish(pubnub, focusTopic, shoutMessage, uuid, 'shout');
      } catch (e) {
        console.error(e);
      }
    };
    publish();
  };

  const endEdit = () => {
    lastNameRef.current.blur();
    console.debug('shouting', shoutContent);
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
