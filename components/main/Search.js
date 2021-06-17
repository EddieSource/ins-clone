import React, { useState } from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native'

import firebase from 'firebase'
require('firebase/firestore')

const Search = ({navigation}) => {
    const[users, setUsers] = useState([])
    
    const getUsers = (search) => {
        firebase.firestore()
        .collection('users')
        .where('name', '>=', search)
        .where('name', '<=', search + '\uf8ff')
        .get()
        .then((snapshot) => {
            let users = snapshot.docs.map(doc => {
                const data = doc.data() 
                const id = doc.id
                return { id, ...data}
            })
            setUsers(users)
        })
    }

    return(
        <View>
            <TextInput 
                placeholder="Type Here..." 
                onChangeText={(search)=>getUsers(search)}/>
            <FlatList
                numColumns={1} //one user per line
                horizontal={false}
                data={users}
                renderItem={({item}) => (
                    // <TouchableOpacity
                    //     onPress = {() => navigation.navigate("Profile", {uid: item.id})}
                    //     >
                    <TouchableOpacity
                        onPress = {() => navigation.navigate("UserProfile", {uid: item.id})}
                        >
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default Search