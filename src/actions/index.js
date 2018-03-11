import * as API from '../API'
export const LIST_CAT = 'LIST_CAT'
export const LIST_POSTS = 'LIST_POSTS'
export const LIST_POSTS_BY_CAT = 'LIST_POSTS_BY_CAT'
export const CHANGE_POST_LIST_ORDER = 'CHANGE_POST_LIST_ORDER'
export const MODAL = 'MODAL'
export const ADD_POST = 'ADD_POST'
export const GET_POST = 'GET_POST'

function listCat (data) {
  return {
    type: LIST_CAT,
    data: data.categories
  }
}

export function changePostListOrder (order) {
  return {
    type: CHANGE_POST_LIST_ORDER,
    order
  }
}

function listPosts (data, orderBy) {
  return {
    type: LIST_POSTS,
    data: data,
    orderBy
  }
}

function getPost (data) {
  return {
    type: GET_POST,
    data: data
  }
}

function listPostsByCat (data, currentCat) {
  return {
    type: LIST_POSTS_BY_CAT,
    data,
    currentCat
  }
}

function addPost (postid) {
  return {
    type: ADD_POST,
    postid
  }
}

export const interfaceCon = (isOpen) => {
  return {
    type: MODAL,
    isOpen
  }
}

export const getCats = () => dispatch => (
  API
    .getAllCat()
    .then(cats => dispatch(listCat(cats)))
)

export const getPosts = () => dispatch => (
  API
    .getAllPosts()
    .then(posts => dispatch(listPosts(posts, 'voteScore')))
)

export const getPostsByCat = (cat) => dispatch => {
  if (cat !== '/') {
    API
      .getPostsByCat(cat)
      .then(posts => dispatch(listPostsByCat(posts, cat)))
  } else {
    API
      .getAllPosts()
      .then(posts => dispatch(listPosts(posts, 'voteScore')))
  }
}

export const getPostDispatch = (postid) => dispatch => (
  API
    .getPost(postid)
    .then(post => dispatch(getPost(post)))
)

export const savePost = (data) => dispatch => (
  API
    .savePost(data)
    .then(id => dispatch(addPost(id)))
)
