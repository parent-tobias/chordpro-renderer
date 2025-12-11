import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.spec.ts', 'src/**/*.test.ts'],
      rollupTypes: true
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ChordProRenderer',
      formats: ['es', 'umd'],
      fileName: (format) => {
        if (format === 'es') return 'chordpro-renderer.js';
        if (format === 'umd') return 'chordpro-renderer.umd.cjs';
        return `chordpro-renderer.${format}.js`;
      }
    },
    rollupOptions: {
      external: ['lit', 'chord-component', 'chordsheetjs'],
      output: {
        globals: {
          lit: 'Lit',
          'chord-component': 'ChordComponent',
          chordsheetjs: 'ChordSheetJS'
        }
      }
    }
  }
});
