import React from 'react'
import Chord from '../../Chord'
import Play from '../../Play'
import { Link } from 'react-router'
import './styles.css'

const getDatabase = instrument =>
  require(`@tombatossals/chords-db/lib/${instrument}.json`)

const Keys = ({ params }) => {
  const instrument = getDatabase(params.instrument)
  console.log(instrument)
  return (
    <div className='KeyChords'>
      {instrument.main.keys.map(k => k.replace('#', 'sharp')).map(keyName =>
        <div className='Key' key={keyName}>
          <h2>{keyName.replace('sharp', '#')}</h2>
          {instrument.chords[keyName] && instrument.chords[keyName].slice(0, 1).map(chord =>
            <div key={chord.suffix}>
              <Link to={`/react-chords/${params.instrument}/chords/${keyName}`} className='Chord'>
                <Chord instrument={instrument} chord={chord} version={1} />
              </Link>
              <Play chord={chord.positions[0].midi} />
            </div>
          )}
        </div>
      )
    }
    </div>
  )
}

Keys.propTypes = {
  params: React.PropTypes.object
}

export default Keys
