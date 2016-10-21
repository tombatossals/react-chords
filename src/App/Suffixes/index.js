import React from 'react'
import Chord from '../../Chord'
import { Link } from 'react-router'
import Play from '../../Play'

const getDatabase = instrument =>
  require(`@tombatossals/chords-db/lib/${instrument}.json`)

const Suffixes = ({ params }) => {
  const instrument = getDatabase(params.instrument)
  return (
    <div className='Chords'>
      {instrument.chords[params.key].map(chord =>
        <div key={chord.suffix} className='Chord'>
          <Link to={`/react-chords/${params.instrument}/chords/${chord.key.replace('#', 'sharp')}/${chord.suffix}`} key={chord.suffix} className='Chord'>
            <Chord instrument={instrument} chord={chord} version={1} />
          </Link>
          <Play chord={chord.positions[0].midi} />
        </div>
      )}
    </div>)
}

Suffixes.propTypes = {
  params: React.PropTypes.object
}

export default Suffixes
