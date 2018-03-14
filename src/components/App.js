import React, { Component } from 'react'
import { withRouter, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import '../assets/css/bootstrap.css'
import '../assets/css/bootstrap-grid.css'
import './App.css'
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
          <div>
            <Route exact path={'/' + this.props.post.currentCat} render={() => (
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
                  <button className='btn btn-success left' onClick={() => this.props.handleModal(true)}>
                     CreatePost
                  </button>
                  <CreatePost
                    interfaceCon={this.props.interfaceCon}
                    categories={this.props.category.categories}
                    handleModal={this.props.handleModal}
                    handlePost={this.props.handlePost}
                  />
                </div>
                <h2 className='text-success'>post list</h2>
                <ul className='list-unstyled'>
                  <PostList
                    props={this.props}
                  />
                </ul>
              </div>
            )} />
            <Route path={'/:cat/:postid'} component={PostDetail} />
          </div>
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

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
