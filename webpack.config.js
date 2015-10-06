var path = require('path');
var webpack = require('webpack');
var routes = require('./server/routes.json');
var buildEnv = require('./src/env.json');

// Prepare all entry points
var entry = {
    session: './src/session.js',
    main: './src/main.jsx'
};
routes.forEach(function (route) {
    if ( ! route.static ) {
        entry[route.view] = './src/views/' + route.view + '/' + route.view + '.jsx';
    }
});

// Config
module.exports = {
    entry: entry,
    devtool: 'source-map',
    externals: {
        'react': 'React',
        'react/addons': 'React'
    },
    output: {
        path: path.resolve(__dirname, 'build/js'),
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'jsx-loader',
                include: path.resolve(__dirname, 'src')
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
                include: path.resolve(__dirname, 'src')
            },
            {
                test: /\.scss$/,
                loader: 'style!css!autoprefixer-loader?browsers=last 3 versions!sass'
            },
            {
                test: /\.(png|jpg|gif|eot|svg|ttf|woff)$/,
                loader: 'url-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': Object.keys(buildEnv).reduce(function (env, key) {
                env[key] = JSON.stringify(process.env[key] || env[key]);
                return env;
            }, buildEnv)
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin()
    ]
};
