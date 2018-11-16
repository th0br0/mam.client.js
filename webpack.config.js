/* global __dirname, require, module*/

const webpack = require("webpack");
const path = require("path");
const env = require("yargs").argv.env; // use --env with webpack 2
const DeclarationBundlerPlugin = require('declaration-bundler-webpack-plugin');

var libraryName = "mam.";
var entry;
var outputFile;
var rules = [
  {
    test: /(\.jsx|\.js)$/,
    loader: "babel-loader",
    exclude: [/(node_modules|bower_components)/]
  },
  {
    test: /\.wasm$/,
    type: "javascript/auto",
    loaders: ["arraybuffer-loader"]
  },
  { test: /\.tsx?$/, loader: "ts-loader" }
];

const config = {
  entry: __dirname + "/src/index.ts",
  output: {
    path: __dirname + "/lib",
    filename: "mam.js",
    library: "mam",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  module: {
    strictExportPresence: true,
    rules: rules
  },
  //optimization: { minimize: true },
  resolve: {
    modules: [path.resolve("./node_modules"), path.resolve("./src")],
    extensions: [".json", ".js", ".ts"]
  },
    plugins: [
      new DeclarationBundlerPlugin({
        moduleName:'iota.mam',
        out:'mam.d.ts',
      })
    ],
  devtool: "source-map",
  target: env,
  node: {
    fs: "empty",
    child_process: "empty",
    path: "empty"
  }
};
module.exports = config;
