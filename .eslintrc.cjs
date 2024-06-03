/* eslint-env node */

module.exports = {
  root: true,
  'env': {
    'node': true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  'rules': {
    'vue/no-parsing-error': 0,
    'vue/no-use-v-if-with-v-for': 'off',
    'vue/multi-word-component-names':'off',
    'no-extra-semi': 'error',
    'no-console': ['error', { 'allow': ['warn', 'error'] }],
    'quotes': [
      'error',
      'single',
      {
        'avoidEscape': true,
        'allowTemplateLiterals': true
      }
    ],
    'semi': [
      'error',
      'never'
    ],
    'indent': [
      'error',
      2,
      {
        'SwitchCase': 1,
        'flatTernaryExpressions': true
      }
    ],
    'comma-dangle': [
      'error',
      'never'
    ],
    'no-multi-spaces': ['error', {
      'ignoreEOLComments': true
    }],
    'space-infix-ops': 'error',
    'space-unary-ops': ['error', {
      'words': true, 
      'nonwords': false
    }],
    'space-before-function-paren': 'error'
  },
  'globals': {
    'config': true,
    'G6': true
  },
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
