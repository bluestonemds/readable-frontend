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
class CreatePost extends Component {
  render () {
    return (
      <Modal
        isOpen={this.props.interfaceCon.modalIsOpen}
        style={customStyles}
      >
        <h2>new post</h2>
        <form>
          <div className='form-group'>
            <label>title</label>
            <input ref={(dom) => (this._title = dom)}className='form-control' />
          </div>
          <div className='form-group'>
            <label>author</label>
            <input ref={(dom) => (this._author = dom)} className='form-control' />
          </div>
          <div className='form-group'>
            <label>category</label>
            <select ref={(dom) => (this._category = dom)}className='form-control'>
              {
                this.categories.map((cat) => (
                  <option value={cat.name}>{cat.name}</option>
                ))
              }
            </select>
          </div>
          <div className='form-group'>
            <label>body</label>
            <textarea ref={(dom) => (this._body = dom)} className='form-control' />
          </div>
          <div className='form-group'>
            <button type='button' className='btn btn-primary' onClick={() => {
              this.props.handlePost({
                id: Math.random().toString(36).substring(7) + Date.now(),
                title: this._title.value,
                author: this._author.value,
                category: this._category.value,
                body: this._body.value
              })
              this.props.handleModal(false)
            }}>add</button>
            <button className='btn btn-secondary' onClick={() => this.props.handleModal(false)}>close</button>
          </div>
        </form>
      </Modal>
    )
  }
}

export default CreatePost
