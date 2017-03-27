import React from 'react'
import Helmet from 'react-helmet'
import Chord from '../../Chord'
import { Link, withRouter } from 'react-router-dom'
import Play from '../../Play'
import './styles.css'

const getDatabase = instrument =>
  require(`@tombatossals/chords-db/lib/${instrument}.json`)

const Variation = ({ match }) => {
  const instrument = getDatabase(match.params.instrument)
  var suffix = match.params.suffix.replace('sharp', '#')
  const chord = instrument.chords[match.params.key].find(chord => chord.suffix === suffix)
  const version = parseInt(match.params.variation, 10)
  const variation = chord.positions[version - 1]
  return (
    <div className='Variation'>
      <Helmet
        htmlAttributes={{lang: 'en'}}
        title={`${instrument.main.name} ${match.params.key.replace('sharp', '#')} ${match.params.suffix} chord (Variation ${match.params.variation})`}
        meta={[
            { name: 'description', content: `Guitar and Ukelele chords database. ${instrument.main.name} ${match.params.key.replace('sharp', '#')} ${suffix} chord (Variation ${match.params.variation}).` }
        ]}
      />
      <h1>{instrument.main.name} {match.params.key.replace('sharp', '#')}<span className='suffix'>{suffix}</span> chord <span className='variation'>(Variation {match.params.variation})</span> <span className='return'>[ <Link to={`/react-chords/${match.params.instrument}/chords/${match.params.key}/${match.params.suffix}`}>return</Link> ]</span></h1>
      <div className='Chord'>
        <a href={`${process.env.PUBLIC_URL}/svg/${match.params.instrument}/chords/${match.params.key}/${match.params.suffix}/${match.params.key}-${match.params.suffix}-${match.params.variation}.svg`}>
          <Chord chord={variation} instrument={instrument.main} />
        </a>
        <Play chord={variation.midi} />
      </div>
    </div>)
}

Variation.propTypes = {
  match: React.PropTypes.shape({
    params: React.PropTypes.shape({
      instrument: React.PropTypes.string,
      key: React.PropTypes.string,
      suffix: React.PropTypes.string,
      variation: React.PropTypes.string
    })
  })
}

export default withRouter(Variation)

