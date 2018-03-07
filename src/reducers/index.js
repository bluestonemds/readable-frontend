import { combineReducers } from 'redux'
import { LIST_CAT, LIST_POSTS } from '../actions'

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
        posts: action.data
      }
    default :
      return state
  }
}

export default combineReducers({
  category,
  post
})
