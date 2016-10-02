import React from 'react'
import Chord from './Chord'
import guitarLogo from './guitar.svg'
import { guitar } from '@tombatossals/chords-db/dist'

import './App.css'

export default () =>
  <div className='App'>
    <div className='App-header'>
      <img src={guitarLogo} className='App-logo' alt='logo' />
      <h2>React-Chords</h2>
    </div>
    <div className='App-info'>
      <p>Embed chord notation of your strings instrument inside your react powered web application.</p>
      <div className='chords'>
        {guitar.keys.map(key =>
          guitar.chords[key].map(chord =>
            <div key={chord.name} className='chord'><Chord tunning={guitar.tunnings['standard']} chord={chord} /></div>
          )
        )}
      </div>
    </div>
  </div>
