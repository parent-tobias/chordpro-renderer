// Main component export
export { ChordProRenderer } from './chordpro-renderer.js';

// Utility exports for advanced usage
export {
  parseChords,
  chordToNotes,
  chordOnInstrument,
  findBase,
  scaleTones,
  instruments,
  keys,
  notes,
  chords,
  scales,
  chordsPerScale
} from './utils/musicUtils.js';

export { systemDefaultChords } from './utils/systemDefaultChords.js';

// Type exports
export type { Finger } from 'svguitar';
