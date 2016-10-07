import React from 'react'
import { BrowserRouter as Router, Link, Match, Miss, Redirect } from 'react-router'
import Variations from './Variations'
import Keys from './Keys'
import Suffixes from './Suffixes'
import guitarLogo from './guitar.svg'
import NotFound from '../NotFound'
import './styles.css'

const App = () => {
  return (
    <Router>
      <div className='App'>
        <div className='App-Header'>
          <Link to='/'><img src={guitarLogo} className='App-Logo' alt='logo' /></Link>
          <div className='Title'>
            <h2><Link to='/'>React-Chords</Link></h2>
            <p>Embed chord notation of your strings instrument inside your react powered web application.</p>
          </div>
        </div>
        <ul className='App-Menu'>
          <li><Link to='/guitar'>Guitar chords</Link></li>
          <li><Link to='/ukelele'>Ukelele chords</Link></li>
        </ul>
        <div className='App-Info'>
          <Match exactly pattern='/:instrument' component={Keys} />
          <Match exactly pattern='/:instrument/chord/:key([EFGABCD])' component={Suffixes} />
          <Match exactly pattern='/:instrument/chord/:key([EFGABCD]):suffix' component={Variations} />
          <Match exactly pattern='/' render={() => <Redirect to='/guitar' />} />
          <Miss component={NotFound} />
        </div>
      </div>
    </Router>
  )
}

export default App
