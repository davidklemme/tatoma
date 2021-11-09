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
  const {allTopics, setAllTopics, uuid} = react.useContext(AppContext);
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
    console.info(
      'TYPEAHEAD -',
      'showing suggestions? ',
      showSuggestions,
      '\n Keyword: ',
      newProp,
      '\n topic list \n ',
      allTopics,
      '\n filtered list: \n',
      filteredTopics,
    );
  }, [newProp]);

  const endEdit = () => {
    setshowSuggestions(!showSuggestions);
    lastNameRef.current.blur();
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
