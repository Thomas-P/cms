/// <reference types="vitest" />
import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import * as path from 'node:path';

export default defineConfig(() => ({
  plugins: [
    angular({
      jit: false,
      tsconfig: './projects/editor/feature-overview/tsconfig.spec.json',
      workspaceRoot: path.resolve(__dirname, './'), // Monorepo Root
    }),
    viteTsConfigPaths(),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
  },
}));
