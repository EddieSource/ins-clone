import React from 'react';

import * as firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Search from './Search';
import UserProfile from './UserProfile'

import { connect } from 'react-redux' 


const Stack = createStackNavigator(); 
// screen, routes
const SearchPage = () => {
  return (
        <Stack.Navigator initialRouteName="Search"> 
            <Stack.Screen 
                name="Search" 
                component={Search}
            />
            <Stack.Screen name="UserProfile" component={UserProfile}/>
        </Stack.Navigator>
  )
}


export default SearchPage

