import { combineReducers } from 'redux'
import { LIST_CAT,
  LIST_POSTS,
  CHANGE_POST_LIST_ORDER,
  LIST_POSTS_BY_CAT,
  MODAL,
  ADD_POST } from '../actions'
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
    case ADD_POST :
      return {
        ...state,
        newPosts: action.data
      }
    default :
      return state
  }
}

function interfaceCon (state = { 'modalIsOpen': false }, action) {
  switch (action.type) {
    case MODAL :
      return {
        modalIsOpen: action.isOpen
      }
    default :
      return state
  }
}

export default combineReducers({
  category,
  post,
  interfaceCon
})
