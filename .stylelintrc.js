module.exports = {
  extends: [
    'stylelint-config-recommended-scss',
    'stylelint-config-recess-order',
    'stylelint-config-prettier',
    'stylelint-config-standard',
  ],
  rules: {
    'string-quotes': 'single',
    'at-rule-no-unknown': [true, { ignoreAtRules: ['include', 'mixin', 'each'] }],
    'import-notation': null,
    'font-family-no-missing-generic-family-keyword': null,
  },
};
