import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { listCommentsDispatch, votePostDispath } from '../actions'
import Comments from './Comments'

class PostDetail extends Component {
  componentDidMount () {
    this.props.listComment(this.props.match.params.postid)
  }

  render () {
    let post = this.props.post.posts
    if (!post) {
      return (<div>nothing to show.</div>)
    }
    return (
      <div className='card'>
        <div className='card-body'>
          <h2 className='card-title'>{post.title}</h2>
          <div>author: {post.author}</div>
          <div>category: {post.category}</div>
          <div>publish time: {post.timestamp}</div>
          <div>voteScore:{post.voteScore}</div>
          <div>
            <p>{post.body}</p>
          </div>
          <button className='btn btn-outline-secondary btn-sm' onClick={() => (this.props.handleVote(post.id, 'upVote'))}>upVote</button>
          <button className='btn btn-outline-secondary btn-sm' onClick={() => (this.props.handleVote(post.id, 'downVote'))}>downVote</button>
          <div>
            <Comments
            />
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
    listComment: (postid) => dispatch(listCommentsDispatch(postid)),
    handleVote: (postid, status) => dispatch(votePostDispath(postid, status))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail))
