import React, { useEffect } from 'react'
import { View, Text } from 'react-native'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../redux/actions/index'

const Main = ({currentUser, fetchUser}) => {
    useEffect(() => {
        fetchUser()
    }, [])

    console.log(currentUser)
    if(currentUser==undefined){
        return(<View></View>)
    }
    return(
        <View style={{ flex: 1, justifyContent: 'center'}}>
            <Text>{currentUser.name} is logged in</Text>
        </View>
    )
}

const mapStateToProps = (store) => {
    return { currentUser: store.userState.currentUser }
}

const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Main)
