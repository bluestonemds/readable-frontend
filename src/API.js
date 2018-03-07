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

export const sort = (list, by) => {
  let array = []
  for (var l in list) {
    array.push(l)
  }
  console.log(array)
  let sortedList = []
  if (by === 'votescore') {
    sortedList = list.sort((a, b) => {
      return a.voteScore < b.voteScore
    })
  } else {
    sortedList = list.sort((a, b) => {
      return a.timestamp < b.timestamp
    })
  }
  return sortedList
}
