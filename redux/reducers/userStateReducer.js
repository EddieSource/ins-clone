import { USER_POSTS_STATE_CHANGE, USER_STATE_CHANGE, USER_FOLLOWING_STATE_CHANGE } from "../constants"

const initialState = {
    currentUser: null, 
    posts: [], 
    following: []
}

export const userStateReducer = (state = initialState, action) => {
    switch(action.type){
        default: 
            return {
                ...state
            }
        case USER_STATE_CHANGE: 
            return {
                ...state, 
                currentUser: action.currentUser
            }
        case USER_POSTS_STATE_CHANGE: 
            return {
                ...state, 
                posts: action.posts
            }
        case USER_FOLLOWING_STATE_CHANGE: 
            return {
                ...state, 
                following: action.following
            }
    }

}