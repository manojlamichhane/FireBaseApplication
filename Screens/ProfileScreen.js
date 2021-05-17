import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  Image,
  Dimensions,
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../constants';
import AuthContext from '../store/contexts/AuthContext';
import {Button} from 'react-native-paper';
import MyWeb from './MyWeb';
import {useNavigation} from '@react-navigation/native';

const ProfileScreen = props => {
  const authContext = useContext(AuthContext);
  const profile = authContext.authUser;
  const [web, setWeb] = useState(false);
  const navigation = props.navigation;

  const openWebView = () => {
    setWeb(true);
  };
  if (web) {
    return <MyWeb />;
  }

  const closeWebView = () => {
    setWeb(false);
  };

  const LogOut = () => {
    authContext.logout();
  };

  return (
    <SafeAreaView>
      <View style={{height: Dimensions.get('window').height}}>
        <Image
          style={{
            width: Dimensions.get('window').width * 0.78,
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
                  style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
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
                  onPress={() => navigation.navigate('Edit')}
                  name="edit"
                  size={20}
                  color={Colors.primary}
                />
              </View>
            </View>

            <View style={{marginTop: 220}}>
              <Button
                style={{backgroundColor: 'white', marginBottom: 20}}
                color={Colors.primary}
                mode="outlined"
                onPress={openWebView}>
                GITHUB link
              </Button>
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
          {web && <MyWeb />}
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
