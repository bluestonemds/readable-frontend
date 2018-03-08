import React from 'react'

function PostList (props) {
  let post = props.posts
  return (
    post.map((post, index) => (
      <li key={index}>
        {post.title}
      </li>
    )
    )
  )
}

export default PostList
