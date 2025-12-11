import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ChordProParser, HtmlDivFormatter, TextFormatter } from 'chordsheetjs';
import 'chord-component';

/**
 * ChordPro Renderer Web Component
 *
 * A Lit-based web component for rendering ChordPro formatted songs with chord diagrams.
 *
 * @element chordpro-renderer
 *
 * @fires chords-changed - Fired when the list of chords changes
 * @fires instrument-changed - Fired when the selected instrument changes
 * @fires mode-changed - Fired when the display mode changes
 *
 * @example
 * ```html
 * <chordpro-renderer
 *   content="{title: Amazing Grace}\n[G]Amazing [C]grace..."
 *   instrument="Standard Ukulele"
 *   show-chords="true"
 *   chord-position="top"
 * ></chordpro-renderer>
 * ```
 */
@customElement('chordpro-renderer')
export class ChordProRenderer extends LitElement {
  static styles = css`
    @charset "UTF-8";

    /*
     * CSS Custom Properties (CSS Variables) for Styling Customization
     * ================================================================
     *
     * Override these variables to customize the appearance of the ChordPro renderer.
     *
     * Usage example:
     *
     * chordpro-renderer {
     *   --chord-color: red;
     *   --header-size: 2em;
     *   --viewer-bg: #ffffff;
     * }
     *
     * MAIN COMPONENT
     * --------------
     * --component-bg: Background color of the entire component (default: #2F3131)
     * --component-text: Text color for the component (default: #f8f8f8)
     * --component-font-family: Font family for the component (default: system fonts)
     * --component-font-size: Base font size (default: 1em)
     * --panel-padding: Padding around the main panel (default: 20px)
     *
     * SONG VIEWER AREA
     * ----------------
     * --viewer-bg: Background color of the song viewer (default: antiquewhite)
     * --viewer-text: Text color in the viewer (default: #2F3131)
     * --viewer-padding: Padding inside the viewer (default: 10px)
     * --viewer-text-font: Font family for text mode (default: monospace fonts)
     * --viewer-text-size: Font size for text mode (default: 14px)
     * --viewer-outline: Outline color for the viewer (default: rgba(248, 248, 248, 0.5))
     *
     * CHORD STYLING
     * -------------
     * --chord-color: Color of chord names (default: inherit)
     * --chord-size: Font size of chords (default: inherit)
     * --chord-weight: Font weight of chords (default: 600)
     * --chord-spacing: Space between chords (default: 10px)
     *
     * HEADERS AND CONTENT
     * -------------------
     * --header-size: Font size for h2 headers (default: 1.1em)
     * --header-color: Color of headers (default: inherit)
     * --header-margin-bottom: Margin below the header controls (default: 1rem)
     * --lyrics-color: Color of lyrics text (default: inherit)
     * --lyrics-size: Font size of lyrics (default: inherit)
     * --paragraph-spacing: Space between paragraphs (default: 1em)
     * --empty-line-height: Height of empty lines (default: 1em)
     * --row-line-height: Line height for song rows (default: 150%)
     *
     * UI CONTROLS
     * -----------
     * --controls-gap: Gap between control elements (default: 1rem)
     *
     * Mode Toggle:
     * --mode-toggle-bg: Background of mode toggle container (default: #4a5568)
     * --mode-toggle-radius: Border radius of mode toggle (default: 6px)
     * --mode-btn-padding: Padding for mode buttons (default: 6px 12px)
     * --mode-btn-color: Text color of mode buttons (default: #f8f8f8)
     * --mode-btn-font-size: Font size of mode buttons (default: 14px)
     * --mode-btn-active-bg: Background of active mode button (default: #3182ce)
     * --mode-btn-hover-bg: Background on hover (default: #2d3748)
     *
     * Instrument Select:
     * --label-font-size: Font size for labels (default: 14px)
     * --label-font-weight: Font weight for labels (default: 500)
     * --label-color: Color of labels (default: #f8f8f8)
     * --select-padding: Padding for select dropdown (default: 6px 12px)
     * --select-border-color: Border color of select (default: #4a5568)
     * --select-radius: Border radius of select (default: 6px)
     * --select-bg: Background of select (default: #2d3748)
     * --select-color: Text color of select (default: #f8f8f8)
     * --select-font-size: Font size of select (default: 14px)
     * --select-min-width: Minimum width of select (default: 150px)
     * --select-focus-border: Border color when focused (default: #3182ce)
     * --select-focus-shadow: Box shadow when focused (default: rgba(49, 130, 206, 0.1))
     *
     * Buttons:
     * --button-padding: Padding for buttons (default: 8px 16px)
     * --button-bg: Background of buttons (default: #3182ce)
     * --button-color: Text color of buttons (default: white)
     * --button-radius: Border radius of buttons (default: 6px)
     * --button-font-size: Font size of buttons (default: 14px)
     * --button-hover-bg: Background on hover (default: #2c5aa0)
     *
     * CHORD CHARTS SECTION
     * --------------------
     * --chord-charts-padding: Padding for chord charts section (default: 1rem)
     * --chord-charts-bg: Background of chord charts section (default: #4a5568)
     * --chord-charts-radius: Border radius of chord charts section (default: 8px)
     * --chord-charts-border: Border color of chord charts section (default: #2d3748)
     * --chord-list-top-margin: Bottom margin when chords are at top (default: 2rem)
     * --chord-list-bottom-margin: Top margin when chords are at bottom (default: 2rem)
     * --right-panel-width: Width of right chord panel (default: 300px)
     * --right-panel-margin: Left margin of right panel (default: 1rem)
     */

    :host {
      display: block;
      box-sizing: border-box;
      height: 100%;
      background-color: var(--component-bg, #2F3131);
      color: var(--component-text, #f8f8f8);
      font-family: var(--component-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol");
      font-size: var(--component-font-size, 1em);
    }

    .songsheet-panel {
      box-sizing: border-box;
      height: 100%;
      display: flex;
      flex-direction: column;
      margin: 0;
      max-height: 100%;
      min-height: 100%;
      padding: var(--panel-padding, 20px);
    }

    .chord-sheet-header {
      margin-bottom: var(--header-margin-bottom, 1rem);
      flex-shrink: 0;
    }

    .header-controls {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--controls-gap, 1rem);
      flex-wrap: wrap;
    }

    .mode-toggle {
      display: flex;
      background: var(--mode-toggle-bg, #4a5568);
      border-radius: var(--mode-toggle-radius, 6px);
      overflow: hidden;
    }

    .mode-btn {
      padding: var(--mode-btn-padding, 6px 12px);
      background: transparent;
      color: var(--mode-btn-color, #f8f8f8);
      border: none;
      cursor: pointer;
      font-size: var(--mode-btn-font-size, 14px);
      transition: background-color 0.2s;
    }

    .mode-btn.active {
      background: var(--mode-btn-active-bg, #3182ce);
    }

    .mode-btn:hover:not(.active) {
      background: var(--mode-btn-hover-bg, #2d3748);
    }

    .instrument-label {
      font-size: var(--label-font-size, 14px);
      font-weight: var(--label-font-weight, 500);
      color: var(--label-color, #f8f8f8);
    }

    .instrument-select {
      padding: var(--select-padding, 6px 12px);
      border: 1px solid var(--select-border-color, #4a5568);
      border-radius: var(--select-radius, 6px);
      background: var(--select-bg, #2d3748);
      color: var(--select-color, #f8f8f8);
      font-size: var(--select-font-size, 14px);
      min-width: var(--select-min-width, 150px);
    }

    .instrument-select:focus {
      outline: none;
      border-color: var(--select-focus-border, #3182ce);
      box-shadow: 0 0 0 3px var(--select-focus-shadow, rgba(49, 130, 206, 0.1));
    }

    .toggle-chords-btn {
      padding: var(--button-padding, 8px 16px);
      background: var(--button-bg, #3182ce);
      color: var(--button-color, white);
      border: none;
      border-radius: var(--button-radius, 6px);
      font-size: var(--button-font-size, 14px);
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .toggle-chords-btn:hover {
      background: var(--button-hover-bg, #2c5aa0);
    }

    .content-area {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      min-height: 0;
      overflow: hidden;
    }

    .main-content {
      flex: 1 1 auto;
      display: flex;
      min-height: 0;
      overflow: hidden;
    }

    .main-content:not(.has-right-chords) .chord-sheet-viewer {
      width: 100%;
    }

    .main-content.has-right-chords .chord-sheet-viewer {
      flex: 1 1 auto;
      min-width: 0;
    }

    .chord-charts-section {
      padding: var(--chord-charts-padding, 1rem);
      background: var(--chord-charts-bg, #4a5568);
      border-radius: var(--chord-charts-radius, 8px);
      border: 1px solid var(--chord-charts-border, #2d3748);
      flex-shrink: 0;
    }

    .chord-list-top {
      margin-bottom: var(--chord-list-top-margin, 2rem);
    }

    .chord-list-bottom {
      margin-top: var(--chord-list-bottom-margin, 2rem);
    }

    .chord-list-right {
      margin: 0;
      height: fit-content;
      max-height: 100%;
      overflow: auto;
    }

    .right-chord-panel {
      width: var(--right-panel-width, 300px);
      margin-left: var(--right-panel-margin, 1rem);
      flex-shrink: 0;
      overflow: auto;
    }

    .chord-sheet-viewer {
      background-color: var(--viewer-bg, antiquewhite);
      color: var(--viewer-text, #2F3131);
      overflow: auto;
      padding: var(--viewer-padding, 10px);
      white-space: pre;
    }

    .chord-sheet-viewer[data-mode=text] {
      font-family: var(--viewer-text-font, Inconsolata, Monaco, "Andale Mono", "Lucida Console", "Bitstream Vera Sans Mono", "Courier New", Courier, monospace);
      font-size: var(--viewer-text-size, 14px);
      outline-color: var(--viewer-outline, rgba(248, 248, 248, 0.5));
      transition: background-color 100ms ease-out;
      text-align: left;
    }

    .chord-sheet-viewer[data-mode=html] h2 {
      font-size: var(--header-size, 1.1em);
      color: var(--header-color, inherit);
    }

    .chord-sheet-viewer[data-mode=html] .chord {
      font-weight: var(--chord-weight, 600);
      color: var(--chord-color, inherit);
      font-size: var(--chord-size, inherit);
    }

    .chord-sheet-viewer[data-mode=html] .chord:not(:last-child) {
      padding-right: var(--chord-spacing, 10px);
    }

    .chord-sheet-viewer[data-mode=html] .empty-line {
      height: var(--empty-line-height, 1em);
    }

    .chord-sheet-viewer[data-mode=html] .paragraph {
      margin-bottom: var(--paragraph-spacing, 1em);
    }

    .chord-sheet-viewer[data-mode=html] .chord:after,
    .chord-sheet-viewer[data-mode=html] .lyrics:after {
      content: "​";
    }

    .chord-sheet-viewer[data-mode=html] .row {
      display: flex;
      line-height: var(--row-line-height, 150%);
    }

    .chord-sheet-viewer[data-mode=html] .lyrics {
      color: var(--lyrics-color, inherit);
      font-size: var(--lyrics-size, inherit);
    }

    /* Responsive design for right panel */
    @media (max-width: 768px) {
      .songsheet-panel[data-chord-position="right"] .main-content.has-right-chords {
        flex-direction: column;
      }

      .songsheet-panel[data-chord-position="right"] .right-chord-panel {
        width: 100%;
        margin-left: 0;
        margin-bottom: 1rem;
        order: -1;
      }

      .songsheet-panel[data-chord-position="right"] .main-content.has-right-chords .chord-sheet-viewer {
        width: 100%;
      }
    }
  `;

  @property({ type: String })
  content = '';

  @property({ type: String })
  instrument = 'Standard Ukulele';

  @property({ type: Boolean, attribute: 'show-chords' })
  showChords = false;

  @property({ type: String, attribute: 'chord-position' })
  chordPosition: 'top' | 'right' | 'bottom' = 'top';

  @property({ type: String })
  format: 'html' | 'text' = 'html';

  @state()
  private _mode: 'html' | 'text' = 'html';

  @state()
  private _showChordsInternal = false;

  @state()
  private _selectedInstrument = 'Standard Ukulele';

  private parser = new ChordProParser();
  private htmlFormatter = new HtmlDivFormatter();
  private textFormatter = new TextFormatter();

  private readonly availableInstruments = [
    'Standard Ukulele',
    'Baritone Ukulele',
    '5ths tuned Ukulele',
    'Standard Guitar',
    'Drop-D Guitar',
    'Standard Mandolin'
  ];

  connectedCallback() {
    super.connectedCallback();
    this._mode = this.format;
    this._showChordsInternal = this.showChords;
    this._selectedInstrument = this.instrument;
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('format')) {
      this._mode = this.format;
    }
    if (changedProperties.has('showChords')) {
      this._showChordsInternal = this.showChords;
    }
    if (changedProperties.has('instrument')) {
      this._selectedInstrument = this.instrument;
    }
  }

  private get formattedSheet(): string {
    if (!this.content) return '';
    try {
      const song = this.parser.parse(this.content);
      const formatter = this._mode === 'html' ? this.htmlFormatter : this.textFormatter;
      return formatter.format(song);
    } catch {
      return this._mode === 'html'
        ? '<div>Invalid ChordPro format</div>'
        : 'Invalid ChordPro format';
    }
  }

  private get extractedChords(): string[] {
    try {
      const song = this.parser.parse(this.content);
      const chords = new Set<string>();

      song.lines.forEach((line: any) => {
        line.items.forEach((item: any) => {
          if (item.chords && typeof item.chords === 'string') {
            const chordString = item.chords.trim();
            if (chordString) {
              chords.add(chordString);
            }
          }
        });
      });

      const chordArray = Array.from(chords).sort();

      // Dispatch event when chords change
      this.dispatchEvent(new CustomEvent('chords-changed', {
        detail: { chords: chordArray },
        bubbles: true,
        composed: true
      }));

      return chordArray;
    } catch (error) {
      console.error('Chord extraction error:', error);
      return [];
    }
  }

  private handleModeChange(mode: 'html' | 'text') {
    this._mode = mode;
    this.dispatchEvent(new CustomEvent('mode-changed', {
      detail: { mode },
      bubbles: true,
      composed: true
    }));
  }

  private handleInstrumentChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this._selectedInstrument = select.value;
    this.dispatchEvent(new CustomEvent('instrument-changed', {
      detail: { instrument: this._selectedInstrument },
      bubbles: true,
      composed: true
    }));
  }

  private toggleChords() {
    this._showChordsInternal = !this._showChordsInternal;
  }

  private renderChordList() {
    if (!this._showChordsInternal || this.extractedChords.length === 0) {
      return html``;
    }

    return html`
      <div class="chord-charts-section chord-list-${this.chordPosition}">
        <chord-list
          .chords=${JSON.stringify(this.extractedChords)}
          .instrument=${this._selectedInstrument}
        ></chord-list>
      </div>
    `;
  }

  render() {
    const hasRightChords =
      this.chordPosition === 'right' &&
      this._showChordsInternal &&
      this.extractedChords.length > 0;

    return html`
      <div class="songsheet-panel" data-chord-position=${this.chordPosition}>
        <div class="chord-sheet-header">
          <div class="header-controls">
            <div class="mode-toggle">
              <button
                class="mode-btn ${this._mode === 'html' ? 'active' : ''}"
                @click=${() => this.handleModeChange('html')}
              >
                Formatted
              </button>
              <button
                class="mode-btn ${this._mode === 'text' ? 'active' : ''}"
                @click=${() => this.handleModeChange('text')}
              >
                Text
              </button>
            </div>

            ${this._showChordsInternal ? html`
              <label for="instrument-select" class="instrument-label">Instrument:</label>
              <select
                id="instrument-select"
                .value=${this._selectedInstrument}
                @change=${this.handleInstrumentChange}
                class="instrument-select"
              >
                ${this.availableInstruments.map(inst => html`
                  <option value=${inst}>${inst}</option>
                `)}
              </select>
            ` : ''}

            <button
              class="toggle-chords-btn"
              @click=${this.toggleChords}
              aria-label="${this._showChordsInternal ? 'Hide' : 'Show'} chord charts"
            >
              ${this._showChordsInternal ? 'Hide Chords' : 'Show Chords'}
            </button>
          </div>
        </div>

        <div class="content-area">
          ${this.chordPosition === 'top' ? this.renderChordList() : ''}

          <div class="main-content ${hasRightChords ? 'has-right-chords' : ''}">
            <div class="chord-sheet-viewer" data-mode=${this._mode}>
              ${this.formattedSheet
                ? this._mode === 'html'
                  ? html`<div .innerHTML=${this.formattedSheet}></div>`
                  : html`<pre>${this.formattedSheet}</pre>`
                : html`<div>No content</div>`
              }
            </div>

            ${this.chordPosition === 'right' && this._showChordsInternal && this.extractedChords.length > 0 ? html`
              <div class="right-chord-panel">
                ${this.renderChordList()}
              </div>
            ` : ''}
          </div>

          ${this.chordPosition === 'bottom' ? this.renderChordList() : ''}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chordpro-renderer': ChordProRenderer;
  }
}
