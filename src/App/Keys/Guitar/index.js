import React from 'react'
import Chord from '../../../Chord'
import { Link } from 'react-router'
import { guitar } from '@tombatossals/chords-db/dist'
import './styles.css'

const Keys = () => {
  return (
    <div className='KeyChords'>
      {guitar.keys.map(keyName =>
        <div className='Key' key={keyName}>
          <h2>{keyName}</h2>
          {guitar.chords[keyName].slice(0, 1).map(chord =>
            <Link to={`/guitar/chord/${chord.key}`} key={chord.suffix} className='Chord'>
              <Chord tunning={guitar.tunnings['standard']} chord={chord} version={1} />
            </Link>
          )}
        </div>
      )
    }
    </div>)
}

export default Keys

