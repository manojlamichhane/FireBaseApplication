import React, {useState, useEffect, useContext} from 'react';
import {Text, View, Image, StyleSheet, ScrollView} from 'react-native';
import {Colors} from '../constants';
import {TextInput, Button} from 'react-native-paper';
import AuthContext from '../store/contexts/AuthContext';
// import AsyncStorage from '@react-native-community/async-storage';

const LoginScreen = props => {
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [emailerror, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passworderror, setPasswordError] = useState('');

  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const Login = async ({email, password}) => {
    const authUser = await (authContext.Allusers &&
      authContext.Allusers.find(user => user.email == email));
    if (authUser == null) {
      setEmailError('Email not registered');
    } else {
      setEmailError('');
      await (email == ''
        ? setEmailError('Required')
        : email.match(emailRegex)
        ? authUser.email == email
          ? authUser.password == password
            ? (setEmailError(''),
              setPasswordError(''),
              console.log('Login succesfull'),
              authContext.setTrue(),
              authContext.setAuthenticatedUser(authUser))
            : setPasswordError('Login failed')
          : setEmailError('Email not registered')
        : setEmailError('Invalid Email address'));
    }
  };

  useEffect(async () => {
    try {
      await authContext.getUsersFromFireBase();
      // setReady(await AsyncStorage.getItem('ready'));
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          style={{marginTop: 60, width: 350, height: 200}}
          source={{
            uri:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcuocItwzONszMsCvhU8jklhEkHzfAhmlZ7Q&usqp=CAU',
          }}
        />

        <View style={{padding: 30}}>
          <Text style={{fontWeight: 'bold', fontSize: 25}}>
            Login to your Account
          </Text>
          <TextInput
            style={{marginTop: 40, height: 50}}
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          {emailerror == '' ? null : (
            <Text style={{color: Colors.primary}}>{emailerror}</Text>
          )}
          <TextInput
            style={{marginVertical: 15, height: 50}}
            secureTextEntry={true}
            label="Password"
            value={password}
            onChangeText={text => setPassword(text)}
          />
          {passworderror == '' ? null : (
            <Text style={{color: Colors.primary}}>{passworderror}</Text>
          )}
          <Button
            style={{marginTop: 30, marginBottom: 50}}
            color={Colors.primary}
            mode="contained"
            onPress={() => Login({email, password})}>
            Sign in
          </Button>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Don't have an account?</Text>
            <Button
              mode="text"
              onPress={() => props.navigation.navigate('Signup')}>
              Sign up
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});
export default LoginScreen;
