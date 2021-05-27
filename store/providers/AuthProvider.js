import axios from 'axios';
import React, {useEffect, useState} from 'react';
import storage from '@react-native-firebase/storage';
import AuthContext from '../contexts/AuthContext';
const BASE_URL = 'https://rnauth-c47b2-default-rtdb.firebaseio.com';

const AuthProvider = props => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const [users, setUsers] = useState([]);

  const [posts, setPosts] = useState([]);
  const [fireboxPosts, setFireboxPosts] = useState([]);

  const [fireboxTodos, setFireboxTodos] = useState([]);
  const [authUser, setAuthUser] = useState({});

  const signUpUserToFirebase = async user => {
    try {
      await axios.post(`${BASE_URL}/users.json`, user);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteTodo = async (value1, value2) => {
    try {
      await axios.delete(`${BASE_URL}/todos/${value2}/${value1}/.json`);
    } catch (e) {
      console.log(e);
    }
  };

  const markAsComplete = async (value1, value2) => {
    try {
      await axios.patch(`${BASE_URL}/todos/${value2}/${value1}/.json`, {
        isComplete: true,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const fetchUser = async value => {
    try {
      console.log(value);
      const userResponse = await axios.get(
        `${BASE_URL}/users/${value}/name/.json`,
      );
      console.log(userResponse);
      return userResponse;
    } catch (e) {
      console.log(e);
    }
  };

  const addPosts = async value => {
    try {
      console.log(value);
      const reference = storage().ref(`/photos/${value.fileName}`);
      await reference.putFile(value.uri);
      const url = await reference.getDownloadURL();
      await axios.post(`${BASE_URL}/posts.json`, {
        d: value.d,
        post: value.post,
        imageUrl: url,
        userId: authUser.id,
        userName: authUser.name,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const addTodos = async value => {
    try {
      await axios.post(`${BASE_URL}/todos/${authUser.id}.json`, {
        ...value,
        userId: authUser.id,
        isComplete: false,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getPosts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/posts.json`);
      const postsId = Object.keys(response.data);
      const posts = postsId.map(postId => {
        return {
          ...response.data[postId],
          postId: postId,
        };
      });
      setFireboxPosts(posts);
    } catch (e) {
      console.log(e);
    }
  };

  const getTodosFromFirebase = async () => {
    try {
      const todoResponse = await axios.get(
        `${BASE_URL}/todos/${authUser.id}.json`,
      );
      const todosID = Object.keys(todoResponse.data);
      const todos = todosID.map(todoId => {
        return {
          ...todoResponse.data[todoId],
          id: todoId,
        };
      });
      setFireboxTodos(todos);
    } catch (e) {
      console.log(e);
    }
  };

  const getUsersFromFireBase = async () => {
    try {
      const allusers = await axios.get(`${BASE_URL}/users.json`);
      const allusersId = Object.keys(allusers.data);
      const users = allusersId.map(userId => {
        return {
          ...allusers.data[userId],
          id: userId,
        };
      });
      setUsers(users);
    } catch (e) {
      console.log(e);
    }
  };

  const logout = async () => {
    await setAuthUser({});
    setAuthenticated(false);
  };
  const setAuthenticatedUser = async user => {
    try {
      await setAuthUser(user);
      setAuthenticated(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        Allusers: users,
        authUser,
        fireboxPosts,
        fireboxTodos,
        deleteTodo,
        markAsComplete,
        getTodosFromFirebase,
        addTodos,
        fetchUser,
        getPosts,
        addPosts,
        logout,
        setAuthenticatedUser,
        signUpUserToFirebase,
        getUsersFromFireBase,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
