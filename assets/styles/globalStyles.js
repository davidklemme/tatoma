import {StyleSheet, Dimensions, Platform} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    fontSize: 14,
    textAlign: 'center',
  },
  h2: {
    fontSize: 20,
    textAlign: 'center',
  },
  listItemText: {
    fontSize: 16,
    textAlign: 'left',
    textAlignVertical: 'center',
    paddingLeft: 10,
  },
  suggestionItem: {
    flexDirection: 'column',
    color: '#607196',
    backgroundColor: 'white',
    height: 40,
    width: Dimensions.get('window').width * 0.9 - 40,
    marginLeft: 40,
    paddingTop: 10,
  },
  searchBar: {
    //cannot set height here, will make typed text disappear ... ¯\_(ツ)_/¯
    // height: (Platform.OS = 'android' ? 40 : 20),
    width: Dimensions.get('window').width * 0.9,
    margin: 20,
    borderWidth: 1,
    padding: 20,
    borderRadius: 10,
    color: 'black',
  },
  listFocusItem: {
    width: 152,
    height: 50,
    backgroundColor: '#babfd1ff',
    borderRadius: 5,
    alignItems: 'center',
    textAlign: 'left',
    flexDirection: 'row',
  },
  listItem: {
    width: 152,
    height: 50,
    backgroundColor: '#ffc759ff',
    borderRadius: 5,
    alignItems: 'center',
    textAlign: 'left',
    flexDirection: 'row',
  },
  list: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.075,
    paddingTop: 20,
    backgroundColor: 'babfd1ff',
  },
  badge: {
    paddingLeft: 10,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    backgroundColor: '#ff7b9cff',
    height: 20,
    width: 40,
    borderRadius: 20,
    display: 'flex',
  },
  reachOutButtonText: {
    color: '#ff7b9cff',
  },
  reachOutButton: {
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ff7b9cff',
    paddingLeft: 10,
    paddingRight: 10,
    marginHorizontal: 10,
  },
  reachOut: {
    flexDirection: 'row',
    padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.6,
  },
  marker: {
    backgroundColor: 'darkorange',
    padding: 10,
    width: 10,
    height: 10,
    borderRadius: 10,
  },
});

export default styles;
