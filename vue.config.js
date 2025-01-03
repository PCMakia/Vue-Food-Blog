const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true, // Keep this property for transpiling dependencies
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true, // Enable Options API
        __VUE_PROD_DEVTOOLS__: false, // Disable devtools in production
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false, // Fix hydration mismatch error
      }),
    ],
  },
});
