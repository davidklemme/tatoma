import React, * as react from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './Routes/Navigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppContext from './Components/AppContext';
import Auth0 from 'react-native-auth0';
import jwtDecode from 'jwt-decode';
import ReadNeo4J from './API/Neo4J';
import PubNub from 'pubnub';
import {
  REACT_APP_AUTH0_ISSUER_BASE_URL,
  REACT_APP_AUTH0_CLIENT_ID,
  REACT_APP_AUTH0_BASE_URL,
  REACT_APP_PUBNUB_PUBLISH_KEY,
  REACT_APP_PUBNUB_SUBSCRIBE_KEY,
  REACT_APP_DEFAULT_LOCATION,
} from '@env';
import {pnPublish, pnSubscribe, pnUnsubscribe} from './API/PubNubHelper';

const auth0 = new Auth0({
  domain: REACT_APP_AUTH0_ISSUER_BASE_URL,
  clientId: REACT_APP_AUTH0_CLIENT_ID,
  redirectUri: REACT_APP_AUTH0_BASE_URL,
});
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
  const [allTopics, setAllTopics] = react.useState([
    {key: 'Foo', count: 47},
    {key: 'bar', count: 10},
  ]);
  const [markers, setMarkers] = react.useState([]);
  const [hasLocationAuthorization, setLocationAuthorization] =
    react.useState(false);

  const logInUser = async () => {
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
      const pn = new PubNub({
        publishKey: REACT_APP_PUBNUB_PUBLISH_KEY,
        subscribeKey: REACT_APP_PUBNUB_SUBSCRIBE_KEY,
        uuid: uuid,
      });
      setPubNub(pn);
      console.info('PUBNUB -- set pn object');
    }
  }, [isAuthenticated, uuid]);

  react.useEffect(() => {
    if (!topicList || !pubnub) {
      return;
    }
    console.debug('topicList to subscribe to: \n', topicList);

    const subscribeToTopics = async () => {
      const subscriptionList = topicList.map(item => {
        return item.key;
      });
      const foo = await pnSubscribe(pubnub, subscriptionList, '', uuid);
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
        pubnub,
        hasLocationAuthorization,
        setLocationAuthorization,
        location,
        setLocation,
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
