import React from 'react'
import { connect } from 'react-redux'
import { withRouter as Router, Route, Link } from 'react-router-dom'
import { deletePostDispatch, editModal, votePostDispath, getPostDispatch } from '../actions'
import EditPost from './EditPost'

function PostList (props) {
  let post = props.post.posts
  if (!post) {
    return (<div>show nothing.</div>)
  }
  return (
    <div>
      <ul className='list-unstyled'>
        {post.map((post, index) => (
          <li key={index}>
            <div className='row'>
              <div className='col'>
                <Link to={`/${post.category}/${post.id}`} onClick={() => props.getPost(post.id)}>
                  <h4>title: {post.title}</h4>
                </Link>
              </div>
              <div className='col'>
                <Link to={`/${post.category}/${post.id}/edit`} className='btn btn-outline-primary btn-sm' onClick={() => { props.handleModal(true) }}>Edit</Link>
                <button type='button' className='btn btn-outline-danger btn-sm' onClick={() => (props.deletePost(post.id))}>Delete</button>
                <button className='btn btn-outline-secondary btn-sm' onClick={() => (props.handleVote(post.id, 'upVote'))}>upVote</button>
                <button className='btn btn-outline-secondary btn-sm' onClick={() => (props.handleVote(post.id, 'downVote'))}>downVote</button>
              </div>
            </div>
            <p />
            <p>
              <span>author: {post.author} commentCount: {post.commentCount} voteScrore: {post.voteScore} </span>
            </p>
            <Route path={`/${post.category}/${post.id}/edit`} render={() => (
              <EditPost
                props={post}
                interfaceCon={props.interfaceCon}
              />
            )}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

function mapStateToProps (state) {
  return state
}

function mapDispatchToProps (dispatch) {
  return {
    deletePost: (postid) => dispatch(deletePostDispatch(postid)),
    handleModal: (isOpen) => dispatch(editModal(isOpen)),
    handleVote: (postid, status) => dispatch(votePostDispath(postid, status)),
    getPost: (postid) => dispatch(getPostDispatch(postid))
  }
}

export default Router(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList))
