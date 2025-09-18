export default {
  extends: ['@nexo-linters/stylelint'],
  plugins: ['stylelint-value-no-unknown-custom-properties'],
  defaultSeverity: 'error',
  ignoreFiles: ['**/node_modules/**', '**/dist/**', '**/*.css'],
};
