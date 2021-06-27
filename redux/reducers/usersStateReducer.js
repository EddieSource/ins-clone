import {
  CLEAR_DATA,
  USERS_DATA_STATE_CHANGE,
  USERS_LIKES_STATE_CHANGE,
  USERS_POSTS_STATE_CHANGE,
  USERS_RESET_FOLLOW_LOAD,
  USERS_UNFOLLOWING_POST,
} from '../constants'

const initialState = {
  users: [],
  feed: [],
  usersFollowingLoaded: 0,
}

export const usersStateReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return {
        ...state,
      }
    case CLEAR_DATA:
      console.log('clearData2')
      return initialState
    case USERS_DATA_STATE_CHANGE:
      return {
        ...state,
        users: [...state.users, action.user],
      }
    case USERS_POSTS_STATE_CHANGE:
      return {
        ...state,
        usersFollowingLoaded: state.usersFollowingLoaded + 1,
        feed: [...state.feed, ...action.posts],
      }
    case USERS_UNFOLLOWING_POST:
      return state
    case USERS_RESET_FOLLOW_LOAD:
      const filterFeed = state.feed.filter((singleFeed) => {
        const { user } = singleFeed
        if (action.following.includes(user.uid)) {
          return singleFeed
        }
      })

      return {
        ...state,
        usersFollowingLoaded: state.usersFollowingLoaded - 1,
        feed: filterFeed,
      }
    case USERS_LIKES_STATE_CHANGE:
      return {
        ...state,
        feed: state.feed.map((post) =>
          post.id == action.postId
            ? { ...post, currentUserLike: action.currentUserLike }
            : post
        ),
      }
  }
}
