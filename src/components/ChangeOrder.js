import React, { Fragment } from 'react'

function ChangeOrder (props) {
  let order = props.props.post.posts === undefined ? 'time' : props.props.post.posts.orderBy
  return (
    <Fragment>
      <div className='col right'>
        <label className='col-form-label'>Order by</label>
      </div>
      <div className='col'>
        <select className='form-control' value={order} onChange={(e) => {
          props.props.changeOrder(e.target.value)
        }}>
          <option value='votescore'>VoteScore</option>
          <option value='time'>Time</option>
        </select>
      </div>
    </Fragment>
  )
}

export default ChangeOrder
