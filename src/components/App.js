import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../assets/css/bootstrap.css'
import '../assets/css/bootstrap-grid.css'
import { listCat } from '../actions'

class App extends Component {
  render () {
    console.log(this.props)
    
    return (
      <div className='container'>
        <h1 className='text-success'>readable project</h1>
        <ul >
          {this.props.state.map((cat, index) => (
            <li key={index}>{cat.name}</li>
          ))
          }
        </ul>
        <button onClick={() => listCat('react')} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    state: state.categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    listCat: (data) => dispatch(listCat(data))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
