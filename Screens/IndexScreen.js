import React, {useState, useContext, useEffect} from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  FlatList,
  Text,
  ScrollView,
} from 'react-native';
import {Colors} from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Modal, TextInput, Button} from 'react-native-paper';
import AuthContext from '../store/contexts/AuthContext';
import axios from 'axios';

const IndexScreen = props => {
  var d = new Date();
  const authContext = useContext(AuthContext);
  const [post, setPost] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const openPost = () => {
    setIsVisible(true);
    setPost('');
  };

  const closePost = () => {
    setIsVisible(false);
    setPost('');
  };

  const afterPost = value => {
    setIsVisible(false);
    authContext.addPosts({value, d});
    authContext.getPosts();
  };

  useEffect(async () => {
    await authContext.getPosts();
    console.log(authContext.fireboxPosts);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {authContext.fireboxPosts?.map(item => (
          <View
            key={item.postId}
            style={{
              backgroundColor: 'white',
              height: Dimensions.get('window').height / 5,
              width: Dimensions.get('window').width * 0.82,
              borderRadius: 20,
              padding: 20,
              marginBottom: 20,
            }}>
            {/* {console.log(authContext.fetchUser(item.userId))} */}

            <Text style={{fontWeight: 'bold', fontSize: 20}}>{item.post}</Text>
            <Text style={{fontSize: 20}}>{item.d}</Text>
            <Text style={{fontSize: 20}}>Posted by:{item.userId}</Text>
          </View>
        ))}
      </ScrollView>

      {/* <FlatList
        data={authContext.fireboxPosts}
        keyExtractor={item => item.postId}
        renderItem={({item}) => {
          <View
            style={{
              backgroundColor: 'white',
              height: Dimensions.get('window').height / 5,
              width: Dimensions.get('window').width * 0.82,
              borderRadius: 20,
              padding: 20,
            }}>
            <Text>{item.post}</Text>;
          </View>;
        }}
      /> */}

      <Modal visible={isVisible}>
        <Text>{post}</Text>
        <View style={styles.todosForm}>
          <Text style={{fontWeight: 'bold', fontSize: 30}}>Create Post</Text>
          <TextInput
            multiline
            style={{marginTop: 30, height: 100}}
            numberOflines={5}
            label="What's on your mind?"
            value={post}
            onChangeText={text => setPost(text)}
          />
          <Button mode="outlined" onPress={() => console.log('Pressed')}>
            Add Photos
          </Button>
          <View style={{marginTop: 80}}>
            <Button
              style={{backgroundColor: Colors.primary}}
              color="white"
              mode="outlined"
              onPress={() => afterPost(post)}>
              Share Post
            </Button>
            <Button mode="outlined" onPress={closePost}>
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
        <Icon onPress={openPost} name="plus" size={30} color={Colors.primary} />
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
});
export default IndexScreen;
