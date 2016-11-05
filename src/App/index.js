import React from 'react'
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router'
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
          <h2><Link to='/react-chords/'>Chords database</Link></h2>
          <p>Chords for your string instruments, beautifully rendered with SVG</p>
        </div>
      </div>
      <ul className='App-Menu'>
        <li><Link to='/react-chords/guitar'>Guitar chords</Link></li>
        <li><Link to='/react-chords/ukelele'>Ukelele chords</Link></li>
      </ul>
      <div className='App-Info'>
        <Match exactly pattern='/react-chords/:instrument(guitar|ukelele)' component={Keys} />
        <Match exactly pattern='/react-chords/:instrument/chords/:key([EFGABCD])' component={Suffixes} />
        <Match exactly pattern='/react-chords/:instrument/chords/:key([CDF]sharp)' component={Suffixes} />
        <Match exactly pattern='/react-chords/:instrument/chords/:key([DEGAB]b)' component={Suffixes} />
        <Match exactly pattern='/react-chords/:instrument/chords/:key([CDF]sharp)/:suffix' component={Variations} />
        <Match exactly pattern='/react-chords/:instrument/chords/:key([DEGAB]b)/:suffix' component={Variations} />
        <Match exactly pattern='/react-chords/:instrument/chords/:key([EFGABCD])/:suffix' component={Variations} />
        <Match exactly pattern='/react-chords/:instrument/chords/:key([CDF]sharp)/:suffix/:variation([0-9]+)' component={Variation} />
        <Match exactly pattern='/react-chords/:instrument/chords/:key([DEGAB]b)/:suffix/:variation([0-9]+)' component={Variation} />
        <Match exactly pattern='/react-chords/:instrument/chords/:key([EFGABCD])/:suffix/:variation([0-9]+)' component={Variation} />
        <Match exactly pattern='(/react-chords/?)' component={Keys} />
        <Match exactly pattern='(/?)' component={Keys} />
        <Miss component={NotFound} />
      </div>
    </div>
  </Router>

export default App
