import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'

import envConfig from './.env.json'



// create the environmental variable

const firebaseConfig = envConfig.FIREBASE_CONFIG

// make sure not running any firebase at the moment
if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}


const Stack = createStackNavigator(); 
// screen, routes
const App = () => {
  const [loaded, setLoaded] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user)=>{
      // console.log('auth...................')
      if(!user){
        setLoggedIn(false)
        setLoaded(true)
      }
      else{
        setLoggedIn(true)
        setLoaded(true)
      }
    })
  },[])
  
  if(!loaded){
    return(
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text>Loading</Text>
      </View>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing"> 
        <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="Register" component={RegisterScreen}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App

