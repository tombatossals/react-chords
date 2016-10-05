import React from 'react'
import Chord from '../Chord'
import { guitar } from '@tombatossals/chords-db/dist'

const Guitar = ({ params }) => {
  return <div className='Chords'>
    {params.key && !params.suffix && 
    )}
    {!params.key && !params.suffix && 
    )}
  </div>
}

Guitar.propTypes = {
  params: React.PropTypes.any
}

export default Guitar
