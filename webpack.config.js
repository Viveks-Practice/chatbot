// webpack.config.js
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/Chatbot.js",
  output: {
    filename: "ChatbotWidget.js",
    path: path.resolve(__dirname, "dist"),
    library: "ChatbotWidget",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "ChatbotWidget.css",
    }),
  ],
  externals: {}, // Empty the externals, ensuring React and ReactDOM are bundled
};
