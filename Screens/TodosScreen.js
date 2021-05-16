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
  const [desc, setDesc] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const openTodo = () => {
    setIsVisible(true);
    setPost('');
  };

  const closeTodo = () => {
    setIsVisible(false);
    setPost('');
  };

  const deleteTodos = async (value1, value2) => {
    try {
      await authContext.deleteTodo(value1, value2);
      await authContext.getTodosFromFirebase();
    } catch (e) {
      console.log(e);
    }
  };

  const markCompleted = async (value1, value2) => {
    try {
      await authContext.markAsComplete(value1, value2);
      await authContext.getTodosFromFirebase();
    } catch (e) {
      console.log(e);
    }
  };
  const afterPost = async value => {
    try {
      setIsVisible(false);
      await authContext.addTodos({...value, d});
      await authContext.getTodosFromFirebase();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(async () => {
    await authContext.getTodosFromFirebase();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {authContext.fireboxTodos?.map(item => (
          <View
            key={item.id}
            style={{
              ...styles.todoDetails,
              backgroundColor: item.isComplete ? '#3bc0b2' : '#f7d703',
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text
                  style={{fontWeight: 'bold', fontSize: 20, color: 'white'}}>
                  {item.post}
                </Text>
                <Text style={{fontSize: 15, color: 'white'}}>{item.desc}</Text>
                <Text style={{fontSize: 15, color: 'white'}}>
                  {item.d.slice(0, 10)}
                </Text>
              </View>
              <View>
                <Icon
                  name="delete"
                  onPress={() => deleteTodos(item.id, item.userId)}
                  size={30}
                  color="white"
                />
              </View>
            </View>

            {item.isComplete ? null : (
              <Button
                style={{backgroundColor: Colors.primary, marginTop: 15}}
                color="white"
                mode="outlined"
                onPress={() => markCompleted(item.id, item.userId)}>
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
            style={{marginTop: 30, height: 60}}
            label="Todo title"
            value={post}
            onChangeText={text => setPost(text)}
          />
          <TextInput
            multiline
            style={{marginTop: 10, height: 100}}
            numberOflines={5}
            label="Todo Description"
            value={desc}
            onChangeText={text => setDesc(text)}
          />

          <View style={{marginTop: 80}}>
            <Button
              style={{backgroundColor: Colors.primary}}
              color="white"
              mode="outlined"
              onPress={() => afterPost({post, desc})}>
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
    backgroundColor: 'white',
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
    height: Dimensions.get('window').height / 4.5,
    width: Dimensions.get('window').width * 0.82,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
});

export default TodosScreen;
