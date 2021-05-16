import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from '../Screens/ProfileScreen';
import TodosScreen from '../Screens/TodosScreen';
import IndexScreen from '../Screens/IndexScreen';
import MyPostsScreen from '../Screens/MyPostsScreen';
import ChatNavigation from './ChatNavigation';
import ChatScreen from '../Screens/ChatScreen';

const HomeNavigation = () => {
  const HomeTab = createBottomTabNavigator();
  return (
    <HomeTab.Navigator>
      <HomeTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={() => ({
          tabBarIcon: ({color}) => (
            <Icon name="person" size={30} color={color} />
          ),
        })}
      />
      <HomeTab.Screen
        name="Index"
        component={IndexScreen}
        options={() => ({
          tabBarIcon: ({color}) => (
            <Icon name="md-file-tray-outline" size={24} color={color} />
          ),
        })}
      />
      <HomeTab.Screen
        name="Todos"
        component={TodosScreen}
        options={() => ({
          tabBarIcon: ({color}) => (
            <Icon name="ios-list-sharp" size={30} color={color} />
          ),
        })}
      />
      <HomeTab.Screen
        name="MyPosts"
        component={MyPostsScreen}
        options={() => ({
          tabBarIcon: ({color}) => (
            <Icon name="location" size={30} color={color} />
          ),
        })}
      />
      <HomeTab.Screen
        name="chat"
        component={ChatNavigation}
        options={() => ({
          tabBarIcon: ({color}) => (
            <Icon name="chatbox-outline" size={30} color={color} />
          ),
        })}
      />
    </HomeTab.Navigator>
  );
};

export default HomeNavigation;
