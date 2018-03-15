import React, { Component } from 'react'
import { withRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import '../assets/css/bootstrap.css'
import '../assets/css/bootstrap-grid.css'
import './App.css'
import { getCats, getPosts, changePostListOrder, getPostsByCat, postModal, savePost, getPostDispatch } from '../actions'
import PostList from './postList'
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
        <div className='container category'>
          <h2 className='text-success'>category list</h2>
          <ul className='nav bg-light'>
            <Link className='nav-link' to='/' onClick={() => this.props.viewCatDispatch('/')}><li className='nav-item'>all</li></Link>
            {
              categories.map((cat, index) => (
                <Link className='nav-link' to={'/' + cat.name} onClick={() => this.props.viewCatDispatch(cat.path)}>
                  <li className='nav-item' key={index}>{cat.name}</li>
                </Link>
              ))
            }
          </ul>
        </div>
        <div className='container'>
          <Route path='/:cat' render={() => (
            <div>
              <div>
                <div className='row'>
                  <div className='col right'>
                    <label className='col-form-label'>Order by</label>
                  </div>
                  <div className='col'>
                    <select className='form-control' value={posts.orderBy} onChange={(e) => {
                      this.props.changeOrder(e.target.value)
                    }}>
                      <option value='votescore'>VoteScore</option>
                      <option value='time'>Time</option>
                    </select>
                  </div>
                  <div className='col-8' />
                  <Link to='/createpost' className='btn btn-success left' onClick={() => this.props.handleModal(true)}>
                     CreatePost
                  </Link>
                </div>
                <h2 className='text-success'>post list</h2>
              </div>
              <PostList
              />
            </div>
          )} />
          <Route exact path='/' render={() => (
            <div>
              <div>
                <div className='row'>
                  <div className='col right'>
                    <label className='col-form-label'>Order by</label>
                  </div>
                  <div className='col'>
                    <select className='form-control' value={posts.orderBy} onChange={(e) => {
                      this.props.changeOrder(e.target.value)
                    }}>
                      <option value='votescore'>VoteScore</option>
                      <option value='time'>Time</option>
                    </select>
                  </div>
                  <div className='col-8' />
                  <Link to='/createpost' className='btn btn-success left' onClick={() => this.props.handleModal(true)}>
                     CreatePost
                  </Link>
                </div>
                <h2 className='text-success'>post list</h2>
              </div>
              <PostList
              />
            </div>
          )} />
          
          <Route path={'/:cat/:postid'} render={() => (
            <PostDetail
              post={this.props.post}
            />
          )} />
          <Route path='/createpost' render={() => (
            <CreatePost
              interfaceCon={this.props.interfaceCon}
              categories={this.props.category.categories}
              handleModal={this.props.handleModal}
              handlePost={this.props.handlePost}
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

export default Router(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
