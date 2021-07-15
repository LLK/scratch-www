const defaults = require('lodash.defaults');
const gitsha = require('git-bundle-sha');
const path = require('path');
const webpack = require('webpack');

// Plugins
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// PostCss
const autoprefixer = require('autoprefixer');

let routes = require('./src/routes.json');
const templateConfig = require('./src/template-config.js'); // eslint-disable-line global-require

if (process.env.NODE_ENV !== 'production') {
    routes = routes.concat(require('./src/routes-dev.json')); // eslint-disable-line global-require
}

routes = routes.filter(route => !process.env.VIEW || process.env.VIEW === route.view);

const pageRoutes = routes.filter(function (route) {
    return !route.redirect;
});
let VersionPlugin = function (options) {
    this.options = options || {};
    return this;
};

VersionPlugin.prototype.apply = function (compiler) {
    const addVersion = function (compilation, versionId, callback) {
        compilation.assets['version.txt'] = {
            source: function () {
                return versionId;
            },
            size: function () {
                return versionId.length;
            }
        };
        callback();
    };
    const options = this.options;

    compiler.plugin('emit', function (compilation, callback) {
        const sha = process.env.WWW_VERSION;
        if (!sha) { // eslint-disable-line no-negated-condition
            gitsha(options, function (err, _sha) {
                if (err) return callback(err);
                return addVersion(compilation, _sha, callback);
            });
        } else {
            return addVersion(compilation, sha, callback);
        }
    });
};

// Prepare all entry points
let entry = {};

pageRoutes.forEach(function (route) {
    entry[route.name] = [
        './src/init.js',
        `./src/views/${route.view}.jsx`
    ];
});

// Config
module.exports = {
    entry: entry,
    devtool: process.env.NODE_ENV === 'production' ? 'none' : 'eval',
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name].bundle.js'
    },
    resolve: {
        symlinks: false // Fix local development with `npm link` packages
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: [
                    path.resolve(__dirname, 'src'),
                    /node_modules[\\/]scratch-[^\\/]+[\\/]src/,
                    /node_modules[\\/]pify/,
                    /node_modules[\\/]async/
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [autoprefixer({browsers: ['last 3 versions', 'Safari >= 8', 'iOS >= 8']})];
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [autoprefixer({browsers: ['last 3 versions', 'Safari >= 8', 'iOS >= 8']})];
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|eot|svg|ttf|woff)$/,
                loader: 'url-loader'
            }
        ],
        noParse: /node_modules\/google-libphonenumber\/dist/
    },
    node: {
        fs: 'empty'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                common: {
                    chunks: 'all',
                    name: 'common',
                    minChunks: pageRoutes.length // Extract only chunks common to all html pages
                }
            }
        }
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new VersionPlugin({length: 5})
    ].concat(pageRoutes
        .map(function (route) {
            return new HtmlWebpackPlugin(defaults({}, {
                title: route.title,
                filename: route.name + '.html',
                route: route,
                dynamicMetaTags: route.dynamicMetaTags
            }, templateConfig));
        })
    ).concat([
        new CopyWebpackPlugin([
            {from: 'static'},
            {from: 'intl', to: 'js'}
        ]),
        new CopyWebpackPlugin([{
            from: 'node_modules/scratch-gui/dist/static/blocks-media',
            to: 'static/blocks-media'
        }]),
        new CopyWebpackPlugin([{
            from: 'node_modules/scratch-gui/dist/chunks',
            to: 'static/chunks'
        }]),
        new CopyWebpackPlugin([{
            from: 'node_modules/scratch-gui/dist/extension-worker.js'
        }]),
        new CopyWebpackPlugin([{
            from: 'node_modules/scratch-gui/dist/extension-worker.js.map'
        }]),
        new CopyWebpackPlugin([{
            from: 'node_modules/scratch-gui/dist/static/assets',
            to: 'static/assets'
        }]),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"' + (process.env.NODE_ENV || 'development') + '"',
            'process.env.API_HOST': '"' + (process.env.API_HOST || 'https://api.scratch.mit.edu') + '"',
            'process.env.RECAPTCHA_SITE_KEY': '"' +
                    (process.env.RECAPTCHA_SITE_KEY || '6Lf6kK4UAAAAABKTyvdSqgcSVASEnMrCquiAkjVW') + '"',
            'process.env.ASSET_HOST': '"' + (process.env.ASSET_HOST || 'https://assets.scratch.mit.edu') + '"',
            'process.env.BACKPACK_HOST': '"' + (process.env.BACKPACK_HOST || 'https://backpack.scratch.mit.edu') + '"',
            'process.env.CLOUDDATA_HOST': '"' + (process.env.CLOUDDATA_HOST || 'clouddata.scratch.mit.edu') + '"',
            'process.env.PROJECT_HOST': '"' + (process.env.PROJECT_HOST || 'https://projects.scratch.mit.edu') + '"',
            'process.env.STATIC_HOST': '"' + (process.env.STATIC_HOST || 'https://cdn2.scratch.mit.edu') + '"',
            'process.env.SCRATCH_ENV': '"' + (process.env.SCRATCH_ENV || 'development') + '"',
            'process.env.SENTRY_DSN': '"' + (process.env.SENTRY_DSN || '') + '"'
        })
    ])
        .concat(process.env.ANALYZE_BUNDLE === 'true' ? [
            new BundleAnalyzerPlugin()
        ] : [])
};
