import React, * as react from 'react';
import AppContext from './AppContext';
import {
  Item,
  FlatList,
  TextInput,
  Pressable,
  Modal,
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import styles from '../assets/styles/globalStyles';
import ReadNeo4J from '../API/Neo4J';

const SuggestionItem = ({showTopics, setShowTopics, item, endEdit}) => {
  const {topicList, setTopicList, uuid} = react.useContext(AppContext);
  //TODO catch side-effect if two users have same uuid (which is an error in itself)
  const addNeoTopics = async topic => {
    console.info(`NEO4J ===> adding relationship to ${topic} .<===`);
    const addTopic = await ReadNeo4J(
      `MATCH (user {uuid: '${uuid}'}),(h:Hobby {name:'${topic}'})
      MERGE(user)-[r:FOLLOWS]->(h)
      RETURN user.name, type(r),h.name`,
      uuid,
    );
    const getNeoTopics = async () => {
      const neoTopics = await ReadNeo4J(
        `MATCH (user {uuid: '${uuid}'})--> (Hobby) RETURN Hobby.name, SIZE(()-[:FOLLOWS]->(Hobby)) as count`,
        uuid,
      );
      setTopicList(neoTopics);
      console.log(topicList);
    };
    //TODO maybe put this in useEffect (App.js)? The same function is defined and executed in two different classes/functions. Not ideal...
    getNeoTopics();
  };
  const [bgColor, setBgColor] = react.useState(
    styles.suggestionItem.backgroundColor,
  );

  return (
    <View>
      <Pressable
        onPress={() => {
          setBgColor('white');
          addNeoTopics(item);
          endEdit();
        }}
        onPressIn={() => {
          setBgColor('#607196');
        }}
        style={{backgroundColor: {bgColor}}}>
        <Text style={styles.suggestionItem}>{item}</Text>
      </Pressable>
    </View>
  );
};
export default SuggestionItem;
