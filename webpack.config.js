const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");

const entryPoints = {
  main: [
      path.resolve(__dirname, './', 'index.ts'),
      path.resolve(__dirname, './', 'plutonication-modal.scss')
  ],
};

module.exports = {
  mode: "production",
  entry: entryPoints,
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'plutonication.js',
    library: 'Plutonication',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      // {
      //   test: /\.(ts|tsx)$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-env', '@babel/preset-typescript'],
      //       plugins: ['@babel/plugin-proposal-export-default-from'],
      //     },
      //   },
      // },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
    },
      // {
      //   test: /\.(js|jsx)$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-env'],
      //     },
      //   },
      // },
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader'],
      //   include: path.resolve(__dirname, '/'), 
      // },
      {
        test: /\.(sa|sc)ss$/,
        use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
        ]
    },
      {
        test: /\.html$/,
        exclude: /node_modules/, // Excluimos los archivos HTML de ser procesados como módulos
        use: 'html-loader', // No necesitamos este loader realmente, solo lo usamos para que Webpack no arroje un error
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: '.', to: 'images', context: 'images' }],
      
  }),
    new MiniCssExtractPlugin({
        filename: '[name].css',
    }),

]
  // plugins: [new HtmlWebpackPlugin({ template: 'testing.html' })],
};
