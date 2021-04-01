import React, {useState, useContext, useEffect} from 'react';
import {Dimensions, View, StyleSheet, Text, ScrollView} from 'react-native';
import {Colors} from '../constants';
import Icon from 'react-native-vector-icons/AntDesign';
import AuthContext from '../store/contexts/AuthContext';
import {Modal, TextInput, Button} from 'react-native-paper';

const TodosScreen = () => {
  var d = new Date();
  const authContext = useContext(AuthContext);
  const [post, setPost] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const openTodo = () => {
    setIsVisible(true);
    setPost('');
  };

  const closeTodo = () => {
    setIsVisible(false);
    setPost('');
  };

  const deleteTodo = value => {
    authContext.deleteTodo(value);
    authContext.getTodosFromFirebase();
  };

  const markCompleted = value => {
    authContext.markAsComplete(value);
    authContext.getTodosFromFirebase();
  };
  const afterPost = value => {
    setIsVisible(false);
    authContext.addTodos({value, d});
    authContext.getTodosFromFirebase();
  };

  useEffect(async () => {
    await authContext.getTodosFromFirebase();
  }, []);
  console.log(authContext.fireboxTodos);
  return (
    <View style={styles.container}>
      <ScrollView>
        {authContext.fireboxTodos?.map(item => (
          <View
            key={item.id}
            style={{
              ...styles.todoDetails,
              backgroundColor: item.isComplete ? 'green' : '#f7d703',
            }}>
            <View style={{position: 'absolute', right: 10, top: 5}}>
              <Icon
                name="delete"
                size={30}
                onPress={() => deleteTodo(item.id)}
                color="white"
              />
            </View>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>{item.value}</Text>
            <Text style={{fontSize: 20}}>{item.d}</Text>
            {item.isComplete ? null : (
              <Button
                style={{backgroundColor: Colors.primary}}
                color="white"
                mode="outlined"
                onPress={() => markCompleted(item.id)}>
                Mark as Complete
              </Button>
            )}
          </View>
        ))}
      </ScrollView>

      <Modal visible={isVisible}>
        <View style={styles.todosForm}>
          <Text style={{fontWeight: 'bold', fontSize: 30}}>Create Todo</Text>
          <TextInput
            multiline
            style={{marginTop: 30, height: 100}}
            numberOflines={5}
            label="What's on your mind?"
            value={post}
            onChangeText={text => setPost(text)}
          />

          <View style={{marginTop: 80}}>
            <Button
              style={{backgroundColor: Colors.primary}}
              color="white"
              mode="outlined"
              onPress={() => afterPost(post)}>
              Add Todo
            </Button>
            <Button mode="outlined" onPress={closeTodo}>
              Cancel
            </Button>
          </View>
        </View>
      </Modal>
      <View
        style={{
          position: 'absolute',
          bottom: 40,
          right: 40,
          width: 50,
          height: 50,
          backgroundColor: 'white',
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon onPress={openTodo} name="plus" size={30} color={Colors.primary} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    padding: 30,
  },
  todosForm: {
    borderRadius: 20,
    margin: 30,
    backgroundColor: 'white',
    width: Dimensions.get('window').width * 0.82,
    height: Dimensions.get('window').height * 0.6,
    padding: 20,
  },
  todoDetails: {
    // backgroundColor: 'white',
    height: Dimensions.get('window').height / 5,
    width: Dimensions.get('window').width * 0.82,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
});

export default TodosScreen;
