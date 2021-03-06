import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../Screens/LoginScreen';
import SignupScreen from '../Screens/SignupScreen';

const AuthNavigation = () => {
  const authStack = createStackNavigator();
  return (
    <authStack.Navigator>
      <authStack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <authStack.Screen
        name="Signup"
        component={SignupScreen}
        options={{headerShown: false}}
      />
    </authStack.Navigator>
  );
};

export default AuthNavigation;
