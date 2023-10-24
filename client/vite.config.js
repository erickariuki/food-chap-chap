import { defineConfig } from 'vite';

export default defineConfig({
  // other configuration options...
  optimizeDeps: {
    include: ['react', 'react-dom'], // Add any other dependencies you want to include here.
  },
  // Add a rule to handle .js files as JSX
  esbuild: {
    jsxInject: `import React from 'react'`, // Ensure React is in scope for JSX parsing
  },
});