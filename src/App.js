import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>React-Chords</h2>
        </div>
        <p className='App-intro'>
          <p>Embed chord notation of your strings instrument inside your react powered web.</p>
        </p>
      </div>
    )
  }
}

export default App
