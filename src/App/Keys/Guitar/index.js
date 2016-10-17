import React from 'react'
import Chord from '../../../Chord'
import Play from '../../../Play'
import { Link } from 'react-router'
import './styles.css'

const guitar = require('@tombatossals/chords-db/lib/guitar.json')

const Keys = () =>
  <div className='KeyChords'>
    {guitar.main.keys.map(k => k.replace('#', 'sharp')).map(keyName =>
      <div className='Key' key={keyName}>
        <h2>{keyName.replace('sharp', '#')}</h2>
        {guitar.chords[keyName] && guitar.chords[keyName].slice(0, 1).map(chord =>
          <div key={chord.suffix}>
            <Link to={`/react-chords/guitar/chords/${keyName}`} className='Chord'>
              <Chord tunning={guitar.main.tunnings['standard']} chord={chord} version={1} />
            </Link>
            <Play chord={chord.positions[0].midi} />
          </div>
        )}
      </div>
    )
  }
  </div>

export default Keys

