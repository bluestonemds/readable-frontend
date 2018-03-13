import React, { Component } from 'react'
import Modal from 'react-modal'
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}
const uuidv1 = require('uuid/v1')
const uuid = uuidv1()
class CreateComment extends Component {
  render () {
    return (
      <Modal
        isOpen={this.props.interfaceCon.commentModalIsOpen}
        style={customStyles}
      >
        <h2>new post</h2>
        <form>
          <div className='form-group'>
            <label>author</label>
            <input ref={(dom) => (this._author = dom)} className='form-control' />
          </div>
          <div className='form-group'>
            <label>body</label>
            <textarea ref={(dom) => (this._body = dom)} className='form-control' />
          </div>
          <div className='form-group'>
            <button type='button' className='btn btn-primary' onClick={() => {
              this.props.handleComment({
                id: uuid,
                timestamp: Date.now(),
                body: this._body.value,
                author: this._author.value,
                parentid: this.props.post.currentPostId
              })
              this.props.handleCommentModal(false)
            }}>add</button>
            <button className='btn btn-secondary' onClick={() => this.props.handleCommentModal(false)}>close</button>
          </div>
        </form>
      </Modal>
    )
  }
}

export default CreateComment
