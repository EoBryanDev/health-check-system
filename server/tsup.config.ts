import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*.ts', '!src/**/__tests__/*', '!src/**/*.spec.ts'], // Exclui pastas de teste e arquivos spec
  outDir: 'dist',
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  // Adiciona a exclusão para arquivos .sql e .http
  external: [
    '*.sql', // Exclui arquivos .sql
    '*.http', // Exclui arquivos .http
  ],
});
