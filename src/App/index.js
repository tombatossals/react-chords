import React from 'react'
import { HashRouter as Router, Link, Match, Miss, Redirect } from 'react-router'
import Variations from './Variations'
import Variation from './Variation'
import Keys from './Keys'
import Suffixes from './Suffixes'
import NotFound from '../NotFound'
import 'open-color/open-color.css'
import 'mobi.css/dist/mobi.css'
import './styles.css'

const App = () =>
  <Router>
    <div className='App'>
      <div className='App-Header'>
        <div className='Title'>
          <h2><Link to='/'>Chords database</Link></h2>
          <p>Chords for your string instruments, beautifully rendered with SVG</p>
        </div>
      </div>
      <ul className='App-Menu'>
        <li><Link to='/guitar'>Guitar chords</Link></li>
        <li><Link to='/ukelele'>Ukelele chords</Link></li>
      </ul>
      <div className='App-Info'>
        <Match exactly pattern='/:instrument(guitar|ukelele)' component={Keys} />
        <Match exactly pattern='/:instrument/chords/:key([EFGABCD])' component={Suffixes} />
        <Match exactly pattern='/:instrument/chords/:key([CDF]sharp)' component={Suffixes} />
        <Match exactly pattern='/:instrument/chords/:key([DEGAB]b)' component={Suffixes} />
        <Match exactly pattern='/:instrument/chords/:key([CDF]sharp)/:suffix' component={Variations} />
        <Match exactly pattern='/:instrument/chords/:key([DEGAB]b)/:suffix' component={Variations} />
        <Match exactly pattern='/:instrument/chords/:key([EFGABCD])/:suffix' component={Variations} />
        <Match exactly pattern='/:instrument/chords/:key([CDF]sharp)/:suffix/:variation([0-9]+)' component={Variation} />
        <Match exactly pattern='/:instrument/chords/:key([DEGAB]b)/:suffix/:variation([0-9]+)' component={Variation} />
        <Match exactly pattern='/:instrument/chords/:key([EFGABCD])/:suffix/:variation([0-9]+)' component={Variation} />
        <Match exactly pattern='(/?)' render={() => <Redirect to='/guitar' />} />
        <Miss component={NotFound} />
      </div>
    </div>
  </Router>

export default App
