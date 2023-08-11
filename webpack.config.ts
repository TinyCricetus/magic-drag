import path from 'path'
import Webpack from 'webpack'
import HtmlPlugin from 'html-webpack-plugin'

const config: Webpack.Configuration = {
  mode: 'development',
  devtool: 'inline-source-map',

  entry: path.resolve(__dirname, './src/main.ts'),

  output: {
    path: path.resolve(__dirname, './dist'),
    clean: true
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader']
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  plugins: [
    new HtmlPlugin({
      template: path.resolve(__dirname, './public/index.html'),
      favicon: path.resolve(__dirname, './public/favicon.png')
    })
  ]
}

export default config