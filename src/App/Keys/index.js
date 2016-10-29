import React from 'react'
import Chord from '../../Chord'
import { Link } from 'react-router'
import './styles.css'

const getDatabase = (instrument = 'guitar') =>
  require(`@tombatossals/chords-db/lib/${instrument}.json`)

const getBlocks = keys => {
  var temp = keys.slice()
  var arr = []

  while (temp.length) {
    arr.push(temp.splice(0, 4))
  }

  return arr
}

const Keys = ({ params }) => {
  const instrument = getDatabase(params.instrument)
  return (
    <div className='Chords'>
      <h1>{instrument.main.name} chords</h1>
      {getBlocks(instrument.main.keys.map(k => k.replace('#', 'sharp'))).map((keyPair, index) =>
        <div className='no-margin-top flex-center' key={index}>
          {keyPair.map(keyName =>
            <div className='Chord unit-1-4 site-box text-center' key={keyName}>
              <Link to={`/react-chords/${params.instrument}/chords/${keyName}`} className='ChordLink'>
                <h2>{keyName.replace('sharp', '#')}</h2>
                {instrument.chords[keyName] && instrument.chords[keyName].slice(0, 1).map(chord =>
                  <div key={chord.suffix}>
                    <Chord instrument={instrument} chord={chord} version={1} lite />
                  </div>
                )}
              </Link>
            </div>
          )}
        </div>
        )}
    </div>
  )
}

Keys.propTypes = {
  params: React.PropTypes.object
}

export default Keys
