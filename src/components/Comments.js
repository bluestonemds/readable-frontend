import React, { Component } from 'react'
import { withRouter, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import CreateComment from './CreateComment'
import EditComment from './EditComment'
import { addCommentsDispatch, deleteCommentDispatch, voteCommentDispath } from '../actions'

class Comments extends Component {
  render () {
    let comment = this.props.comment.comment
    let post = this.props.post
    return (
      <div>
        <h4>Comments</h4>
        <ul>
          {
            (comment || []).map((comment, index) => (
              <li className='list-unstyled' key={index}>
                <h4>author: {comment.author}</h4>
                <span>voteScore: {comment.voteScore}</span>
                <Link className='btn btn-outline-primary btn-sm' to={'/' + post.currentCategory + '/' + post.currentPostId + '/' + comment.id + '/' + 'editComment'}>
                   EditComment
                </Link>
                <button className='btn btn-outline-danger btn-sm' onClick={() => (this.props.deleteComment(comment.id))}>Delete</button>
                <button className='btn btn-outline-secondary btn-sm' onClick={() => (this.props.handleVote(comment.id, 'upVote'))}>upVote</button>
                <button className='btn btn-outline-secondary btn-sm' onClick={() => (this.props.handleVote(comment.id, 'downVote'))}>downVote</button>
                <div>{comment.body}</div>
                <Route exact path={'/' + post.currentCategory + '/' + post.currentPostId + '/' + comment.id + '/' + 'editComment'} render={(props) => (
                  <EditComment
                    currentComment={comment}
                  />
                )}
                />
              </li>
            ))
          }
        </ul>
        <div>
          <Link to={'/' + post.currentCategory + '/' + post.currentPostId + '/createComment'}>
            CreateComment
          </Link>
          <Route exact path={'/' + post.currentCategory + '/' + post.currentPostId + '/createComment'} render={(props) => (
            <CreateComment
              handle={this.props.addComment}
              postid={this.props.post.currentPostId}
            />
          )}
          />

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
    addComment: (data) => dispatch(addCommentsDispatch(data)),
    deleteComment: (data) => dispatch(deleteCommentDispatch(data)),
    handleVote: (commentid, status) => dispatch(voteCommentDispath(commentid, status))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments))
