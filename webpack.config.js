const path = require("path");

module.exports = {
  target: "node",
  mode: "development",

  entry: {
    server: "./src/server/main.ts",
    client: "./src/client/main.ts",
  },

  output: {
    filename: "[name]/main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  resolve: {
    extensions: [".ts", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },

  // Important pour garder la structure des imports
  experiments: {
    outputModule: false,
  },
};
