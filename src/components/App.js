import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../assets/css/bootstrap.css'
import '../assets/css/bootstrap-grid.css'
import PostList from './postList'
import { getCats, getPosts, changePostListOrder } from '../actions'

class App extends Component {
  componentDidMount () {
    this.props.listCategories()
    this.props.listPosts()
  }

  render () {
    console.log(this.props)
    let posts = this.props.post.posts
    let categories = this.props.category.categories
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
          <select value={posts.orderBy} onChange={(e) => {
            this.props.changeOrder(e.target.value)
          }}>
            <option value='votescore'>Order by VoteScore</option>
            <option value='time'>Order by Time</option>
          </select>
          <h1 className='text-success'>post list</h1>
          <ul >
            <PostList
              posts={posts}
            />
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
    listPosts: () => dispatch(getPosts(dispatch)),
    changeOrder: (order) => dispatch(changePostListOrder(order))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
