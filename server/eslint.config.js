import importPlugin from 'eslint-plugin-import';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';
import tsEslint from '@typescript-eslint/eslint-plugin';
import tsEslintParser from '@typescript-eslint/parser';

export default [
  {
  ignores: ['**/*.spec.ts', '**/*.spec.js'],
},
  {
    files: ['**/*.js', '**/*.ts'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
      parser: tsEslintParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      import: importPlugin,
      prettier: prettierPlugin,
      '@typescript-eslint': tsEslint,
    },
    rules: {
      // Regras que você quer que sejam a base
      'prettier/prettier': 'error',
      'no-console': 'off',
      'no-unused-vars': 'off', // Desativa a regra nativa
      'import/no-unresolved': 'off',
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: ['**/*.test.js', '**/*.spec.js'],
        },
      ],
      // Adiciona as regras recomendadas do TypeScript.
      // É importante que essa linha venha antes da sua configuração personalizada.
      ...tsEslint.configs.recommended.rules,

      // Configuração personalizada para no-unused-vars
      // Esta regra agora sobrescreve a regra no tsEslint.configs.recommended
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_', // Ignora variáveis que começam com underscore
          varsIgnorePattern: '^_', // Ignora variáveis declaradas com underscore
        },
      ],
    },
  },
  prettierConfig,
];