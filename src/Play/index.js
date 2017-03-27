import React from 'react'
import './styles.css'
import playIcon from './play.svg'
import Soundfont from 'soundfont-player'
import { getAudioContext } from '../utils'

class Play extends React.Component {
  constructor (props) {
    super(props)
    this.playMIDI = this.playMIDI.bind(this)
    this.ac = getAudioContext()
    this.toggleArpeggio = this.toggleArpeggio.bind(this)
    this.state = {
      arpeggio: false
    }
  }

  playMIDI () {
    Soundfont.instrument(this.ac, 'acoustic_guitar_nylon').then((guitar) =>
      this.state.arpeggio
      ? guitar.schedule(this.ac.currentTime, this.props.chord.slice(0).map((note, index) =>
        ({ time: index * 0.5, note })))
      : this.props.chord.map(note => guitar.play(note))
    )
  }

  toggleArpeggio () {
    this.setState({
      arpeggio: !this.state.arpeggio
    })
  }

  render () {
    return (
      <div className='Play'>
        <img src={playIcon} onClick={this.playMIDI} alt='Play' />
        <span onClick={this.toggleArpeggio} className={this.state.arpeggio && 'active'}>Arpeggio</span>
      </div>
    )
  }
}

Play.propTypes = {
  chord: React.PropTypes.array.isRequired
}

export default Play
