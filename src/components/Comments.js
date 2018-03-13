import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { commentModal } from '../actions'
import CreateComment from './CreateComment'

class Comments extends Component {
  render () {
    let comment = this.props.comments
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
          <Link to='/createComment' onClick={() => this.props.handleModal(true)}>
            CreateComment
          </Link>
          <CreateComment
            interfaceCon={this.props.interfaceCon}
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
    handleModal: (isOpen) => dispatch(commentModal(isOpen))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments)
