import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'

// create the environmental variable
require('dotenv').config

// your firebase config
const firebaseConfig = {

};

// make sure not running any firebase at the moment
if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}


const Stack = createStackNavigator(); 
// screen, routes
export default function App() {
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
