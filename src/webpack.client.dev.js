const path = require('path'),
      webpack = require('webpack'),
      CopyWebpackPlugin = require('copy-webpack-plugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      {VueLoaderPlugin} = require('vue-loader')

function exclude (modules) {
  let pathSep = path.sep

  if (pathSep === '\\') {
    pathSep = '\\\\'
  }

  const moduleRegExps = modules
    .map(modName => new RegExp(`node_modules${pathSep}${modName}`))

  return modulePath => {
    if (/node_modules/.test(modulePath)) {
      for (let i = 0; i < moduleRegExps.length; i++) {
        if (moduleRegExps[i].test(modulePath)) {
          return false
        }
      }

      return true
    }

    return false
  }
}

module.exports = {
  mode: 'development',

  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true&timeout=1000&overlay=false',
    path.resolve(__dirname, './js/entry-client.js')
  ],

  output: {
    path: path.resolve(__dirname, '../dist/client/js/'),
    filename: 'main.js',
    publicPath: '/js/'
  },

  resolve: {
    unsafeCache: true,
    alias: {
      axios: 'axios/dist/axios.min'
    }
  },

  module: {
    rules: [
      {
        test: /\.vue?$/,
        loader: 'vue-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {loader: 'css-loader', options: {url: false}},
          'css-validator-loader',
          {loader: 'sass-loader', options: {outputStyle: 'expanded'}}
        ]
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {loader: 'css-loader', options: {url: false}},
          {loader: 'sass-loader', options: {outputStyle: 'expanded'}}
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: '../../client/index.html',
      template: './html/index.template.ejs',
      hash: false,
      inject: false
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      {from: './files/**/*', to: '../'},
      {from: './fonts/**/*', to: '../'},
      {from: './img/**/*', to: '../'}
    ]),
    new VueLoaderPlugin()
  ],

  performance: {
    maxEntrypointSize: 400000,
    assetFilter: assetFilename => assetFilename.endsWith('.js')
  },

  devtool: 'cheap-eval'
}