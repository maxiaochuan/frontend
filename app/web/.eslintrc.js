const { eslint } = require('@mxcins/bedrock');

module.exports = {
  ...eslint,
  rules: {
    ...eslint.rules,
    'import/extensions': 0,
  },
};
