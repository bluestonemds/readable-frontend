// import { combineReducers } from 'redux'
// import * as API from '../API'
import {
  LIST_CAT
} from '../actions'

const defaultData = {
  categories: [
    {
      name: 'react',
      path: 'react'
    },
    {
      name: 'redux',
      path: 'redux'
    },
    {
      name: 'udacity',
      path: 'udacity'
    }
  ]
}

function category (state = defaultData, action) {
  switch (action.type) {
    case LIST_CAT :
      return Object.assign({}, state, {
        categories: []
      })

    default :
      return state
  }
}

export default category
