const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./main.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/", 
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      // Regla para archivos TypeScript y TypeScript React
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // Regla para archivos JavaScript y JavaScript React
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      // Regla para archivos CSS
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: path.resolve(__dirname, '/'), 
      },
      // Regla para archivos de imágenes
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]',
        },
      },
      // Regla para archivos SVG
      {
        test: /\.svg$/i,
        type: 'asset/resource', 
        generator: {
          filename: 'assets/svg/[name][ext]', 
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
};