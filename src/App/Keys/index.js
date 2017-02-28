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

const Keys = ({ match }) => {
  const name = match.params.instrument || 'guitar'
  const instrument = getDatabase(name)
  return (
    <div className='Chords'>
      <Helmet
        htmlAttributes={{lang: 'en'}}
        title={instrument.main.name + ' chords'}
        meta={[
            { name: 'description', content: 'Guitar and Ukelele chords database. ' + instrument.main.name + ' chords list.' }
        ]}
      />
      <h1>{instrument.main.name} chords</h1>
      {getBlocks(instrument.main.keys.map(k => k.replace('#', 'sharp'))).map((keyPair, index) =>
        <div className='no-margin-top flex-center' key={index}>
          {keyPair.map(keyName =>
            <div className='Chord unit-1-4 site-box text-center' key={keyName}>
              <Link to={`/react-chords/${name}/chords/${keyName}`} className='ChordLink'>
                <h2>{keyName.replace('sharp', '#')}</h2>
                {instrument.chords[keyName] && instrument.chords[keyName].slice(0, 1).map(chord =>
                  <div key={chord.suffix}>
                    <Chord instrument={instrument.main} chord={chord} version={1} lite />
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
  match: React.PropTypes.shape({
    params: React.PropTypes.shape({
      instrument: React.PropTypes.string
    })
  })
}

Keys.defaultProps = {
  params: {
    instrument: 'guitar'
  }
}

export default withRouter(Keys)
