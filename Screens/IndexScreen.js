import React, {useState, useContext, useEffect} from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import {Colors} from '../constants';
import Icon from 'react-native-vector-icons/EvilIcons';
import {Modal, TextInput, Button} from 'react-native-paper';
import AuthContext from '../store/contexts/AuthContext';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const IndexScreen = props => {
  var d = new Date();
  const authContext = useContext(AuthContext);
  const [post, setPost] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [img, setImg] = useState({});

  const openPost = () => {
    setIsVisible(true);
    setPost('');
  };

  const closePost = () => {
    setIsVisible(false);
    setPost('');
  };

  const afterPost = async value => {
    try {
      setIsVisible(false);
      await authContext.addPosts({...value, d});
      authContext.getPosts();
    } catch (e) {
      console.log(e);
    }
  };
  const pickImage = () => {
    launchImageLibrary({quality: 1}, response => setImg(response));
  };

  useEffect(async () => {
    try {
      await authContext.getPosts();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable onPress={openPost}>
          <View
            style={{
              height: 100,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text>What's on your mind?</Text>
          </View>
        </Pressable>

        {authContext.fireboxPosts?.map(item => (
          <View
            key={item.postId}
            style={{
              backgroundColor: 'white',
              height: Dimensions.get('window').height / 1.8,
              width: Dimensions.get('window').width,
              padding: 10,
              marginBottom: 10,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{width: 50, height: 50, borderRadius: 25}}
                source={{
                  uri:
                    'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
                }}
              />
              <View style={{paddingLeft: 10}}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>
                  {item.userName}
                </Text>
                <Text style={{fontSize: 20, color: '#aeb4b7'}}>
                  {item.d.slice(0, 10)}
                </Text>
              </View>
            </View>
            <Text style={{fontSize: 20}}>{item.post}</Text>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                style={{
                  width: Dimensions.get('window').width,
                  height: Dimensions.get('window').height / 3,
                }}
                source={{uri: item.imageUrl}}
              />
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={styles.response}>
                <Icon name="like" size={28} color="black" />
              </View>
              <View style={styles.response}>
                <Icon name="comment" size={28} color="black" />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal visible={isVisible}>
        <ScrollView>
          <View style={styles.todosForm}>
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Icon
                onPress={closePost}
                name="arrow-left"
                size={38}
                color="black"
              />
              <Button
                color="black"
                mode="text"
                onPress={() => afterPost({post, imageUrl})}>
                Post
              </Button>
            </View>
            <TextInput
              multiline
              style={{marginTop: 30, height: 100}}
              numberOflines={5}
              label="What's on your mind?"
              value={post}
              onChangeText={text => setPost(text)}
            />
            {img == '' ? null : (
              <Image
                style={{marginTop: 20, width: '100%', height: 200}}
                source={{uri: img.uri}}
              />
            )}
            <Button
              style={{backgroundColor: Colors.primary}}
              color="white"
              mode="text"
              onPress={pickImage}>
              Choose Image
            </Button>

            <View style={{marginTop: 80}}>
              <Button
                style={{backgroundColor: Colors.primary}}
                color="white"
                mode="outlined"
                onPress={() => afterPost({post, ...img})}>
                Share Post
              </Button>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aeb4b7',
    paddingVertical: 10,
  },
  todosForm: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    padding: 5,
  },
  response: {
    backgroundColor: '#e4e6e7',
    width: 150,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
});
export default IndexScreen;
