import React from 'react'
import Chord from '../../Chord'
import { Link } from 'react-router'
import Play from '../../Play'
import './styles.css'

const getDatabase = instrument =>
  require(`@tombatossals/chords-db/lib/${instrument}.json`)

const getBlocks = keys => {
  var temp = keys.slice()
  var arr = []

  while (temp.length) {
    arr.push(temp.splice(0, 4))
  }

  return arr
}

const Suffixes = ({ params }) => {
  const instrument = getDatabase(params.instrument)
  return (
    <div className='Chords'>
      <h1>{params.key.replace('sharp', '#')} key <span className='return'>[ <Link to={`/react-chords/${params.instrument}`}>return</Link> ]</span></h1>
      {getBlocks(instrument.chords[params.key]).map((block, index) =>
        <div className='no-margin-top flex-center' key={index}>
          {block.map(chord =>
            <div key={chord.suffix} className='Chord unit-1-4 site-box text-center'>
              <Link to={`/react-chords/${params.instrument}/chords/${chord.key.replace('#', 'sharp')}/${chord.suffix}`} key={chord.suffix} className='Chord'>
                <h2>{chord.key}<span className='suffix'>{chord.suffix}</span></h2>
                <Chord instrument={instrument} chord={chord} version={1} />
              </Link>
              <Play chord={chord.positions[0].midi} />
            </div>
          )}
        </div>
      )}
    </div>)
}

Suffixes.propTypes = {
  params: React.PropTypes.object
}

export default Suffixes
