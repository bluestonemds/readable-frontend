import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import '../assets/css/bootstrap.css'
import '../assets/css/bootstrap-grid.css'
import './App.css'
import { getCats, changePostListOrder, getPostsByCat, postModal, savePost, getPostDispatch } from '../actions'
import PostList from './postList'
import PostDetail from './PostDetail'
import CreatePost from './CreatePost'
import ChangeOrder from './ChangeOrder'
import EditPost from './EditPost'

class App extends Component {
  componentDidMount () {
    this.props.listCategories()
  }

  render () {
    let posts = this.props.post.posts
    let categories = this.props.category.categories
    if (!posts) posts = []
    if (!categories) categories = []
    return (
      <div>
        <Router>
          <div className='container'>
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
            <div className='row'>
              <ChangeOrder
                props={this.props}
              />
              <div className='col-8' />
              <button className='btn btn-success left' onClick={() => this.props.handleModal(true)}> CreatePost </button>
            </div>
            <CreatePost
              interfaceCon={this.props.interfaceCon}
              categories={this.props.category.categories}
              handleModal={this.props.handleModal}
              handlePost={this.props.handlePost}
            />
            <div>
              <Switch>
                <Route exact path='/:cat/:postid/edit' component={EditPost} />
                <Route path='/:cat/:postid' component={PostDetail} />
                <Route exact path='/:cat' component={PostList} />
                <Route exact path='/' component={PostList} />
              </Switch>
            </div>
          </div>
        </Router>
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
