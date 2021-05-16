import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ChatScreen from '../Screens/ChatScreen';
import MessageScreen from '../Screens/MessageScreen';
import {createStackNavigator} from '@react-navigation/stack';

const ChatNavigation = () => {
  const ChatTab = createBottomTabNavigator();
  const ChatStack = createStackNavigator();
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="Home"
        component={ChatScreen}
        options={{headerShown: false}}
      />
      <ChatStack.Screen name="Messages" component={MessageScreen} />
    </ChatStack.Navigator>
  );
};

export default ChatNavigation;
