const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const wpServer = require('./config/client/wpServer.json');

module.exports = {
    entry: './public/app.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(woff|woff2|ttf|svg|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=node_modules/bootstrap/dist/fonts/[name].[ext]'
            }            
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: 'public'}
        ]),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: wpServer.port,
        hot: true,
        host: '127.0.0.1'
    },
    //used to make debugging "easier"
    devtool: 'inline-source-map' 
};