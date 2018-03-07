import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../assets/css/bootstrap.css'
import '../assets/css/bootstrap-grid.css'
import { getCats, getPosts } from '../actions'

class App extends Component {
  componentDidMount () {
    this.props.listCategories()
    this.props.listPosts()
  }

  render () {
    let posts = this.props.post.posts
    let categories = this.props.category.categories
    console.log(!posts)
    if (!posts) posts = []
    if (!categories) categories = []
    return (
      <div>
        <div className='container'>
          <h1 className='text-success'>category list</h1>
          <ul >
            {
              categories.map((cat, index) => (
                <li key={index}>{cat.name}</li>
              ))
            }
          </ul>
        </div>
        <div className='container'>
          <h1 className='text-success'>post list</h1>
          <ul >
            {
              posts.map((post, index) => (
                <li key={index}>{post.title}</li>
              ))
            }
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return state
}

function mapDispatchToProps (dispatch) {
  return {
    listCategories: () => dispatch(getCats(dispatch)),
    listPosts: () => dispatch(getPosts(dispatch))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
