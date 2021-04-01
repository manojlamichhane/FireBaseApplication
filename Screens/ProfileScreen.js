import React, {useContext} from 'react';
import {WebView} from 'react-native-webview';
import {
  Text,
  Image,
  Dimensions,
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../constants';
import AuthContext from '../store/contexts/AuthContext';
import {Button} from 'react-native-paper';

const ProfileScreen = () => {
  const authContext = useContext(AuthContext);
  const profile = authContext.authUser;

  const navigation = useNavigation();
  const LogOut = () => {
    authContext.logout();
    // navigation.navigate('Login');
  };

  return (
    <SafeAreaView>
      <View style={{height: Dimensions.get('window').height}}>
        <Image
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height * 0.4,
          }}
          source={{
            uri:
              'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
          }}
        />

        <View style={styles.profileDetail}>
          <ScrollView>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 25}}>
                  {profile.name}
                </Text>
                <Text style={{color: 'white', fontSize: 15}}>
                  {profile.email}
                </Text>
              </View>
              <View
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: 'white',
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  onPress={() => console.log('edit pressed')}
                  name="edit"
                  size={20}
                  color={Colors.primary}
                />
              </View>
            </View>

            <View style={{marginTop: 110}}>
              <Button
                style={{backgroundColor: 'white', marginBottom: 20}}
                color={Colors.primary}
                mode="outlined"
                onPress={() => (
                  <WebView
                    source={{
                      uri: 'https://github.com/manojlamichhane/reactnative.git',
                    }}
                  />
                )}>
                GITHUB link
              </Button>
              {/* <Button
                style={{backgroundColor: 'white', marginBottom: 20}}
                color={Colors.primary}
                mode="outlined"
                onPress={navigation.navigate('MyPosts')}>
                View My Posts
              </Button> */}
              <Button
                style={{backgroundColor: 'white'}}
                icon="logout"
                color={Colors.primary}
                mode="outlined"
                onPress={LogOut}>
                LOGOUT
              </Button>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  profileDetail: {
    justifyContent: 'flex-start',
    height: Dimensions.get('window').height,
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 30,
  },
});
export default ProfileScreen;
