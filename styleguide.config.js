const path = require('path');
module.exports = {
  styleguideDir: 'build/styleguide',
  ignore: [
    'build/**',
    'stories/**',
    '**/*.stories.*',

    // Default "ignore" globs below ------------------------------------------
    '**/__tests__/**',
    '**/*.test.{js,jsx,ts,tsx}',
    '**/*.spec.{js,jsx,ts,tsx}',
    '**/*.d.ts',
  ],
  components: [
    'src/component/**/*.{js,jsx,ts,tsx}',

    // Default "components" globs below --------------------------------------
    'src/components/**/*.{js,jsx,ts,tsx}',
  ],
  // From App.js
  require: [
    path.join(__dirname, 'node_modules/primereact/resources/themes/nova-light/theme.css'),
    path.join(__dirname, 'node_modules/primereact/resources/primereact.min.css'),
    path.join(__dirname, 'node_modules/primeicons/primeicons.css'),
    path.join(__dirname, 'node_modules/primeflex/primeflex.css'),
  ],
};
