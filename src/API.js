export const getAllCat = () =>
  fetch(
    'http://localhost:3001/categories',
    {
      headers: { 'Authorization': 'whatever' }
    }
  ).then(res => res.json())
    .then(data => data)

export const getAllPosts = () =>
  fetch(
    'http://localhost:3001/posts',
    {
      headers: { 'Authorization': 'whatever' }
    }
  ).then(res => res.json())
    .then(data => data)
