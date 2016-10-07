import React from 'react'
import Chord from '../../../Chord'
import { Link } from 'react-router'
import { guitar } from '@tombatossals/chords-db/dist'

const Suffixes = ({ params }) => {
  return (
    <div className='Chords'>
      {guitar.chords[params.key].map(chord =>
        <Link to={`/react-chords/guitar/chord/${chord.key}${chord.suffix}`} key={chord.suffix} className='Chord'>
          <Chord tunning={guitar.main.tunnings['standard']} chord={chord} version={1} />
        </Link>
      )}
    </div>)
}

Suffixes.propTypes = {
  params: React.PropTypes.object
}

export default Suffixes

