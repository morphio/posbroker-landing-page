import configEslint from '@nexo-linters/eslint-config';

export default [
  ...configEslint,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        project: './tsconfig.eslint.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.eslint.json'],
        },
      },
    },
  },
  {
    ignores: [
      'public',
      '**/*.d.ts',
      '**/*.mjs',
      '.next/**/*',
      'src/app/(payload)/lp-admin/importMap.js',
      'src/migrations/index.ts',
    ],
  },
  {
    rules: {
      'compat/compat': 'off',
      'i18next/no-literal-string': 'off',
      'import/max-dependencies': 'off',
      '@typescript-eslint/return-await': 'off',
    },
  },
];
