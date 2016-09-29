export default {
  strings: 6,
  tunnings: {
    standard: [ 'E', 'B', 'G', 'D', 'A', 'E' ]
  },
  chords: {
    'C': [{
      type: 'major',
      position: 0,
      strings: [ 0, 1, 0, 2, 3, -1 ],
      fingers: [ 0, 1, 0, 2, 3, 0 ],
      bars: []
    },
    {
      type: '7',
      position: 0,
      strings: [ 0, 1, 3, 2, 3, -1 ],
      bars: []
    }],
    'D': [{
      type: 'major',
      position: 0,
      strings: [ 2, 3, 2, 0, -1, -1 ],
      bars: []
    },
    {
      type: 'minor',
      position: 0,
      strings: [ 1, 3, 2, 0, -1, -1 ],
      bars: []
    },
    {
      type: '7',
      position: 0,
      strings: [ 2, 1, 2, 0, -1, -1 ],
      bars: []
    },
    {
      type: 'm7',
      position: 0,
      strings: [ 1, 1, 2, 0, -1, -1 ],
      bars: []
    }],
    'E': [{
      type: 'major',
      position: 0,
      strings: [ 0, 0, 1, 2, 2, 0 ],
      bars: []
    },
    {
      type: 'minor',
      position: 0,
      strings: [ 0, 0, 0, 2, 2, 0 ],
      bars: []
    },
    {
      type: '7',
      position: 0,
      strings: [ 0, 3, 1, 0, 2, 0 ],
      bars: []
    },
    {
      type: 'm7',
      position: 0,
      strings: [ 0, 3, 0, 2, 2, 0 ],
      bars: []
    }],
    'G': [{
      type: 'major',
      position: 0,
      strings: [ 3, 3, 0, 0, 2, 3 ],
      bars: []
    },
    {
      type: '7',
      position: 0,
      strings: [ 1, 0, 0, 0, 2, 3 ],
      bars: []
    }],
    'A': [{
      type: 'major',
      position: 0,
      strings: [ 0, 2, 2, 2, 0, -1 ],
      bars: []
    },
    {
      type: 'minor',
      position: 0,
      strings: [ 0, 1, 2, 2, 0, -1 ],
      bars: []
    },
    {
      type: '7',
      position: 0,
      strings: [ 1, 0, 0, 0, 2, 3 ],
      bars: []
    },
    {
      type: 'm7',
      position: 0,
      strings: [ 0, 1, 0, 2, 0, -1 ],
      bars: []
    }]
  }
}
