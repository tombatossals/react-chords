import React from 'react'
import Chord from '../../Chord'
import { Link } from 'react-router'
import Play from '../../Play'

const getDatabase = instrument =>
  require(`@tombatossals/chords-db/lib/${instrument}.json`)

const Variations = ({ params }) => {
  const instrument = getDatabase(params.instrument)
  const chord = instrument.chords[params.key].find(chord => chord.suffix === params.suffix)
  return (
    <div>
      <h2><Link to={`/react-chords/${params.instrument}/chords/${params.key}`}>Return to key {params.key.replace('sharp', '#')}</Link></h2>
      <div className='Chords'>
        {chord.positions.map((position, index) =>
          <div key={index} className='Chord'>
            <Chord key={index} chord={chord} instrument={instrument} version={index + 1} />
            <Play chord={position.midi} />
          </div>
        )}
      </div>
    </div>)
}

Variations.propTypes = {
  params: React.PropTypes.object
}

export default Variations

