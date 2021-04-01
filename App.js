import React, {useState} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Colors} from './constants';
import AuthProvider from './store/providers/AuthProvider';
import AuthContext from './store/contexts/AuthContext';
import AuthNavigation from './navigation/AuthNavigation';
import HomeNavigation from './navigation/HomeNavigation';
import SplashScreen from './Screens/SplashScreen';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
  },
};
const App = () => {
  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <AuthContext.Consumer>
            {context => {
              if (context.isAuthenticating) {
                return <SplashScreen />;
              }
              return context.isAuthenticated ? (
                <HomeNavigation />
              ) : (
                <AuthNavigation />
              );
            }}
          </AuthContext.Consumer>
        </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
  );
};

export default App;
