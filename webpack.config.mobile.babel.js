import path from 'path';
import webpack from 'webpack';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import DuplicatePackageCheckerPlugin from 'duplicate-package-checker-webpack-plugin';
import HappyPack from 'happypack';
import TerserPlugin from 'terser-webpack-plugin';

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const NODE_ENV = process.env.NODE_ENV ? 'production' : 'development';

const options = {
  mode: NODE_ENV,
  entry: {
    checkout: './mobile/checkout.js',
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '/dest/javascripts/mobile'),
    publicPath: '/javascripts/mobile',
    library: 'App',
    chunkFilename: '[name].bundle.js',
  },
  resolve: {
    modules: ['node_modules', path.join(__dirname, 'source')],
    alias: {
      'lodash-es': 'lodash',
      '@': path.resolve(__dirname, 'source'),
    },
  },
  context: path.resolve(__dirname, 'source/scripts'),
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](jquery)[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 7,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 7,
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
        cache: true,
        sourceMap: true,
      }),
    ],
  },
  module: {
    noParse: /\/node_modules\/(jquery|backbone)/,
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{ loader: 'happypack/loader' }],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      global: {},
    }),
    new CaseSensitivePathsPlugin(),
    // new BundleAnalyzerPlugin(),
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /a\.js|node_modules/,
      // add errors to webpack instead of warnings
      failOnError: true,
    }),
    new DuplicatePackageCheckerPlugin(),
    new HappyPack({
      loaders: [{
        loader: 'babel-loader',
        query: {
          babelrc: false
        }
      },],
    }),
  ],
};

export default options;

