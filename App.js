import React, * as react from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './Routes/Navigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppContext from './Components/AppContext';
import Auth0 from 'react-native-auth0';
import jwtDecode from 'jwt-decode';
import ReadNeo4J from './API/Neo4J';
import PubNub from 'pubnub';
import getKey from './assets/globalVars';
import {pnSubscribe} from './API/PubNubHelper';

import {sortedList} from './assets/helper';

const App = () => {
  const [uuid, setUUID] = react.useState(null);
  const [username, setUsername] = react.useState('Jane Doe');
  const [location, setLocation] = react.useState({
    latitude: 52.31,
    longitude: 13.23,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0921,
    timestamp: null,
  });
  const [authToken, setAuthToken] = react.useState(null);
  const [isAuthenticated, setAuthenticated] = react.useState(false);
  const [userPicture, setUserPicture] = react.useState(null);
  const [pubnub, setPubNub] = react.useState(null);
  const [focusTopic, setFocusTopic] = react.useState(null);
  const [topicList, setTopicList] = react.useState(null);
  const [shoutList, setShoutList] = react.useState([
    {
      uuid: '123',
      message: 'hello',
      type: 'message',
      channel: 'Baseball',
      timestamp: '1636556191',
    },
    {
      uuid: '124',
      message: 'world',
      type: 'message',
      channel: 'Baseball',
      timestamp: '1636556192',
    },
  ]);
  //TODO rename allTopics & topicList to be less ambiguous.
  const [allTopics, setAllTopics] = react.useState([
    {key: 'Foo', count: 47},
    {key: 'bar', count: 10},
  ]);
  const [markers, setMarkers] = react.useState([]);
  const [hasLocationAuthorization, setLocationAuthorization] =
    react.useState(false);

  const logInUser = async () => {
    const auth0 = new Auth0({
      domain: await getKey('AUTH0', 'ISSUER_BASE_URL'),
      clientId: await getKey('AUTH0', 'CLIENT_ID'),
      redirectUri: await getKey('AUTH0', 'BASE_URL'),
    });
    try {
      let credentials = await auth0.webAuth.authorize({
        scope: 'openid profile email',
      });
      setAuthToken(credentials.accessToken);
      const idToken = jwtDecode(credentials.idToken);
      console.info('AUTH --- grabbed id token \n', idToken);
      setUUID(idToken.sub);
      setUsername(idToken.name);
      setAuthenticated(true);
      setUserPicture(idToken.picture);
    } catch (error) {
      console.log(error);
    }
  };

  react.useEffect(() => {
    if (!isAuthenticated || !uuid) {
      return;
    }
    console.log('user is authenticated -> getting topic list from API');
    //build cypher
    //get cyhper results from neo4j Aura - CREATE USER IF NOT EXISTS
    const getNeoUser = async () => {
      //TODO make sure that Jane Doe is not mixed in - so that 2 users end up with the same uuid
      await ReadNeo4J(
        `MERGE (user:User {name: '${username}',uuid: '${uuid}'}) RETURN user.name,user.uuid`,
        uuid,
      );
    };

    const getNeoTopics = async () => {
      const neoTopics = await ReadNeo4J(
        `MATCH (user {uuid: '${uuid}'})--> (Hobby) RETURN Hobby.name, SIZE(()-[:FOLLOWS]->(Hobby)) as count`,
        uuid,
      );
      setTopicList(neoTopics);
    };

    const getAllAvailableNeoTopics = async () => {
      const allNeoTopics = await ReadNeo4J(
        'MATCH (n:Hobby) RETURN n.name, SIZE(()-[:FOLLOWS]->(n)) as count',
        uuid,
      );
      setAllTopics(sortedList(allNeoTopics));
      console.debug('All available topics :\n', allNeoTopics);
    };
    getNeoUser();
    getNeoTopics();
    getAllAvailableNeoTopics();
    if (!pubnub) {
      createPubnubObject();
    }
  }, [isAuthenticated, uuid]);

  const createPubnubObject = async () => {
    const pn = new PubNub({
      publishKey: await getKey('PUBNUB', 'PUBLISH_KEY'),
      subscribeKey: await getKey('PUBNUB', 'SUBSCRIBE_KEY'),
      uuid: uuid,
    });
    setPubNub(pn);
    console.info('PUBNUB -- set pn object');
  };

  react.useEffect(() => {
    if (!topicList || !pubnub) {
      return;
    }
    console.debug('topicList to subscribe to: \n', topicList);

    const subscribeToTopics = async () => {
      const subscriptionList = topicList.map(item => {
        return item.key;
      });
      const foo = await pnSubscribe(
        pubnub,
        subscriptionList,
        '',
        uuid,
        markers,
        setMarkers,
        shoutList,
        setShoutList,
      );
      return foo;
    };
    subscribeToTopics();
  }, [topicList, pubnub]);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        uuid,
        username,
        logInUser,
        focusTopic,
        setFocusTopic,
        topicList,
        setTopicList,
        allTopics,
        setAllTopics,
        markers,
        setMarkers,
        pubnub,
        hasLocationAuthorization,
        setLocationAuthorization,
        location,
        setLocation,
        shoutList,
        setShoutList,
      }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </AppContext.Provider>
  );
};

export default App;
