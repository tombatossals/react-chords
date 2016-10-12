import React from 'react'
import Chord from '../../../Chord'
import { Link } from 'react-router'
import './styles.css'

const guitar = require('@tombatossals/chords-db/lib/guitar.json')

const Keys = () => {
  return (
    <div className='KeyChords'>
      {guitar.main.keys.map(k => k.replace('#', 'sharp')).map(keyName =>
        <div className='Key' key={keyName}>
          <h2>{keyName}</h2>
          {guitar.chords[keyName] && guitar.chords[keyName].slice(0, 1).map(chord =>
            <Link to={`/react-chords/guitar/chords/${keyName}`} key={chord.suffix} className='Chord'>
              <Chord tunning={guitar.main.tunnings['standard']} chord={chord} version={1} />
            </Link>
          )}
        </div>
      )
    }
    </div>)
}

export default Keys

