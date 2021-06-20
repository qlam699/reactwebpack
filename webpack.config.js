
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractplugin = require('mini-css-extract-plugin');

module.exports = {
    entry: [
        'regenerator-runtime/runtime',
        './src/index.js'
      ],
    // Where files should be sent once they are bundled
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index.bundle.js'
    },
    // webpack 5 comes with devServer which loads in development mode
    devServer: {
        port: 3000,
        watchContentBase: true,
        historyApiFallback: true,
    },
    devtool: 'inline-source-map',
    // Rules of how webpack will take our files, complie & bundle them for the browser 
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /nodeModules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(css|scss)$/,
                use: [MiniCssExtractplugin.loader, 'css-loader', "sass-loader"]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'images',
                },
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new MiniCssExtractplugin()
    ],
    resolve: {
        alias: {
            "@img": path.resolve(__dirname, 'src/assets/img/'),
        },
    },
}