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
import styles from '../assets/styles/globalStyles';

const SuggestionItem = ({showTopics, setShowTopics, item, endEdit}) => {
  const [bgColor, setBgColor] = react.useState(
    styles.suggestionItem.backgroundColor,
  );
  return (
    <View>
      <Pressable
        onPress={() => {
          setBgColor('white');
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
