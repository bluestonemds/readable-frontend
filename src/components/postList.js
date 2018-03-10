import React from 'react'
import { Route, Link } from 'react-router-dom'

function PostList (props) {
  let post = props.posts
  console.log('postList Component: ', post)
  return (
    post.map((post, index) => (
      <li key={index}>
        <Link to={'/' + post.category + '/' + post.id} ><h4>title: {post.title}</h4>
        </Link>
        <span>author: {post.author} commentCount: {post.commentCount} voteScrore: {post.voteScore} </span>
      </li>
    )
    )
  )
}

export default PostList
