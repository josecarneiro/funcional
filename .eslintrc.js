module.exports = {
  extends: "@twiz/eslint-config-twiz",
  env: {
    mocha: true
  },
  rules: {
    'space-before-function-paren': [ 1, 'always' ],
    'no-trailing-spaces': 0,
    'indent': [ 1, 2, { 'MemberExpression': 0, 'SwitchCase': 1 }]
  }
};
