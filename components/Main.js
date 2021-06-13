import React, { useEffect } from 'react'
import { View, Text } from 'react-native'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../redux/actions/index'

const Main = (props) => {
    useEffect(() => {
        props.fetchUser()
    }, [])
    
    return(
        <View style={{ flex: 1, justifyContent: 'center'}}>
            <Text>User is logged in</Text>
        </View>
    )
}

const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)

export default connect(null, mapDispatchProps)(Main)
