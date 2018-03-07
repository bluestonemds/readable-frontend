import * as API from '../API'
export const LIST_CAT = 'LIST_CAT'
export const LIST_POSTS = 'LIST_POSTS'

function listCat (data) {
  return {
    type: LIST_CAT,
    data: data.categories
  }
}

function listPosts (data) {
  return {
    type: LIST_POSTS,
    data: data
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
    .then(posts => dispatch(listPosts(posts)))
)
