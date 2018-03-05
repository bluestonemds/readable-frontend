export const getAllCat = () =>
  fetch(
    'http://localhost:3001/categories',
    {
      headers: { 'Authorization': 'whatever' }
    }
  ).then(res => res.json())
    .then(data => data)
