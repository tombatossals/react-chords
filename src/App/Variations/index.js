import React from 'react'
import Helmet from 'react-helmet'
import Chord from '../../Chord'
import { Link, withRouter } from 'react-router-dom'
import Play from '../../Play'
import './styles.css'

const getDatabase = instrument =>
  require(`@tombatossals/chords-db/lib/${instrument}.json`)

const getBlocks = keys => {
  var temp = keys.slice()
  var arr = []

  while (temp.length) {
    arr.push(temp.splice(0, 3))
  }

  return arr
}

const Variations = ({ match }) => {
  const instrument = getDatabase(match.params.instrument)
  var suffix = match.params.suffix.replace('sharp', '#')
  var key = match.params.key.replace('sharp', '#')
  const chord = instrument.chords[match.params.key].find(chord => chord.suffix === suffix)
  return (
    <div className='Variations'>
      <Helmet
        htmlAttributes={{lang: 'en'}}
        title={`${instrument.main.name} ${key} ${match.params.suffix} chords`}
        meta={[
            { name: 'description', content: `Guitar and Ukelele chords database. ${instrument.main.name} ${key} ${match.params.suffix} chord variations list.` }
        ]}
      />
      <h1>{instrument.main.name} {key}<span className='suffix'>{suffix}</span> chords <span className='return'>[ <Link to={`/react-chords/${match.params.instrument}/chords/${match.params.key}`}>return</Link> ]</span></h1>
      {getBlocks(chord.positions).map((block, index1) =>
        <div className='no-margin-top flex-center' key={index1}>
          {block.map((position, index2) =>
            <div key={index2} className='Chord unit-1-3 site-box text-center'>
              <Link to={`/react-chords/${match.params.instrument}/chords/${match.params.key}/${match.params.suffix}/${index2 + 1 + index1 * 3}`} key={chord.suffix} className='Chord'>
                <h2>Variation {index2 + 1 + index1 * 3}</h2>
                <Chord key={index1} chord={chord.positions[index2 + index1 * 3]} instrument={instrument.main} />
              </Link>
              <Play chord={position.midi} />
            </div>
          )}
        </div>
      )}
    </div>)
}

Variations.propTypes = {
  match: React.PropTypes.shape({
    params: React.PropTypes.shape({
      instrument: React.PropTypes.string,
      key: React.PropTypes.string,
      suffix: React.PropTypes.string
    })
  })
}

export default withRouter(Variations)

