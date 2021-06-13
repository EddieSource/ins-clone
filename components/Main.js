import React, { useEffect } from 'react'
import { View, Text } from 'react-native'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../redux/actions/index'

import FeedScreen from './main/Feed'
import AddScreen from './main/Add'
import ProfileScreen from './main/Profile'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Tab = createMaterialBottomTabNavigator()
const EmptyScreen = ()=>{
    return(null)
}

const Main = ({currentUser, fetchUser}) => {
    useEffect(() => {
        fetchUser()
    }, [])

    // console.log(currentUser)
    // if(currentUser==undefined){
    //     return(<View></View>)
    // }
    return(
        // <View style={{ flex: 1, justifyContent: 'center'}}>
        //     <Text>{currentUser.name} is logged in</Text>
        // </View>
        <Tab.Navigator initialRouteName="Feed" labeled={false}>
            <Tab.Screen name="Feed" component={FeedScreen} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" color={color} size={26} />
                    ), 
                }}/>

            <Tab.Screen name="AddContainer" component={EmptyScreen} 
                listeners={({ navigation }) => ({
                    tabPress: event => {
                        event.preventDefault()  // time to overwrite the tab press
                        navigation.navigate("Add")

                    }
                })}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="plus-box" color={color} size={26} />
                    ), 
                }}/>

            <Tab.Screen name="Profile" component={ProfileScreen} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="account-circle" color={color} size={26} />
                    ), 
                }}/>
        </Tab.Navigator>
    )
}

const mapStateToProps = (store) => {
    return { currentUser: store.userState.currentUser }
}

const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Main)
