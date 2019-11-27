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
  dangerouslyUpdateWebpackConfig(webpackConfig, env) {
    if (process.env.CLOUDGUEST_AUTO_RELOAD !== '1') {
      // Do NOT hack the config unless we are running in development mode with
      // auto-reload.
      return webpackConfig;
    }

    const path = process.env.CLOUDGUEST_ADMIN_STYLEGUIDE_BASE;

    if (path) {
      console.log(`HACKING Styleguidist webpack configuration to work from alternate path: ${path}`);

      // Fix the hot-reload to be able to connect sockjs via the correct base
      // path.  This means we will need to replace the CRA webpack hot dev
      // client with the "stock client" (as per comments in the standard CRA
      // webpack config.
      console.log("Original 'entry' configuration:\n", webpackConfig.entry);

      webpackConfig.entry = webpackConfig.entry.filter(entry => !entry.endsWith('/webpackHotDevClient.js'));
      webpackConfig.entry = webpackConfig.entry.concat([
        require.resolve('webpack-dev-server/client') + '?sockPath=' + path + 'sockjs-node',
        require.resolve('webpack/hot/dev-server'),
      ]);

      console.log("Updated 'entry' configuration:\n", webpackConfig.entry);
    }

    return webpackConfig;
  },
};
