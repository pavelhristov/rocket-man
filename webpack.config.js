const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: { 'app': './client/app.js' },
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false // resolve conflict with `CopyWebpackPlugin`
        }),
        new HtmlWebpackPlugin({
            title: 'rocket man',
            filename: 'index.html',
            template: 'client/index.html'
        }),
        new CopyWebpackPlugin([
            { from: 'client/assets/', to: 'assets/' }
        ])
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    }
};