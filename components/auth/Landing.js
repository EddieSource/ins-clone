import React from 'react'
import { Text, View, Button } from 'react-native'   // view is a replacement for div


const Landing = ( navigation ) => {
    // navigation will give us the router we want to go to
    return (
        <View style = {{
            flex: 1, 
            justifyContent: "center"
        }}>
            <Button 
                title="Register"
                onPress={ () => navigation.navigate("Register")} />
            
            <Button
                title="Login"
                onPress={ () => navigation.navigate("Login")} />

        </View>
    )
}

export default Landing