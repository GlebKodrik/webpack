const path = require('path')
const HTMLWebpackPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCss = require('optimize-css-assets-webpack-plugin')
const Tarser = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

const optimization = () => {
  const config ={
    splitChunks: {
      chunks: 'all'
    }
  }
  if(isProd){
    config.minimizer = [
      new OptimizeCss(),
      new Tarser()
    ]
  }
  return config
}

const babelOptions = preset => {
  const opts = {
    presets: ['@babel/preset-env']
  }
  if(preset){
    opts.presets.push(preset)
  }
  return opts
}

module.exports = {
  context: path.resolve(__dirname , 'src'),
  //минимизирование файла не будет
  mode: 'development',
  //js файлики
  entry: {
    main: ['@babel/polyfill','./index.jsx'],
    analytics: './analytics.ts'
  },
  devServer: {
    port: 4200,
  },
  //куда складывать нашы buind
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname , 'dist')
  },
  //чтобы ге писать разрешения
  resolve: {
    extensions: ['.js' , ".png"]
  },
  devtool: isDev && 'source-map',
  //выносит библиотеку в отдельный vendor и потом ссылается на нее(чтобы постоянно не грузить нашу библиотеку)
  optimization: optimization(),
  //плагины подключаем
  plugins: [
    //нужен для соеденения нашего html и созданного html(с автоматическими подключенными скриптами)
    new HTMLWebpackPlugin({
      template: "./index.html",
      minify: {
        collapseWhitespace: isProd
      }
    }),
    //очистка устаревших файлов в dist
    new CleanWebpackPlugin(),
    //для копирования нашей иконки
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'src/Logo.ico'),
        to: path.resolve(__dirname, 'dist'),
      }],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].js",
    })
  ],
  module: {
    rules: [
      //для работы с стилями
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelOptions()
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelOptions("@babel/preset-typescript")
        }
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelOptions("@babel/preset-react")
        }
      },
      //для работы с файлами
      {
        test: /\.(png|svg|gif|jpg)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|woff)$/,
        use: ['file-loader']
      }
    ]
  }
}