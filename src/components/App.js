import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import '../assets/css/bootstrap.css'
import '../assets/css/bootstrap-grid.css'
import PostList from './postList'
import { getCats, getPosts, changePostListOrder, viewCat } from '../actions'

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
            <Link to='/' ><li>all</li></Link>
            {
              categories.map((cat, index) => (
                <Link to={cat.path} onClick={() => this.props.viewCatDispatch(cat.path)}><li key={index}>{cat.name}</li></Link>
              ))
            }
          </ul>
        </div>
        <div className='container'>
          <span>Order by</span>
          <select value={posts.orderBy} onChange={(e) => {
            this.props.changeOrder(e.target.value)
          }}>
            <option value='votescore'>VoteScore</option>
            <option value='time'>Time</option>
          </select>
          <h1 className='text-success'>post list - {this.props.category.currentCat}</h1>
          <Route exact path={this.props.category.currentCat} render={() => (
            <ul >
              <PostList
                posts={posts}
              />
            </ul>
          )} />
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
    changeOrder: (order) => dispatch(changePostListOrder(order)),
    viewCatDispatch: (cat) => dispatch(viewCat(cat))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
