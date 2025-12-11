# ChordPro Renderer

A Lit-based web component for rendering ChordPro formatted songs with interactive chord diagrams.

## Features

- Parse and render ChordPro formatted songs
- Display chord diagrams for multiple instruments (Ukulele, Guitar, Mandolin)
- Toggle between formatted HTML and plain text views
- Flexible chord diagram positioning (top, right, or bottom)
- Responsive design with mobile support
- Custom events for integration
- Built with Lit for performance and compatibility
- Depends on `chord-component` for chord diagram rendering

## Installation

[![npm 
version](https://badge.fury.io/js/chordpro-renderer.svg
)](https://www.npmjs.com/package/chordpro-renderer)
[![npm downloads](https://img.shields.io/npm/dm/chordpr
o-renderer.svg)](https://www.npmjs.com/package/chordpro
-renderer)

```bash
npm install chordpro-renderer
```

## Basic Usage

### In HTML

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module">
    import 'chordpro-renderer';
  </script>
</head>
<body>
  <chordpro-renderer
    content="{title: Amazing Grace}
{artist: Traditional}

[G]Amazing [C]grace how [G]sweet the sound
That [G]saved a [D]wretch like [G]me"
    instrument="Standard Ukulele"
    show-chords="true"
    chord-position="top"
  ></chordpro-renderer>
</body>
</html>
```

### In JavaScript/TypeScript

```javascript
import 'chordpro-renderer';

const renderer = document.createElement('chordpro-renderer');
renderer.content = `{title: Amazing Grace}
{artist: Traditional}

[G]Amazing [C]grace how [G]sweet the sound`;
renderer.instrument = 'Standard Guitar';
renderer.showChords = true;
renderer.chordPosition = 'right';

document.body.appendChild(renderer);
```

### In React

```jsx
import 'chordpro-renderer';

function SongViewer({ songContent }) {
  return (
    <chordpro-renderer
      content={songContent}
      instrument="Standard Ukulele"
      show-chords={true}
      chord-position="top"
    />
  );
}
```

### In Vue

```vue
<template>
  <chordpro-renderer
    :content="songContent"
    instrument="Standard Guitar"
    :show-chords="true"
    chord-position="right"
  />
</template>

<script setup>
import 'chordpro-renderer';
import { ref } from 'vue';

const songContent = ref(`{title: Example Song}
[G]Some [C]lyrics [D]here`);
</script>
```

### In Svelte

```svelte
<script>
  import 'chordpro-renderer';

  let songContent = `{title: Example Song}
[G]Some [C]lyrics [D]here`;
</script>

<chordpro-renderer
  content={songContent}
  instrument="Standard Ukulele"
  show-chords={true}
  chord-position="top"
/>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `content` | `string` | `''` | ChordPro formatted song content |
| `instrument` | `string` | `'Standard Ukulele'` | Instrument for chord diagrams |
| `show-chords` | `boolean` | `false` | Whether to display chord diagrams |
| `chord-position` | `'top' \| 'right' \| 'bottom'` | `'top'` | Position of chord diagrams |
| `format` | `'html' \| 'text'` | `'html'` | Display format (formatted HTML or plain text) |

### Available Instruments

- `'Standard Ukulele'`
- `'Baritone Ukulele'`
- `'5ths tuned Ukulele'`
- `'Standard Guitar'`
- `'Drop-D Guitar'`
- `'Standard Mandolin'`

## Events

The component dispatches custom events for integration with your application:

### `chords-changed`

Fired when the list of chords in the song changes.

```javascript
renderer.addEventListener('chords-changed', (e) => {
  console.log('Chords:', e.detail.chords);
  // e.detail.chords is an array of chord names like ['G', 'C', 'D']
});
```

### `instrument-changed`

Fired when the user selects a different instrument.

```javascript
renderer.addEventListener('instrument-changed', (e) => {
  console.log('New instrument:', e.detail.instrument);
});
```

### `mode-changed`

Fired when the user toggles between HTML and text mode.

```javascript
renderer.addEventListener('mode-changed', (e) => {
  console.log('New mode:', e.detail.mode);
  // e.detail.mode is either 'html' or 'text'
});
```

## ChordPro Format

ChordPro is a simple text format for writing chord charts. Here's a quick guide:

### Basic Syntax

```
{title: Song Title}
{artist: Artist Name}
{key: G}

[G]Lyrics with [C]chords [D]above [G]them
More lyrics on the [C]next line
```

### Directives

```
{title: Song Title}
{subtitle: Additional info}
{artist: Artist Name}
{composer: Composer Name}
{key: G}
{tempo: 120}
{time: 4/4}
{capo: 2}
```

### Sections

```
{start_of_chorus}
[G]This is the [C]chorus
{end_of_chorus}

{start_of_verse}
[G]This is a [C]verse
{end_of_verse}
```

### Comments

```
{comment: This is a comment that will be displayed}
{c: Short form of comment}
```

## Advanced Usage

### Accessing Music Utilities

The package also exports music utility functions for advanced use cases:

```javascript
import {
  parseChords,
  chordToNotes,
  instruments,
  systemDefaultChords
} from 'chordpro-renderer';

// Parse chords from ChordPro text
const chordMap = parseChords('[G]Some [C]lyrics [D7]here');

// Convert chord name to notes
const gMajor = chordToNotes('G');
console.log(gMajor); // { name: 'G', notes: ['G', 'B', 'D'] }

// Access instrument definitions
console.log(instruments);

// Access preset chord fingerings
console.log(systemDefaultChords['Standard Ukulele']['G']);
```

### Programmatic Control

```javascript
const renderer = document.querySelector('chordpro-renderer');

// Update content dynamically
renderer.content = newChordProContent;

// Change instrument
renderer.instrument = 'Standard Guitar';

// Toggle chord display
renderer.showChords = !renderer.showChords;

// Change position
renderer.chordPosition = 'right';
```

## Styling

The component uses Shadow DOM for style encapsulation, but provides extensive customization through CSS custom properties (CSS variables). You can override any of the 70+ available variables to match your design.

### Basic Styling Example

```css
chordpro-renderer {
  /* Component sizing */
  width: 100%;
  height: 600px;
  display: block;

  /* Customize colors */
  --chord-color: red;
  --header-color: darkblue;
  --viewer-bg: #ffffff;
  --viewer-text: #000000;
}
```

### Complete Color Theme Example

```css
chordpro-renderer {
  /* Main component colors */
  --component-bg: #1a1a2e;
  --component-text: #eee;

  /* Song viewer area */
  --viewer-bg: #ffffff;
  --viewer-text: #000000;

  /* Chords and content */
  --chord-color: #e94560;
  --chord-weight: 700;
  --header-color: #0f3460;
  --header-size: 1.5em;

  /* UI controls */
  --button-bg: #0f3460;
  --button-hover-bg: #16213e;
  --mode-toggle-bg: #16213e;

  /* Chord charts section */
  --chord-charts-bg: #16213e;
  --chord-charts-border: #0f3460;
}
```

### Typography Customization

```css
chordpro-renderer {
  --component-font-family: 'Georgia', serif;
  --chord-size: 1.2em;
  --chord-weight: 600;
  --lyrics-size: 1.1em;
  --header-size: 2em;
  --viewer-text-font: 'Fira Code', monospace;
}
```

### Available CSS Variables

#### Main Component
- `--component-bg` - Background color (default: `#2F3131`)
- `--component-text` - Text color (default: `#f8f8f8`)
- `--component-font-family` - Font family (default: system fonts)
- `--component-font-size` - Base font size (default: `1em`)
- `--panel-padding` - Padding around main panel (default: `20px`)

#### Song Viewer Area
- `--viewer-bg` - Viewer background (default: `antiquewhite`)
- `--viewer-text` - Viewer text color (default: `#2F3131`)
- `--viewer-padding` - Viewer padding (default: `10px`)
- `--viewer-text-font` - Font for text mode (default: monospace)
- `--viewer-text-size` - Font size for text mode (default: `14px`)
- `--viewer-outline` - Outline color (default: `rgba(248, 248, 248, 0.5)`)

#### Chord Styling
- `--chord-color` - Chord name color (default: `inherit`)
- `--chord-size` - Chord font size (default: `inherit`)
- `--chord-weight` - Chord font weight (default: `600`)
- `--chord-spacing` - Space between chords (default: `10px`)

#### Headers and Content
- `--header-size` - H2 header font size (default: `1.1em`)
- `--header-color` - Header color (default: `inherit`)
- `--header-margin-bottom` - Header bottom margin (default: `1rem`)
- `--lyrics-color` - Lyrics text color (default: `inherit`)
- `--lyrics-size` - Lyrics font size (default: `inherit`)
- `--paragraph-spacing` - Space between paragraphs (default: `1em`)
- `--empty-line-height` - Height of empty lines (default: `1em`)
- `--row-line-height` - Line height for rows (default: `150%`)

#### UI Controls
- `--controls-gap` - Gap between controls (default: `1rem`)

##### Mode Toggle Buttons
- `--mode-toggle-bg` - Toggle container background (default: `#4a5568`)
- `--mode-toggle-radius` - Border radius (default: `6px`)
- `--mode-btn-padding` - Button padding (default: `6px 12px`)
- `--mode-btn-color` - Button text color (default: `#f8f8f8`)
- `--mode-btn-font-size` - Button font size (default: `14px`)
- `--mode-btn-active-bg` - Active button background (default: `#3182ce`)
- `--mode-btn-hover-bg` - Hover background (default: `#2d3748`)

##### Instrument Select
- `--label-font-size` - Label font size (default: `14px`)
- `--label-font-weight` - Label font weight (default: `500`)
- `--label-color` - Label color (default: `#f8f8f8`)
- `--select-padding` - Select padding (default: `6px 12px`)
- `--select-border-color` - Border color (default: `#4a5568`)
- `--select-radius` - Border radius (default: `6px`)
- `--select-bg` - Background (default: `#2d3748`)
- `--select-color` - Text color (default: `#f8f8f8`)
- `--select-font-size` - Font size (default: `14px`)
- `--select-min-width` - Minimum width (default: `150px`)
- `--select-focus-border` - Focus border color (default: `#3182ce`)
- `--select-focus-shadow` - Focus shadow (default: `rgba(49, 130, 206, 0.1)`)

##### Buttons
- `--button-padding` - Button padding (default: `8px 16px`)
- `--button-bg` - Button background (default: `#3182ce`)
- `--button-color` - Button text color (default: `white`)
- `--button-radius` - Border radius (default: `6px`)
- `--button-font-size` - Font size (default: `14px`)
- `--button-hover-bg` - Hover background (default: `#2c5aa0`)

#### Chord Charts Section
- `--chord-charts-padding` - Section padding (default: `1rem`)
- `--chord-charts-bg` - Section background (default: `#4a5568`)
- `--chord-charts-radius` - Border radius (default: `8px`)
- `--chord-charts-border` - Border color (default: `#2d3748`)
- `--chord-list-top-margin` - Top position margin (default: `2rem`)
- `--chord-list-bottom-margin` - Bottom position margin (default: `2rem`)
- `--right-panel-width` - Right panel width (default: `300px`)
- `--right-panel-margin` - Right panel margin (default: `1rem`)

## Browser Support

Modern browsers that support:
- ES2020
- Web Components
- Custom Elements
- Shadow DOM

## Dependencies

- [Lit](https://lit.dev/) - Web component framework
- [chordsheetjs](https://github.com/martijnversluis/ChordSheetJS) - ChordPro parser and formatter
- [chord-component](https://www.npmjs.com/package/chord-component) - Chord diagram components

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
