import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import '../assets/css/bootstrap.css'
import '../assets/css/bootstrap-grid.css'
import PostList from './postList'
import { getCats, getPosts, changePostListOrder, getPostsByCat, interfaceCon, addPost } from '../actions'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

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
                <Link to={cat.path} onClick={() => this.props.viewCatDispatch(cat.path)}>
                  <li key={index}>{cat.name}</li>
                </Link>
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
          <h1 className='text-success'>post list - {this.props.post.currentCat}</h1>
          <Route exact path={'/' + this.props.post.currentCat} render={() => (
            <ul >
              <PostList
                posts={posts}
              />
            </ul>
          )} />
          <Link to='/createPost' onClick={() => this.props.handleModal(true)}>
            CreatePost
          </Link>
          <Modal
            isOpen={this.props.interfaceCon.modalIsOpen}
            style={customStyles}
            contentLabel='Example Modal'
          >
            <h2>new post</h2>
            <form>
              <div className='form-group'>
                <label>title</label>
                <input ref={(dom) => (this._title = dom)}className='form-control' />
              </div>
              <div className='form-group'>
                <label>author</label>
                <input ref={(dom) => (this._author = dom)} className='form-control' />
              </div>
              <div className='form-group'>
                <label>category</label>
                <select ref={(dom) => (this._category = dom)}className='form-control'>
                  {categories.map((cat) => (
                    <option value={cat.name}>{cat.name}</option>
                  ))
                  }
                </select>
              </div>
              <div className='form-group'>
                <label>body</label>
                <textarea ref={(dom) => (this._body = dom)} className='form-control' />
              </div>
              <div className='form-group'>
                <button type='button' className='btn btn-primary' onClick={() => {
                  this.props.handlePost({
                    id: Math.random().toString(36).substring(7) + Date.now(),
                    title: this._body.value,
                    author: this._author.value,
                    category: this._category.value,
                    body: this._body.value
                  })
                  this.props.handleModal(false)
                }}>add</button>
                <button className='btn btn-secondary' onClick={() => this.props.handleModal(false)}>close</button>
              </div>
            </form>
          </Modal>
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
    handleModal: (isOpen) => dispatch(interfaceCon(isOpen)),
    handlePost: (postData) => dispatch(addPost(postData))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
