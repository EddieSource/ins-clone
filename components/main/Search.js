import React, { useState } from 'react'
import { View, Text, TextInput, FlatList } from 'react-native'

import firebase from 'firebase'
require('firebase/firestore')

const Feed = () => {
    const[users, setUsers] = useState([])

    return(
        <View>
            <Text>Feed</Text>
        </View>
    )
}

export default Feed