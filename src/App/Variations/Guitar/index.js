import React from 'react'
import Chord from '../../../Chord'
import { guitar } from '@tombatossals/chords-db/dist'

const Variations = ({ params }) => {
  const chord = guitar.chords[params.key].find(chord => chord.suffix === params.suffix)
  return (
    <div>
      <h2><a href={`/${params.instrument}/chord/${params.key}`}>Return to key {params.key}</a></h2>
      <div className='Chords'>
        {chord.positions.map((position, index) =>
          <Chord key={index} chord={chord} version={index + 1} />)}
      </div>
    </div>)
}

Variations.propTypes = {
  params: React.PropTypes.object
}

export default Variations

