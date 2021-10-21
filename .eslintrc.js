module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb', 'airbnb-typescript'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', 'prettier', '@typescript-eslint'],
  rules: {
    'import/prefer-default-export': 'off',
    'no-nested-ternary': 'off',
    'react/require-default-props': [
      'error',
      { forbidDefaultForRequired: true, ignoreFunctionalComponents: true },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    '@typescript-eslint/indent': ['off'],
    'object-curly-newline': ['off'],
    'array-bracket-spacing': ['error', 'never'],
    'react/default-props-match-prop-types': ['error'],
    'react/sort-prop-types': ['error'],
    'operator-linebreak': ["error", "before", { "overrides": { "=": "after"} }]
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
};
