module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb', 'airbnb-typescript', 'plugin:react-hooks/recommended', 'prettier'],
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
    'react/jsx-props-no-spreading': ['off'],
    '@typescript-eslint/indent': ['off'],
    'object-curly-newline': ['off'],
    'array-bracket-spacing': ['off'],
    'react/default-props-match-prop-types': ['error'],
    'react/sort-prop-types': ['error'],
    'operator-linebreak': ['off'],
    'implicit-arrow-linebreak': ['off'],
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.test.ts', '**/*.test.tsx', '**/testing/*'] },
    ],
    'no-param-reassign': ['error', { props: false }],
    '@typescript-eslint/no-use-before-define': 'off',
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
};
