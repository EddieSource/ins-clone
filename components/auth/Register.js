import React from 'react'
import { render } from 'react-dom'
import { View, Button, TextInput } from 'react-native'

const Register = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSignUp = () => {

    }

    return (
        <View>
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
            <Button onPress={() => onSignUp()}/>
        </View>
        )
    
}