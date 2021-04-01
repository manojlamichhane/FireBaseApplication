import React from 'react';
import {ActivityIndicator, Colors} from 'react-native-paper';

const SplashScreen = () => (
  <ActivityIndicator animating={true} color={Colors.red800} />
);

export default SplashScreen;
