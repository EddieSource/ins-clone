import React, { useEffect } from 'react'
import { Text, View, Button } from 'react-native'   // view is a replacement for div
import { connect } from 'react-redux' 
import { bindActionCreators } from 'redux'
import { clearData } from '../../redux/actions'

const Landing = ( {clearData, userState, usersState, navigation} ) => {
    // navigation will give us the router we want to go to
    useEffect(() => {
        clearData()
        console.log('userState in Landing')
        console.log(userState)
        console.log(usersState)
    }, []
    )

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

const mapStateToProps = (store) => {
    return { 
        userState: store.userState, 
        usersState: store.usersState
    }
}
const mapDispatchToProps = (dispatch) => bindActionCreators({ clearData }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Landing)