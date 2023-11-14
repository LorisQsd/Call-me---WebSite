/* eslint-env node */
module.exports = {
  ignorePatterns: ['postcss.config.js'],
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // must be the last one
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  overrides: [
    {
      files: ['src/**/store/**/*.ts'],
      rules: { 'no-param-reassign': ['error', { props: false }] },
    },
  ],
  plugins: [ '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      },
    ],
    'jsx-a11y/label-has-associated-control': [2, { assert: 'either' }],
    'linebreak-style': 0,
    'no-restricted-imports': 0,
  },
};
