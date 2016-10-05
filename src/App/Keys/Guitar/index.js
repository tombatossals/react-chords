import React from 'react'
import Chord from '../../../Chord'
import { guitar } from '@tombatossals/chords-db/dist'
import './styles.css'

const Keys = () => {
  return (
    <div className='KeyChords'>
      {guitar.keys.map(keyName =>
        <div className='Key' key={keyName}>
          <h2>{keyName}</h2>
          {guitar.chords[keyName].slice(0, 1).map(chord =>
            <a href={`/guitar/chord/${chord.key}`} key={chord.name} className='Chord'>
              <Chord tunning={guitar.tunnings['standard']} chord={chord} version={1} />
            </a>
          )}
        </div>
      )
    }
    </div>)
}

export default Keys

