import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../Screens/Home';
import Profile from '../Screens/Profile';
import React from 'react';
import LogoIcon from '../Components/Icons/LogoIcon';
import UserIcon from '../Components/Icons/UserIcon';

const headerConfig = {
  defaultNavigationOptions: {
    headerTintColor: 'blue',
    headerStyle: {
      backgroundColor: '#fff',
    },
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
  navigationOptions: {
    tabBarLabel: 'Home!',
  },
};

const screens = {
  tatoma: {
    screen: Home,
    navigationOptions: ({navigation}) => ({
      headerRight: () => (
        <UserIcon size={20} color="blue" navigation={navigation} />
      ),
      headerLeft: () => <LogoIcon size={'200'} />,
    }),
  },
  Profile: {
    screen: Profile,
  },
};

const Stack = createNativeStackNavigator();
const Navigator = ({initialState}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="tatoma"
        component={Home}
        options={({navigation, route}) => ({
          headerRight: () => (
            <UserIcon size={20} color="blue" navigation={navigation} />
          ),
          headerLeft: () => <LogoIcon size={'100%'} />,
        })}
        initialParams={initialState}
        props
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        initialParams={initialState}
      />
    </Stack.Navigator>
  );
};
export default Navigator;
