import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deletePostDispatch, editModal } from '../actions'
import EditPost from './EditPost'

function PostList (props) {
  let post = props.props.post.posts
  return (
    post.map((post, index) => (
      <li key={index}>
        <Link to={'/' + post.category + '/' + post.id} onClick={() => props.props.getPost(post.id)}>
          <h4>title: {post.title}</h4>
        </Link>
        <span>author: {post.author} commentCount: {post.commentCount} voteScrore: {post.voteScore} </span>
        <button type='button' className='btn btn-outline-primary btn-sm' onClick={() => (props.handleModal(true))}>Edit</button>
        <button thype='button' className='btn btn-outline-danger btn-sm' onClick={() => (props.deletePost(post.id))}>Delete</button>
        <EditPost
          props={post}
          interfaceCon={props.interfaceCon}
        />
      </li>
    )
    )
  )
}

function mapStateToProps (state) {
  return state
}

function mapDispatchToProps (dispatch) {
  return {
    deletePost: (postid) => dispatch(deletePostDispatch(postid)),
    handleModal: (isOpen) => dispatch(editModal(isOpen))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)
