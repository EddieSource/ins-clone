import { CLEAR_DATA, USERS_DATA_STATE_CHANGE, USERS_POSTS_STATE_CHANGE } from "../constants"

const initialState = {
    users: [], 
    feed: [], 
    usersFollowingLoaded: 0, 
}

export const usersStateReducer = (state = initialState, action) => {
    switch(action.type){
        default: 
            return {
                ...state
            }
        case USERS_DATA_STATE_CHANGE: 
            return {
                ...state, 
                users: [...state.users, action.user]
            }
        case USERS_POSTS_STATE_CHANGE: 
            console.log(action.posts)
            return {
                ...state, 
                usersFollowingLoaded: state.usersFollowingLoaded + 1, 
                feed: [...state.feed, ...action.posts]
            }
        case CLEAR_DATA: 
            return initialState
    }

}