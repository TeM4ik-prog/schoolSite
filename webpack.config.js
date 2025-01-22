const path = require("path");
const WebpackObfuscator = require("webpack-obfuscator");
const WebPlugin = require("html-webpack-plugin")

//экспортируем объект конфигурации
module.exports = {
  //доп. плагины, которые можно применять к процессу сборки
  plugins: [
    new WebpackObfuscator({
      rotateStringArray: true,
    }),

  ],
  //production - оптимизация производительности и минимизация размера кода
  //development - скорость сборки и удобство отладки
  mode: "development",
  //точка входа в приложение, с которого начнётся процесс сборки
  entry: "./scripts/SendData.js",
  // выходной файл и путь для сохранения
  output: {
    filename: "./bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  //поддреживаемые расширения при импортах
  resolve: {
    extensions: [".ts", ".js"],
  },
  //настройка загрузчика
  module: {
    rules: [
      {
        test: /\.js$/,
        //обрабатываются с помощью загрузчика ts-loader
        use: "ts-loader",
        //не обрабатываем файлы из
        exclude: /n/,
      },
    ],
  },
  // devServer: {
  //   static: {
  //     directory: path.resolve(__dirname, "./scripts/SendData.js"),
  //   },
  //   port: 8000,
  //   hot: true,
  // },
};