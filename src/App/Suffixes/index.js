import React from 'react'
import Helmet from 'react-helmet'
import Chord from '../../Chord'
import { Link } from 'react-router'
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
  const name = params.instrument || 'guitar'
  const instrument = getDatabase(name)
  return (
    <div className='Chords'>
      <Helmet
        htmlAttributes={{lang: 'en'}}
        title={`${instrument.main.name} ${params.key.replace('sharp', '#')} key chords`}
        meta={[
            { name: 'description', content: `Guitar and Ukelele chords database. ${instrument.main.name} ${params.key.replace('sharp', '#')} key chords list.` }
        ]}
      />
      <h1>{instrument.main.name} {params.key.replace('sharp', '#')} key chords <span className='return'>[ <Link to={`/react-chords/${params.instrument}`}>return</Link> ]</span></h1>
      {getBlocks(instrument.chords[params.key]).map((block, index) =>
        <div className='no-margin-top flex-center' key={index}>
          {block.map(chord =>
            <div key={chord.suffix} className='Chord unit-1-4 site-box text-center'>
              <Link to={`/react-chords/${name}/chords/${chord.key.replace('#', 'sharp')}/${chord.suffix.replace('#', 'sharp')}`} key={chord.suffix} className='Chord'>
                <h2>{chord.key}<span className='suffix'>{chord.suffix}</span></h2>
                <Chord instrument={instrument.main} chord={chord} version={1} lite />
              </Link>
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
