import React, { Component } from 'react'
import { connect } from 'react-redux'
import { listCommentsDispatch } from '../actions'
import Comments from './Comments'

class PostDetail extends Component {
  componentDidMount () {
    this.props.listComment(this.props.props.post.currentPost.id)
  }

  render () {
    let post = this.props.props.post.currentPost
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
          <div>
            <Comments
              comments={this.props.comment.comment}
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
    listComment: (postid) => dispatch(listCommentsDispatch(postid))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail)
