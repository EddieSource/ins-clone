import { combineReducers } from 'redux'
import { userStateReducer } from './userStateReducer'

const Reducers = combineReducers({
    userState: userStateReducer
})

export default Reducers
