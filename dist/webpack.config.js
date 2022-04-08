var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
var path = require('path');
var glob = require('glob');
var sass = require('sass');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var NyanProgressPlugin = require('nyan-progress-webpack-plugin');
var getEntries = function () {
    return glob
        .sync('./src/{scripts/pages,styles/pages}/**/!(_)*.{scss,js}')
        .reduce(function (entries, entry) {
        var _a;
        var key = entry
            .split('/')
            .pop()
            .replace(/.scss|.js/gi, '');
        var localEntries = __assign({}, entries);
        if (key in entries) {
            localEntries[key].push(entry);
        }
        else {
            localEntries = Object.assign(entries, (_a = {}, _a[key] = [entry], _a));
        }
        return localEntries;
    }, {});
};
var commonConfig = {
    entry: getEntries(),
    mode: 'development',
    watch: true,
    devtool: 'source-map',
    stats: {
        cached: false,
        cachedAssets: false,
        children: false,
        chunks: true,
        chunkOrigins: false,
        chunkModules: false,
        entrypoints: false,
        colors: true,
        env: true,
        modules: false,
        reasons: false,
        warnings: true,
    },
    output: {
        filename: 'js/[name].js',
        chunkFilename: '[name].bundle.js?ver=[chunkhash]',
        path: path.join(__dirname, '/dist/js'),
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js)?$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    fix: true,
                },
            },
            {
                test: /\.(js)?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'resolve-url-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: sass,
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: './../fonts',
                            useRelativePath: true,
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /.*fonts.*\.svg$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new FixStyleOnlyEntriesPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: '[id].css',
        }),
        new LiveReloadPlugin({
            protocol: 'http',
        }),
        new NyanProgressPlugin(),
    ],
};
module.exports = commonConfig;
