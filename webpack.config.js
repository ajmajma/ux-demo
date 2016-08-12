var path = require('path');
var webpack = require('webpack');



module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './client/app.jsx'
    ],
    output: {
        path: path.join(__dirname, 'client'),
        filename: 'bundle.js',
        publicPath: '/client/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [{
            test: /\.jsx$/,
            loaders: ['react-hot', 'babel-loader'],
            include: path.join(__dirname, 'client')
        },
        {
            test: /\.js$/,
            loaders: ['react-hot', 'babel-loader'],
            include: path.join(__dirname, 'client')
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
