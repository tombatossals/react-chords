import React from 'react'
import Helmet from 'react-helmet'
import Chord from '../../Chord'
import { Link, withRouter } from 'react-router-dom'
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

const Suffixes = ({ match }) => {
  const instrument = getDatabase(match.params.instrument)
  return (
    <div className='Chords'>
      <Helmet
        htmlAttributes={{lang: 'en'}}
        title={`${instrument.main.name} ${match.params.key.replace('sharp', '#')} key chords`}
        meta={[
            { name: 'description', content: `Guitar and Ukelele chords database. ${instrument.main.name} ${match.params.key.replace('sharp', '#')} key chords list.` }
        ]}
      />
      <h1>{instrument.main.name} {match.params.key.replace('sharp', '#')} key chords <span className='return'>[ <Link to={`/react-chords/${match.params.instrument}`}>return</Link> ]</span></h1>
      {getBlocks(instrument.chords[match.params.key]).map((block, index) =>
        <div className='no-margin-top flex-center' key={index}>
          {block.map(chord =>
            <div key={chord.suffix} className='Chord unit-1-4 site-box text-center'>
              <Link to={`/react-chords/${match.params.instrument}/chords/${chord.key.replace('#', 'sharp')}/${chord.suffix.replace('#', 'sharp')}`} key={chord.suffix} className='Chord'>
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
  match: React.PropTypes.shape({
    params: React.PropTypes.shape({
      instrument: React.PropTypes.string,
      key: React.PropTypes.string
    })
  })
}

export default withRouter(Suffixes)
