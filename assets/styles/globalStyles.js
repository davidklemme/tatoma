import {StyleSheet, Dimensions, Platform} from 'react-native';
/*
standard colour palette:

 CSS HEX 
--maximum-yellow-red: #ffc759ff;
--tickle-me-pink: #ff7b9cff;
--blue-yonder: #607196ff;
--light-periwinkle: #babfd1ff;

 CSS HSL 
--maximum-yellow-red: hsla(40, 100%, 67%, 1);
--tickle-me-pink: hsla(345, 100%, 74%, 1);
--blue-yonder: hsla(221, 22%, 48%, 1);
--light-periwinkle: hsla(227, 20%, 77%, 1);

 SCSS HEX 
$maximum-yellow-red: #ffc759ff;
$tickle-me-pink: #ff7b9cff;
$blue-yonder: #607196ff;
$light-periwinkle: #babfd1ff;

 SCSS HSL 
$maximum-yellow-red: hsla(40, 100%, 67%, 1);
$tickle-me-pink: hsla(345, 100%, 74%, 1);
$blue-yonder: hsla(221, 22%, 48%, 1);
$light-periwinkle: hsla(227, 20%, 77%, 1);

 SCSS RGB 
$maximum-yellow-red: rgba(255, 199, 89, 1);
$tickle-me-pink: rgba(255, 123, 156, 1);
$blue-yonder: rgba(96, 113, 150, 1);
$light-periwinkle: rgba(186, 191, 209, 1);

 SCSS Gradient 
$gradient-top: linear-gradient(0deg, #ffc759ff, #ff7b9cff, #607196ff, #babfd1ff);
$gradient-right: linear-gradient(90deg, #ffc759ff, #ff7b9cff, #607196ff, #babfd1ff);
$gradient-bottom: linear-gradient(180deg, #ffc759ff, #ff7b9cff, #607196ff, #babfd1ff);
$gradient-left: linear-gradient(270deg, #ffc759ff, #ff7b9cff, #607196ff, #babfd1ff);
$gradient-top-right: linear-gradient(45deg, #ffc759ff, #ff7b9cff, #607196ff, #babfd1ff);
$gradient-bottom-right: linear-gradient(135deg, #ffc759ff, #ff7b9cff, #607196ff, #babfd1ff);
$gradient-top-left: linear-gradient(225deg, #ffc759ff, #ff7b9cff, #607196ff, #babfd1ff);
$gradient-bottom-left: linear-gradient(315deg, #ffc759ff, #ff7b9cff, #607196ff, #babfd1ff);
$gradient-radial: radial-gradient(#ffc759ff, #ff7b9cff, #607196ff, #babfd1ff);


*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatContainer: {
    width: Dimensions.get('window').width * 0.9 - 20,
    backgroundColor: '#babfd1ff',
    flexDirection: 'column',
    margin: 10,
    borderColor: 'red',
    alignSelf: 'center',
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
    pinColor: 'darkorange',
  },
  markerHalo: {
    position: 'absolute',
    backgroundColor: '#ff7b9cff',
    top: 0,
    left: 0,
    width: 15,
    height: 15,
    borderRadius: Math.ceil(15 / 2),
  },
});

export default styles;
