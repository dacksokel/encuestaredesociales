const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/public/js/dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [
        {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
    ]
  },
  resolve: {
    // alias: {
    //     'Vue': 'vue/dist/vue.esm-bundler.js',
    // },
    alias: {
        'Vue$': 'vue/dist/vue.esm.js'
      },
    extensions: ['*', '.js', '.vue', '.json']
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}
