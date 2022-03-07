const path = require('path')

const PORT = 3001

module.exports = {
  entry: path.resolve(__dirname, './src/app.js'),
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: PORT
  },
  output: {
    filename: 'survezy.js',
    library: {
      type: 'umd',
      name: 'survezy'
    },
    // prevent error: `Uncaught ReferenceError: self is not define`
    globalObject: 'this'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader']
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  }
}
