import React from 'react'
import Chord from '../Chord'
import { ukelele } from '@tombatossals/chords-db/dist'
import './styles.css'

export default () =>
  <div className='App-Info-Ukelele'>
    <p>Ukelele chords</p>
    <div className='chords'>
      {ukelele.keys.map(key =>
        ukelele.chords[key].map(chord =>
          <a href={`/guitar/chord/${chord.key}`} key={chord.name} className='chord'><Chord tunning={ukelele.tunnings['standard']} chord={chord} version={1} /></a>
        )
      )}
    </div>
  </div>
