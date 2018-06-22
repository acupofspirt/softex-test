const path = require('path'),
      webpack = require('webpack'),
      OptimizeJsPlugin = require('optimize-js-plugin'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      extractSCSS = new ExtractTextPlugin('../css/main.css', {allChunks: true}),
      CopyWebpackPlugin = require('copy-webpack-plugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
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
  mode: 'production',

  entry: path.resolve(__dirname, './js/entry-client.js'),

  output: {
    path: path.resolve(__dirname, '../dist/client/js'),
    filename: 'main.js'
  },

  resolve: {
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
        test: /\.html?$/,
        loader: 'html-minifier-loader',
        options: {
          caseSensitive: true,
          keepClosingSlash: true,
          collapseWhitespace: true,
          removeComments: true,
          sortAttributes: true,
          sortClassName: true,
          removeEmptyAttributes: true,
          conservativeCollapse: true
        }
      },
      {
        test: /\.js?$/,
        exclude: exclude(['v-img']),
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: extractSCSS.extract({
          fallback: 'style-loader',
          publicPath: '../',
          use: [
            'postcss-loader',
            'css-validator-loader',
            {loader: 'sass-loader', options: {outputStyle: 'expanded'}}
          ]
        })
      },
      {
        test: /\.css$/,
        use: extractSCSS.extract({
          fallback: 'style-loader',
          publicPath: '../',
          use: [
            'postcss-loader',
            {loader: 'sass-loader', options: {outputStyle: 'expanded'}}
          ]
        })
      }
    ]
  },

  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new UglifyJsPlugin({
      cache: false,
      sourceMap: false,
      parallel: 4,
      uglifyOptions: {
        ie8: false,
        safari10: true,
        ecma: 8,
        mangle: {
          eval: true,
          keep_classnames: false,
          keep_fnames: false,
          toplevel: true
        },
        compress: {
          ecma: 5,
          keep_infinity: true,
          keep_classnames: false,
          keep_fnames: true,
          negate_iife: false,
          passes: 2,
          toplevel: true,
          unsafe: true,
          unsafe_arrows: true,
          unsafe_comps: true,
          unsafe_Function: true,
          unsafe_math: true,
          unsafe_methods: true,
          unsafe_proto: true,
          unsafe_regexp: true
        },
        output: {
          comments: false,
          beautify: false,
          ecma: 5,
          indent_level: 0,
          indent_start: 0,
          quote_style: 1,
          semicolons: false,
          wrap_iife: true
        },
        warnings: false,
        keep_classnames: false,
        keep_fnames: false,
        toplevel: true
      }
    }),
    new OptimizeJsPlugin({sourceMap: false}),
    extractSCSS,
    new CopyWebpackPlugin([
      {from: './files/**/*', to: '../'},
      {from: './fonts/**/*', to: '../'},
      {from: './img/**/*', to: '../'}
    ]),
    new HtmlWebpackPlugin({
      filename: '../../client/index.html',
      template: './html/index.template.ejs',
      hash: true,
      inject: false
    }),
    new VueLoaderPlugin()
  ],

  performance: {
    maxEntrypointSize: 400000,
    assetFilter: assetFilename => assetFilename.endsWith('.js')
  },

  stats: {children: false}
}