import React from 'react'

function PostDetail (props) {
  let time = props.post.timestamp
  return (
    <div className='card'>
      <div className='card-body'>
        <h2 className='card-title'>{props.post.title}</h2>
        <span>author: {props.post.author}</span>
        <span>category: {props.post.category}</span>
        <span>publish time: {time}</span>
        <span>voteScore:{props.post.voteScore}</span>
        <div>
          <p>{props.post.body}</p>
        </div>
      </div>
    </div>
  )
}

export default PostDetail
