import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  StyleSheet,
} from 'react-native';
import AuthContext from '../store/contexts/AuthContext';
import Icon from 'react-native-vector-icons/EvilIcons';

const MyPostsScreen = () => {
  const [MyPosts, setMyPosts] = useState([]);
  const authContext = useContext(AuthContext);

  useEffect(async () => {
    try {
      await authContext.getPosts();
      const data = await authContext.fireboxPosts?.filter(
        item => item.userId == authContext.authUser.id,
      );
      setMyPosts(data);
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {MyPosts.map(item => (
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
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
export default MyPostsScreen;
