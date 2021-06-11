import React from 'react'
import { render } from 'react-dom'
import { View, Button, TextInput } from 'react-native'

const Register = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setEmail] = useState('')

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
                placeholder='name'
                secureTextEntry={true}
                onChangeText={
                    (input) => setState(input)
                }
            />
            <Button onPress={() => onSignUp()}/>
        </View>
        )
    
}