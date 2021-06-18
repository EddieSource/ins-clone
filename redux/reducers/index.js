import { combineReducers } from 'redux'
import { userStateReducer} from './userStateReducer'
import { usersStateReducer} from './usersStateReducer'

const Reducers = combineReducers({
    userState: userStateReducer, 
    usersState: usersStateReducer
})

export default Reducers
