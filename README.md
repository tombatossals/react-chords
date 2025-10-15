# react-chords

React library for easily generate string instruments SVG chord diagrams

## Installation

### With NPM

```
npm install @tombatossals/react-chords
```

### With Yarn

```
yarn add @tombatossals/react-chords
```

## Usage

```js
import React from 'react'
import ReactDOM from 'react-dom'

import Chord from '@tombatossals/react-chords'

const GuitarChord = () => {
  const chord = {
    frets: [1, 3, 3, 2, 1, 1],
    fingers: [1, 3, 4, 2, 1, 1],
    barres: [1],
    capo: false,
  }
  const instrument = {
    strings: 6,
    fretsOnChord: 4,
    name: 'Guitar',
    keys: [],
    tunings: {
      standard: ['E', 'A', 'D', 'G', 'B', 'E']
    }
  }
  const lite = false // defaults to false if omitted
  return (
    <Chord
      chord={chord}
      instrument={instrument}
      lite={lite}
    />
  )
}

ReactDOM.render(
  <GuitarChord />,
  document.getElementById('root')
);
```

### Piano

```js
import React from 'react'
import ReactDOM from 'react-dom'
import Chord from '@tombatossals/react-chords'

const PianoChord = () => {
    const chord = {
        frets: ['C', 'E', 'G']
    }
    const instrument = {
        name: 'Piano'
    }
    return <Chord chord={chord} instrument={instrument} />
}

ReactDOM.render(
  <PianoChord />,
  document.getElementById('root')
);
```

## Example of use
Using the [chords-db](http://github.com/tombatossals/chords-db) database we can get this result:
[![react-chords](https://raw.githubusercontent.com/tombatossals/react-chords/webpage/src/images/react-chords.png)](https://tombatossals.github.io/react-chords/)
