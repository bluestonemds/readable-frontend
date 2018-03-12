import React from 'react'

function PostDetail (props) {
  let post = props.props.post.currentPost
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
      </div>
    </div>
  )
}

export default PostDetail
