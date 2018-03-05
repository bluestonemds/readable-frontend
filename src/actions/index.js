export const LIST_CAT = 'LIST_CAT'
export const LIST_POSTS = 'LIST_POSTS'

export function listCat (name) {
  return {
    type: LIST_CAT,
    name
  }
}
