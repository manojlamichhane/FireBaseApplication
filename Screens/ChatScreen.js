import React, {useEffect, useContext, useState} from 'react';
import {ScrollView, Text, View, Pressable} from 'react-native';
import {Colors} from '../constants';
import AuthContext from '../store/contexts/AuthContext';

const ChatScreen = ({navigation}) => {
  const [chatusers, setChatUsers] = useState([]);
  let authcontext = useContext(AuthContext);

  useEffect(async () => {
    try {
      await authcontext.getUsersFromFireBase();
      const chat = await authcontext.Allusers.filter(
        user => user.email !== authcontext.authUser.email,
      );
      setChatUsers(chat);
      console.log(chat);
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 2,
          backgroundColor: Colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 40, fontWeight: 'bold', color: 'white'}}>
          Users
        </Text>
      </View>
      <View style={{flex: 4}}>
        <ScrollView>
          {chatusers.map(user => {
            return (
              <Pressable
                key={user.id}
                onPress={() => navigation.navigate('Messages', {id: user.id})}>
                <View style={{flexDirection: 'row', padding: 10}}>
                  <View
                    style={{
                      backgroundColor: '#dfe0ed',
                      borderRadius: 25,
                      width: 50,
                      height: 50,
                    }}></View>
                  <View style={{paddingLeft: 50}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                      {user.name}
                    </Text>
                    <Text style={{fontSize: 15, color: 'grey'}}>
                      {user.email}
                    </Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default ChatScreen;
