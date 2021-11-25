import React, * as react from 'react';
import {View, Image} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUserCog} from '@fortawesome/free-solid-svg-icons';
import AppContext from '../AppContext';

const styles = {
  padding: 10,
};
//TODO insert reducer and useState to grab change in useContext

const UserIcon = ({size, color, navigation}) => {
  const {userPic} = react.useContext(AppContext);
  react.useEffect(() => {
    console.log('uri for user pic:', userPic);
  }, [userPic]);
  return (
    <View>
      {userPic ? (
        <Image source={{uri: `${userPic}`}} />
      ) : (
        <FontAwesomeIcon
          icon={faUserCog}
          size={size}
          color={color}
          style={styles}
          onPress={() => {
            navigation.navigate('Profile', {
              itemId: 86,
              otherParam: 'anything you want here',
            });
          }}
        />
      )}
    </View>
  );
};

export default UserIcon;
