import React from 'react';
import {TouchableHighlight, View, Text} from 'react-native';
import {WebView} from 'react-native-webview';

const MyWeb = () => {
  return (
    <WebView
      source={{uri: 'https://github.com/manojlamichhane/FireBaseApplication'}}
    />
  );
};

export default MyWeb;
