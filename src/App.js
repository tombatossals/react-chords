import React, { Component } from 'react'
import Chord from './Chord'
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
        <div className='App-info'>
          <p>Embed chord notation of your strings instrument inside your react powered web.</p>
          <div className='chords'>
            <div><Chord className='chord' tunning='standard' name='C' /></div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
