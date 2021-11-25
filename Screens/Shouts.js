import React, * as react from 'react';
import AppContext from '../Components/AppContext';
import ChatContainer from '../Components/Chat/ChatContainer';

const Shouts = ({route, navigation, screenProps}) => {
  const {username, isAuthenticated, focusTopic, uuid} =
    react.useContext(AppContext);
  return <ChatContainer />;
};
export default Shouts;
