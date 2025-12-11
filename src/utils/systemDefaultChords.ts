import type { Finger, Barre } from 'svguitar';

interface Dictionary<T> {
  [key: string]: T
}

type InstrumentDefault = {
  barres: Barre[]
  fingers: Finger[]
}

type Instrument = Dictionary<InstrumentDefault>

export const systemDefaultChords: Dictionary<Instrument> = {
  "Standard Ukulele": {
    "Cm": {
      "barres": [],
      "fingers": [
        [3,3],
        [2,3],
        [1,3]
      ]
    },
    "Cm7": {
      "barres": [{
        "fromString": 4,
        "toString": 1,
        "fret": 3,
        "text": "1"
      }],
      "fingers": []
    },
    "Cdim": {
      "barres": [],
      "fingers": [
        [4,2],
        [3,3],
        [2,2],
        [1,3]
      ]
    },
    "C9": {
      "barres": [],
      "fingers": [
        [3,2],
        [1,1]
      ]
    },
    "C#maj": {
      "barres": [{
        "fromString": 4,
        "toString": 1,
        "fret": 1,
      }],
      "fingers": [
        [1,4]
      ]
    },
    "C#7": {
      "barres": [{
        "fromString": 4,
        "toString": 1,
        "fret": 1,
      }],
      "fingers": [
        [1,2]
      ]
    },
    "C#m7": {
      "barres": [{
        "fromString": 4,
        "toString": 1,
        "fret": 4,
      }],
      "fingers": [
      ]
    },
    "C#dim": {
      "barres": [],
      "fingers": [
        [3,1],
        [1,1]
      ]
    },
    "C#6": {
      "barres": [{
        "fromString": 4,
        "toString": 1,
        "fret": 1,
      }],
      "fingers": []
    },
    "C#maj7": {
      "barres": [{
        "fromString": 4,
        "toString": 1,
        "fret": 1,
      }],
      "fingers": [
        [1,3]
      ]
    },
    "C#9": {
      "barres": [{
        "fromString": 4,
        "toString": 1,
        "fret": 1,
      }],
      "fingers": [
        [3,3],
        [1,2]
      ]
    },
    "Dbmaj": {
      "barres": [{
        "fromString": 4,
        "toString": 1,
        "fret": 1,
      }],
      "fingers": [
        [1,4]
      ]
    },
    "Db7": {
      "barres": [{
        "fromString": 4,
        "toString": 1,
        "fret": 1,
      }],
      "fingers": [
        [1,2]
      ]
    },
    "Dbm7": {
      "barres": [{
        "fromString": 4,
        "toString": 1,
        "fret": 4,
      }],
      "fingers": [
      ]
    },
    "Dbdim": {
      "barres": [],
      "fingers": [
        [3,1],
        [1,1]
      ]
    },
    "Db6": {
      "barres": [{
        "fromString": 4,
        "toString": 1,
        "fret": 1,
      }],
      "fingers": []
    },
    "Dbmaj7": {
      "barres": [{
        "fromString": 4,
        "toString": 1,
        "fret": 1,
      }],
      "fingers": [
        [1,3]
      ]
    },
    "Db9": {
      "barres": [{
        "fromString": 4,
        "toString": 1,
        "fret": 1,
      }],
      "fingers": [
        [3,3],
        [1,2]
      ]
    },
    "Dmaj": {
      "barres": [{
        "fromString": 4,
        "toString": 1,
        "fret": 2,
      }],
      "fingers": [
        [1,4]
      ]
    },
    "D7": {
      "barres": [{
        "fromString": 4,
        "toString": 1,
        "fret": 2,
      }],
      "fingers": [
        [1,3]
      ]
    },
    "Dm7": {
      "barres": [],
      "fingers": [
        [4,2],
        [3,2],
        [2,1],
        [1,3]
      ]
    },
    "Ddim": {
      "barres": [],
      "fingers": [
        [4,1],
        [3,2],
        [2,1],
        [1,2]
      ]
    },
    "D6": {
      "barres": [{
        "fromString": 4,
        "toString": 1,
        "fret": 2,
      }],
      "fingers": []
    },
    "Dmaj7": {
      "barres": [{
        "fromString": 4,
        "toString": 1,
        "fret": 2,
      }],
      "fingers": [
        [1,4]
      ]
    },
    "D9": {
      "barres": [{
        "fromString": 4,
        "toString": 1,
        "fret": 2,
      }],
      "fingers": [
        [3,4],
        [1,3]
      ]
    },
    "D#maj": {
      "barres": [],
      "fingers": [
        [4,3],
        [3,3],
        [2,3],
        [1,1]
      ]
    },
    "D#7": {
      "barres": [{
        "fromString": 4,
        "toString": 1,
        "fret": 3
      }],
      "fingers": [
        [1,4]
      ]
    },
    "D#m7": {
      "barres": [],
      "fingers": [
        [4,3],
        [3,3],
        [2,2],
        [1,4]
      ]
    },
    "D#dim": {
      "barres": [],
      "fingers": [
        [4,2],
        [3,3],
        [2,2],
        [1,3]
      ]
    },
    "D#aug": {
      "barres": [{
        "fromString": 4,
        "toString": 1,
        "fret": 1
      }],
      "fingers": [
        [4,2],
        [1,4]
      ]
    },
    "D#6": {
      "barres": [{
        "fromString": 4,
        "toString": 1,
        "fret": 3
      }],
      "fingers": []
    },
    "D#maj7": {
      "barres": [{
        "fromString": 4,
        "toString": 2,
        "fret": 3
      }],
      "fingers": []
    },
    "D#9": {
      "barres": [{
        "fromString": 3,
        "toString": 1,
        "fret": 1
      }],
      "fingers": []
    },
    "Ebmaj": {
      "barres": [],
      "fingers": [
        [4,3],
        [3,3],
        [2,3],
        [1,1]
      ]
    },
    "Eb7": {
      "barres": [{
        "fromString": 4,
        "toString": 1,
        "fret": 3
      }],
      "fingers": [
        [1,4]
      ]
    },
    "Ebm7": {
      "barres": [],
      "fingers": [
        [4,3],
        [3,3],
        [2,2],
        [1,4]
      ]
    },
    "Ebdim": {
      "barres": [],
      "fingers": [
        [4,2],
        [3,3],
        [2,2],
        [1,3]
      ]
    },
    "Ebaug": {
      "barres": [{
        "fromString": 4,
        "toString": 1,
        "fret": 1
      }],
      "fingers": [
        [4,2],
        [1,4]
      ]
    },
    "Eb6": {
      "barres": [{
        "fromString": 4,
        "toString": 1,
        "fret": 3
      }],
      "fingers": []
    },
    "Ebmaj7": {
      "barres": [{
        "fromString": 4,
        "toString": 2,
        "fret": 3
      }],
      "fingers": []
    },
    "Eb9": {
      "barres": [{
        "fromString": 3,
        "toString": 1,
        "fret": 1
      }],
      "fingers": []
    },

  }
}
