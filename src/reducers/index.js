import { combineReducers } from 'redux'
import { LIST_CAT,
  LIST_POSTS,
  CHANGE_POST_LIST_ORDER,
  LIST_POSTS_BY_CAT,
  MODAL,
  ADD_POST,
  GET_POST } from '../actions'
import { sort } from '../API'

// init State
const initCategory = {}
const initPost = {}
const initInterfaceCon = {'modalIsOpen': false}

function category (state = initCategory, action) {
  switch (action.type) {
    case LIST_CAT :
      return {
        categories: action.data
      }
    default :
      return state
  }
}

function post (state = initPost, action) {
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
    case GET_POST :
      return {
        ...state,
        [action.data]: {
          posts: action.data
        },
        currentPostId: action.data.id
      }
    
    case ADD_POST :
      return {
        ...state,
        newPosts: action.postid
      }
    default :
      return state
  }
}

function interfaceCon (state = initInterfaceCon, action) {
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
