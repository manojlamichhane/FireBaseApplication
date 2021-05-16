import React, {useState, useEffect, useContext} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../constants';
import AuthContext from '../store/contexts/AuthContext';

const MessageScreen = props => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState();
  const [sender, setSender] = useState({});
  let authcontext = useContext(AuthContext);

  const [message, setMessage] = useState('');

  useEffect(async () => {
    try {
      await setUserId(props.route.params.id);
      await authcontext.getUsersFromFireBase();
      const response = await authcontext.Allusers?.find(
        item => item.id === userId,
      );
      await setUser(response);
      await setSender(authcontext.authUser);
      console.log('sender', authcontext.authUser);
      console.log('reciever', user);
    } catch (e) {
      console.log(e);
    }
  }, [authcontext.Allusers]);

  return (
    <View>
      <View style={{flexDirection: 'row', padding: 20}}>
        <View
          style={{
            backgroundColor: '#dfe0ed',
            borderRadius: 25,
            width: 50,
            height: 50,
          }}></View>
        <View style={{paddingLeft: 10}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            {user && user.name}
          </Text>
          <Text style={{fontSize: 15, color: 'grey'}}>
            {user && user.email}
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'grey',
          width: '100%',
          height: 500,
        }}>
        <ScrollView>
          <View
            style={{
              marginLeft: 60,
              marginTop: 20,
              padding: 10,
              backgroundColor: Colors.primary,
              width: '80%',
              borderRadius: 20,
            }}>
            <Text style={{color: 'white', fontSize: 20}}>Hello</Text>
          </View>
          <View
            style={{
              marginLeft: 10,
              padding: 10,
              marginTop: 20,
              backgroundColor: 'white',
              width: '80%',
              borderRadius: 20,
            }}>
            <Text style={{color: Colors.primary, fontSize: 20}}>Hello</Text>
          </View>
        </ScrollView>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={{width: '85%', backgroundColor: 'white'}}
            placeholder="Message"
            value={message}
            onChangeText={text => setMessage(text)}
          />
          <Icon
            style={{backgroundColor: 'white'}}
            onPress={() => sendMessage({message: message})}
            name="send-circle-outline"
            size={55}
            color={Colors.primary}
          />
        </View>
      </View>
    </View>
  );
};

export default MessageScreen;
