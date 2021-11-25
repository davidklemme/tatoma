import React, * as react from 'react';
import {FlatList, View, Text, TouchableOpacity, Button} from 'react-native';
import AppContext from '../Components/AppContext';
import styles from '../assets/styles/globalStyles';
import ReadNeo4J from '../API/Neo4J';
import {sortedList} from '../assets/helper';

const TopicList = () => {
  const {uuid, focusTopic, setFocusTopic, topicList, setTopicList} =
    react.useContext(AppContext);

  const removeNeoTopic = async topic => {
    console.warn(` ===> deleting relationship to ${topic} . <===`);
    const deleteTopic = await ReadNeo4J(
      `MATCH (n {uuid: '${uuid}'})-[r:FOLLOWS]->(h:Hobby {name:'${topic}'}) DELETE (r)`,
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

  return (
    <FlatList
      data={sortedList(topicList)}
      renderItem={({item}) => {
        return (
          <View style={styles.list}>
            <TouchableOpacity
              style={
                item.key === focusTopic ? styles.listItem : styles.listFocusItem
              }
              onPress={() => {
                setFocusTopic(item.key);
              }}>
              <Text style={styles.listItemText}>{item.key}</Text>
              <View>
                <Text style={styles.badge}>{item.count}</Text>
              </View>
              <Button
                title="X"
                onPress={() => {
                  removeNeoTopic(item.key);
                }}
              />
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );
};
export default TopicList;
