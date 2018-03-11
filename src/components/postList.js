import React from 'react'
import { Link } from 'react-router-dom'

function PostList (props) {
  let post = props.props.post.posts
  console.log(props.props.post)
  return (
    post.map((post, index) => (
      <li key={index}>
        <Link to={'/' + post.category + '/' + post.id} onClick={() => props.props.getPost(post.id)}>
          <h4>title: {post.title}</h4>
        </Link>
        <span>author: {post.author} commentCount: {post.commentCount} voteScrore: {post.voteScore} </span>
      </li>
    )
    )
  )
}

export default PostList
