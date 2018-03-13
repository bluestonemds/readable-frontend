import React, { Component } from 'react'
import { withRouter, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import CreateComment from './CreateComment'
import { addCommentsDispatch } from '../actions'

class Comments extends Component {
  render () {
    console.log(this.props)
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
                <div>{comment.body}</div>
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
    addComment: (data) => dispatch(addCommentsDispatch(data))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments))
