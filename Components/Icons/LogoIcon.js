import React from 'react';
import {ImageBackground, View} from 'react-native';
import tatomaLogo from '../../assets/tatoma_logo.png';

const styles = {
  padding: 10,
};

const LogoIcon = ({size, color, navigation}) => (
  <View>
    <ImageBackground source={tatomaLogo} style={styles} height={size}>
      {/* TODO: something goes here  */}
    </ImageBackground>
  </View>
);

export default LogoIcon;
