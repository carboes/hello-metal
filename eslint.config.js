const { FlatCompat } = require('@eslint/eslintrc');
const prettierConfig = require('eslint-config-prettier');

const compat = new FlatCompat();

module.exports = [
  ...compat.extends('expo'),
  prettierConfig,
  {
    ignores: ['node_modules/**', '.expo/**', 'android/**', 'ios/**'],
  },
];
