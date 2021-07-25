module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    mocha: true
  },
  globals: {
    artifacts: 'readonly',
    contract: 'readonly',
    assert: 'readonly'
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
  }
}
