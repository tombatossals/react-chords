export default {
  strings: 6,
  tunnings: {
    standard: [ 'E', 'B', 'G', 'D', 'A', 'E' ]
  },
  chords: {
    'C': [{
      type: 'major',
      position: 0,
      frets: [ 0, 1, 0, 2, 3, -1 ],
      fingers: [ 0, 1, 0, 2, 3, 0 ],
      barre: []
    },
    {
      type: '7',
      position: 0,
      frets: [ 0, 1, 3, 2, 3, -1 ],
      barre: []
    }],
    'D': [{
      type: 'major',
      position: 0,
      frets: [ 2, 3, 2, 0, -1, -1 ],
      fingers: [ 2, 3, 1, 0, 0, 0 ],
      barre: []
    },
    {
      type: 'minor',
      position: 0,
      frets: [ 1, 3, 2, 0, -1, -1 ],
      barre: []
    },
    {
      type: '7',
      position: 0,
      frets: [ 2, 1, 2, 0, -1, -1 ],
      barre: []
    },
    {
      type: 'm7',
      position: 0,
      frets: [ 1, 1, 2, 0, -1, -1 ],
      barre: []
    }],
    'E': [{
      type: 'major',
      position: 0,
      frets: [ 0, 0, 1, 2, 2, 0 ],
      fingers: [ 0, 0, 1, 3, 2, 0 ],
      barre: []
    },
    {
      type: 'minor',
      position: 0,
      frets: [ 0, 0, 0, 2, 2, 0 ],
      barre: []
    },
    {
      type: '7',
      position: 0,
      frets: [ 0, 3, 1, 0, 2, 0 ],
      barre: []
    },
    {
      type: 'm7',
      position: 0,
      frets: [ 0, 3, 0, 2, 2, 0 ],
      barre: []
    }],
    'F': [{
      type: 'major',
      position: 0,
      frets: [ 1, 1, 2, 3, 3, 1 ],
      fingers: [ 1, 1, 2, 4, 3, 1 ],
      barre: [{ fret: 1, strings: [ 1, 6 ] }]
    }],
    'G': [{
      type: 'major',
      position: 0,
      frets: [ 3, 3, 0, 0, 2, 3 ],
      fingers: [ 4, 0, 0, 0, 2, 3 ],
      barre: []
    },
    {
      type: '7',
      position: 0,
      frets: [ 1, 0, 0, 0, 2, 3 ],
      barre: []
    }],
    'A': [{
      type: 'major',
      position: 0,
      frets: [ 0, 2, 2, 2, 0, -1 ],
      fingers: [ 0, 4, 3, 2, 0, 0 ],
      barre: []
    },
    {
      type: 'minor',
      position: 0,
      frets: [ 0, 1, 2, 2, 0, -1 ],
      barre: []
    },
    {
      type: '7',
      position: 0,
      frets: [ 1, 0, 0, 0, 2, 3 ],
      barre: []
    },
    {
      type: 'm7',
      position: 0,
      frets: [ 0, 1, 0, 2, 0, -1 ],
      barre: []
    }],
    'B': [{
      type: 'major',
      position: 0,
      frets: [ 2, 4, 4, 4, 2, -1 ],
      fingers: [ 1, 4, 3, 2, 1 ],
      barre: [{ fret: 2, strings: [ 1, 5 ] }]
    }]
  }
}
