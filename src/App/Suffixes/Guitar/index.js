import React from 'react'
import Chord from '../../../Chord'
import { guitar } from '@tombatossals/chords-db/dist'

const Suffixes = ({ params }) => {
  return (
    <div className='Chords'>
      {guitar.chords[params.key].map(chord =>
        <a href={`/guitar/chord/${chord.key}${chord.suffix}`} key={chord.name} className='Chord'>
          <Chord tunning={guitar.tunnings['standard']} chord={chord} version={1} />
        </a>
      )}
    </div>)
}

Suffixes.propTypes = {
  params: React.PropTypes.object
}

export default Suffixes

