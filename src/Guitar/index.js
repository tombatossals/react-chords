import React from 'react'
import Chord from '../Chord'
import { guitar } from '@tombatossals/chords-db/dist'
import './styles.css'

export default () =>
  <div className='App-info'>
    <p>Embed chord notation of your strings instrument inside your react powered web application.</p>
    <div className='chords'>
      {guitar.keys.map(key =>
        guitar.chords[key].map(chord =>
          <a href={`/guitar/chord/${chord.key}`} key={chord.name} className='chord'><Chord tunning={guitar.tunnings['standard']} chord={chord} version={3} /></a>
        )
      )}
    </div>
  </div>
