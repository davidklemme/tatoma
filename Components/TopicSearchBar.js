import React, * as react from 'react';
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
import {Input} from 'react-native-elements/dist/input/Input';
import AppContext from '../Components/AppContext';
import styles from '../assets/styles/globalStyles';
import SuggestionItem from './SuggestionItem';
import ReadNeo4J from '../API/Neo4J';
import {sortedList} from '../assets/helper';

const TypeAheadTopics = () => {
  const {allTopics, setAllTopics, topicList, setTopicList, uuid} =
    react.useContext(AppContext);
  const [newProp, onChangeText] = react.useState('Type to add new interest');
  const [showSuggestions, setshowSuggestions] = react.useState(false);
  const [filteredTopics, setFilteredTopics] = react.useState([]);

  react.useEffect(() => {
    setFilteredTopics(
      sortedList(
        allTopics?.filter(it =>
          it.key.toLowerCase().startsWith(newProp.toLowerCase()),
        ),
      ).map(item => {
        return item.key;
      }),
    );
    // console.info(
    //   'TYPEAHEAD -',
    //   'showing suggestions? ',
    //   showSuggestions,
    //   '\n Keyword: ',
    //   newProp,
    //   '\n topic list \n ',
    //   allTopics,
    //   '\n filtered list: \n',
    //   filteredTopics,
    // );
  }, [newProp]);

  const addTopic = async () => {
    //TODO combine in one query
    //add Topic if not exists
    await ReadNeo4J(`MERGE (h:Hobby {name: '${newProp}'}) RETURN h.name`, uuid);
    //add relationship
    await ReadNeo4J(
      `MATCH (user {uuid: "${uuid}"}),(h:Hobby {name:"${newProp}"})
      MERGE(user)-[r:FOLLOWS]->(h)
      RETURN h.name, SIZE(()-[:FOLLOWS]->(h)) as count`,
      uuid,
    );
    setTopicList(topicList => [...topicList, newProp]);
    const getNeoTopics = async () => {
      const neoTopics = await ReadNeo4J(
        `MATCH (user {uuid: '${uuid}'})--> (Hobby) RETURN Hobby.name, SIZE(()-[:FOLLOWS]->(Hobby)) as count`,
        uuid,
      );
      setTopicList(neoTopics);
      console.log(topicList);
    };
    //TODO Put this in useEffect (App.js)? The same function is defined and executed in 3 (!!) different classes/functions. Not ideal...
    getNeoTopics();
  };

  const endEdit = () => {
    setshowSuggestions(!showSuggestions);
    lastNameRef.current.blur();
    addTopic();
  };
  const lastNameRef = react.useRef();

  const SuggestionsList = () => {
    return (
      <FlatList
        data={filteredTopics}
        extraData={newProp}
        renderItem={({item, index}) => (
          <SuggestionItem
            showSuggestions={showSuggestions}
            setshowSuggestions={setshowSuggestions}
            item={item}
            endEdit={endEdit}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };
  return (
    <View>
      <TextInput
        ref={lastNameRef}
        style={styles.searchBar}
        onFocus={() => setshowSuggestions(true)}
        onEndEditing={() => setshowSuggestions(false)}
        value={newProp}
        TextInput={Input}
        onChangeText={onChangeText}
        clearTextOnFocus={true}
        searchIcon={false}
        cancelIcon={false}
        onSubmitEditing={() => {
          endEdit();
        }}
      />
      {showSuggestions && <SuggestionsList />}
    </View>
  );
};
export default TypeAheadTopics;
