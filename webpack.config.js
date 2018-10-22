const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = (env, argv) => {
  argv = argv === void 0 ? {} : argv;
  const IS_DEV = argv.mode === 'development' || argv.mode === void 0;
  return {
    entry: {
      'main': './src/main.js',
      'pdf.worker': 'pdfjs-dist/build/pdf.worker.entry'
    },
    output: {
      filename: '[name].bundle.js',
      publicPath: '',
      path: path.resolve(__dirname, IS_DEV ? 'public' : 'dist')
    },
    module: {
      rules: [
        { test: /\.vue$/, use: ['vue-loader'] },
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        { test: /\.jpg$/, use: ['file-loader'] }
      ]
    },
    plugins: [
      new VueLoaderPlugin()
    ],
    resolve: {
      alias: { 
        'vue$': 'vue/dist/vue.esm.js',
        'vuex$': 'vuex/dist/vuex.esm.js',
        'vue-router$': 'vue-router/dist/vue-router.esm.js'
      }
    },
    mode: IS_DEV ? 'development' : 'production',
    devtool: IS_DEV ? 'source-map' : 'none',
    optimization: {
      minimize: IS_DEV ? false : true,
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public')
    }
  };
};