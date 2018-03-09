import { combineReducers } from 'redux'
import { LIST_CAT,
  LIST_POSTS,
  CHANGE_POST_LIST_ORDER,
  LIST_POSTS_BY_CAT } from '../actions'
import { sort } from '../API'

function category (state = {}, action) {
  switch (action.type) {
    case LIST_CAT :
      return {
        categories: action.data
      }
    default :
      return state
  }
}

function post (state = {}, action) {
  switch (action.type) {
    case LIST_POSTS :
      return {
        posts: action.data,
        orderBy: action.orderBy,
        currentCat: '/'
      }
    case LIST_POSTS_BY_CAT :
      return {
        ...state,
        posts: action.data,
        currentCat: action.currentCat
      }
    case CHANGE_POST_LIST_ORDER :
      return {
        ...state,
        posts: sort(state.posts, action.order),
        orderBy: action.order
      }
    default :
      return state
  }
}

export default combineReducers({
  category,
  post
})
