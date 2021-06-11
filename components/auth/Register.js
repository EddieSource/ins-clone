import React, { useState } from 'react'
import { View, Button, TextInput } from 'react-native'
import firebase from 'firebase'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSignUp = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <View style={{
            flex: 1, 
            justifyContent: "center"
        }}>
            <TextInput
                placeholder='name'
                onChangeText={
                    (input) => setName(input)
                }
            />
            <TextInput
                placeholder='email'
                onChangeText={
                    (input) => setEmail(input)
                }
            />
            <TextInput
                placeholder='password'
                secureTextEntry={true}
                onChangeText={
                    (input) => setPassword(input)
                }
            />
            <Button title="Sign Up" onPress={() => onSignUp()}/>
        </View>
        )
    
}

export default Register