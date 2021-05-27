import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  Image,
  Dimensions,
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../constants';
import AuthContext from '../store/contexts/AuthContext';
import {Modal, Button} from 'react-native-paper';

const ProfileScreen = props => {
  const authContext = useContext(AuthContext);
  const profile = authContext.authUser;
  const navigation = props.navigation;
  const [visible, setVisible] = useState(false);

  const LogOut = () => {
    authContext.logout();
  };

  return (
    <SafeAreaView>
      <View style={{height: Dimensions.get('window').height}}>
        <Image
          style={{
            width: Dimensions.get('window').width * 0.774,
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
            </View>
            <View style={{marginTop: 150}}>
              <Button
                style={{backgroundColor: 'white', marginBottom: 20}}
                color={Colors.primary}
                mode="outlined"
                onPress={() => setVisible(true)}>
                About
              </Button>

              <Button
                style={{backgroundColor: 'white', marginBottom: 20}}
                color={Colors.primary}
                mode="outlined"
                onPress={() => {
                  Linking.openURL(
                    'https://github.com/manojlamichhane/FireBaseApplication',
                  );
                }}>
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
        </View>
        <Modal
          visible={visible}
          style={{backgroundColor: 'white', padding: 10}}>
          <Text>This app contains 3 major parts</Text>
          <Text>1. Login and Signup</Text>
          <Text>2. Posts</Text>
          <Text>3. Todos</Text>
          <Text>
            1. Login and Signup : Login and Signup with form validation. In
            signup user is added to the realtime database using firebase. Once
            logged in user is directed to indexscrenn with posts
          </Text>
          <Text>
            2. Posts : Post is created with post detail and image. Image is
            uploaded using image picker and the whole post is added to realtime
            database using firebase.
          </Text>
          <Text>
            3. Todos : Todos with title and description is added to the realtime
            database using firebase. CRUD operation is done by updating the
            completed status and the whole todos can be deleted.
          </Text>
          <Text>
            Beside these chat UI is used and date is used in posts and toods.
          </Text>
          <Button
            style={{backgroundColor: 'white', marginBottom: 20}}
            color={Colors.primary}
            mode="outlined"
            onPress={() => setVisible(false)}>
            Close
          </Button>
        </Modal>
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
