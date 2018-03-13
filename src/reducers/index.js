import { combineReducers } from 'redux'
import { LIST_CAT,
  LIST_POSTS,
  CHANGE_POST_LIST_ORDER,
  LIST_POSTS_BY_CAT,
  POST_MODAL_VISIBLE,
  COMMENT_MODAL_VISIBLE,
  ADD_POST,
  GET_POST,
  LIST_COMMENTS,
  ADD_COMMENT } from '../actions'
import { sort } from '../API'

// init State
const initCategory = {}
const initPost = {}
const initInterfaceCon = {modalIsOpen: false, commentModalIsOpen: false}
const initComment = {}

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
        currentPost: action.data,
        currentPostId: action.data.id,
        currentCategory: action.data.category
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

function comment (state = initComment, action) {
  switch (action.type) {
    case LIST_COMMENTS :
      return {
        comment: action.data
      }
    case ADD_COMMENT :
      return {
        ...state
      }
    default :
      return state
  }
}

function interfaceCon (state = initInterfaceCon, action) {
  switch (action.type) {
    case POST_MODAL_VISIBLE :
      return {
        modalIsOpen: action.isOpen
      }
    case COMMENT_MODAL_VISIBLE :
      return {
        commentModalIsOpen: action.isOpen
      }
    default :
      return state
  }
}

export default combineReducers({
  category,
  post,
  comment,
  interfaceCon
})
