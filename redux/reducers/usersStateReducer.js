import { CLEAR_DATA, USERS_DATA_STATE_CHANGE, USERS_LIKES_STATE_CHANGE, USERS_POSTS_STATE_CHANGE } from "../constants"

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
        case CLEAR_DATA:
            console.log("clear data current usersssssssss")
            return initialState
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
        case USERS_LIKES_STATE_CHANGE: 
            return {
                ...state,  
                feed: state.feed.map(post => post.id == action.postId ? 
                    {...post, currentUserLike: action.currentUserLike} : post)
            }
    }

}