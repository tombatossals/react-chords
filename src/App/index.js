import React from 'react'
import { BrowserRouter as Router, Link, Match, Miss, Redirect } from 'react-router'
import Guitar from '../Guitar'
import guitarLogo from './guitar.svg'
import NotFound from '../NotFound'
import './styles.css'

const App = () => {
  return (
    <Router>
      <div className='App'>
        <div className='App-Header'>
          <img src={guitarLogo} className='App-Logo' alt='logo' />
          <h2>React-Chords</h2>
        </div>
        <ul className='App-Menu'>
          <li><Link to='/guitar'>Guitar</Link></li>
          <li><Link to='/ukelele'>Ukelele</Link></li>
        </ul>
        <hr />
        <Match exactly pattern='/guitar' component={Guitar} />
        <Match exactly pattern='/' render={() => <Redirect to='/guitar' />} />
        <Miss component={NotFound} />
      </div>
    </Router>
  )
}

export default App
