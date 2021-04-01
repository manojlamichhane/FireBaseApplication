import React, {useContext, useEffect} from 'react';
import {Text, View, ScrollView} from 'react-native';
import AuthContext from '../store/contexts/AuthContext';

const MyPostsScreen = () => {
  let MyPosts = [];
  const authContext = useContext(AuthContext);
  useEffect(async () => {
    await authContext.getPosts();
    MyPosts = authContext.fireboxPosts?.filter(
      item => item.userId == authContext.authUser.userId,
    );
    console.log(MyPosts);
  }, []);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* {MyPosts.map(item => {
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
          <Text style={{fontWeight: 'bold', fontSize: 20}}>{item.post}</Text>
          <Text style={{fontSize: 20}}>{item.d}</Text>
        </View>;
      })} */}
    </ScrollView>
  );
};

export default MyPostsScreen;
