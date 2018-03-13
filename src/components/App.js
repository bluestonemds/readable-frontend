import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import '../assets/css/bootstrap.css'
import '../assets/css/bootstrap-grid.css'
import PostList from './postList'
import { getCats, getPosts, changePostListOrder, getPostsByCat, postModal, savePost, getPostDispatch } from '../actions'
import PostDetail from './PostDetail'
import CreatePost from './CreatePost'

class App extends Component {
  componentDidMount () {
    this.props.listCategories()
    this.props.listPosts()
  }

  render () {
    let posts = this.props.post.posts
    let categories = this.props.category.categories
    if (!posts) posts = []
    if (!categories) categories = []
    return (
      <div>
        <div className='container'>
          <h1 className='text-success'>category list</h1>
          <ul >
            <Link to='' onClick={() => this.props.viewCatDispatch('/')}><li>all</li></Link>
            {
              categories.map((cat, index) => (
                <Link to={'/' + cat.name} onClick={() => this.props.viewCatDispatch(cat.path)}>
                  <li key={index}>{cat.name}</li>
                </Link>
              ))
            }
          </ul>
        </div>
        <div className='container'>
          <Link to='/createPost' onClick={() => this.props.handleModal(true)}>
            CreatePost
          </Link>
          <CreatePost
            interfaceCon={this.props.interfaceCon}
            categories={this.props.category.categories}
            handleModal={this.props.handleModal}
            handlePost={this.props.handlePost}
          />
          <Route exact path={'/' + this.props.post.currentCat} render={() => (
            <div>
              <span>Order by</span>
              <select value={posts.orderBy} onChange={(e) => {
                this.props.changeOrder(e.target.value)
              }}>
                <option value='votescore'>VoteScore</option>
                <option value='time'>Time</option>
              </select>
              <h1 className='text-success'>post list - {this.props.post.currentCat}</h1>
              <ul >
                <PostList
                  props={this.props}
                />
              </ul>
            </div>
          )} />
          <Route exact path={'/' + this.props.post.currentCategory + '/' + this.props.post.currentPostId} render={() => (
            <PostDetail
              props={this.props}
            />
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
    viewCatDispatch: (cat) => dispatch(getPostsByCat(cat)),
    handleModal: (isOpen) => dispatch(postModal(isOpen)),
    handlePost: (postData) => dispatch(savePost(postData)),
    getPost: (id) => dispatch(getPostDispatch(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
