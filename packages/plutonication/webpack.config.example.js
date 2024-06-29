const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "production",
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, '../example-dapp/lib'),
    filename: 'plutonication.js',
    library: 'Plutonication',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  resolve: {
    extensions: [".ts", ".js", ".html", ".scss"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript']
          },
        },
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: 'html-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './images'),
          to: path.resolve(__dirname, 'lib/images'),
        },
      ],
    }),
  ],
};
