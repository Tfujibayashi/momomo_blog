module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'react-hooks',
    'prettier',
    'import',
    'simple-import-sort',
    'unused-imports',
  ],
  rules: {
    indent: ['warn', 2, { SwitchCase: 1 }],
    'linebreak-style': ['warn', 'unix'],
    quotes: ['warn', 'single'],
    semi: ['warn', 'always'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-boolean-value': 'error',
    'react/jsx-curly-brace-presence': 'error',
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/typedef': 'error',
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false,
        },
      },
    ],
    'newline-before-return': 'error',
    'no-console': 'warn',
    'no-var': 'error',
    'unused-imports/no-unused-imports-ts': 'warn',
    'import/no-duplicates': 'warn',
    // https://github.com/lydell/eslint-plugin-simple-import-sort
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [['^react'], ['^@?\\w']],
      },
    ],
    'simple-import-sort/exports': 'warn',
  },
  overrides: [
    {
      files: ['src/hooks/*.ts'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
