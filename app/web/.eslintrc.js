const { eslint } = require('@mxcins/bedrock');

module.exports = {
  ...eslint,
  rules: {
    ...eslint.rules,
    'import/extensions': 0,
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
  },
};
