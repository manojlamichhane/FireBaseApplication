import React, {useState, useContext} from 'react';
import {Text, View, Image, StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../constants';
import {TextInput, Button, Snackbar} from 'react-native-paper';
import AuthContext from '../store/contexts/AuthContext';

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const SignupScreen = props => {
  const authContext = useContext(AuthContext);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [repassword, setRePassword] = useState('');
  const [ready, setReady] = useState(false);

  const signUp = ({name, email, password, repassword}) => {
    name == ''
      ? setNameError('Required')
      : email == ''
      ? setEmailError('Required')
      : email.match(emailRegex)
      ? password == repassword
        ? setReady(true)
        : setPasswordError('Passwords do not Match')
      : setEmailError('Invalid Email address');
    if (ready) {
      authContext.signUpUserToFirebase({name, email, password});
      setEmailError(''), setPasswordError('');
      console.log('User added');
      props.navigation.navigate('Login');
    } else {
      <Snackbar visible={true}>Adding failed</Snackbar>;
      console.log('Adding failed');
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Icon
          style={{marginLeft: 25, marginTop: 25}}
          name="arrow-back"
          size={30}
          onPress={() => props.navigation.navigate('Login')}
          color={Colors.primary}
        />
        <View style={{alignItems: 'center'}}>
          <Image
            style={{
              width: 160,
              height: 105,
            }}
            source={{
              uri:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcuocItwzONszMsCvhU8jklhEkHzfAhmlZ7Q&usqp=CAU',
            }}
          />
        </View>

        <View style={{padding: 30}}>
          <Text style={{fontWeight: 'bold', fontSize: 25}}>
            Create your Account
          </Text>
          <TextInput
            style={{marginTop: 30, height: 50}}
            label="Name"
            value={name}
            onChangeText={text => setName(text)}
          />
          <Text>{nameError}</Text>
          <TextInput
            style={{marginTop: 15, height: 50}}
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <Text>{emailError}</Text>
          <TextInput
            style={{marginTop: 15, marginBottom: 15, height: 50}}
            secureTextEntry={true}
            label="Password"
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <TextInput
            style={{marginVertical: 15, height: 50}}
            secureTextEntry={true}
            label="Confirm Password"
            value={repassword}
            onChangeText={text => setRePassword(text)}
          />
          <Text>{passwordError}</Text>
          <Button
            style={{marginTop: 30}}
            color={Colors.primary}
            mode="contained"
            onPress={() => signUp({name, email, password, repassword})}>
            Sign Up
          </Button>
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
export default SignupScreen;
