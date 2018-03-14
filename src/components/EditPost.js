import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { editPostDispatch, editModal } from '../actions'

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

class EditPost extends Component {
  render () {
    return (
      <Modal
        isOpen={this.props.interfaceCon.editModalIsOpen}
        style={customStyles}
      >
        <h2>new post</h2>
        <form>
          <div className='form-group'>
            <label>title</label>
            <input ref={(dom) => (this._title = dom)} defaultValue={this.props.props.title} className='form-control' />
          </div>
          <div className='form-group'>
            <label>body</label>
            <textarea ref={(dom) => (this._body = dom)} defaultValue={this.props.props.body} className='form-control' />
          </div>
          <div className='form-group'>
            <button type='button' className='btn btn-primary' onClick={() => {
              this.props.editPost({
                id: this.props.props.id,
                title: this._title.value,
                body: this._body.value
              })
              this.props.handleModal(false)
            }}>save</button>
            <button className='btn btn-secondary' onClick={() => this.props.handleModal(false)}>close</button>
          </div>
        </form>
      </Modal>
    )
  }
}

function mapStateToProps (state) {
  return state
}

function mapDispatchToProps (dispatch) {
  return {
    handleModal: (isOpen) => dispatch(editModal(isOpen)),
    editPost: (data) => dispatch(editPostDispatch(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPost)
