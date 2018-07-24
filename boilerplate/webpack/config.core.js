const path = require('path');
const webpack = require('webpack');
const entry = require('./entry');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry,
    output: {
        path: path.resolve(__dirname, '../shared/js/bundle/'),
        filename: '[name].bundle.js'
    },
    resolve: {
        modules: [
            path.resolve(__dirname, '../src/js/'),
            'node_modules'
        ],
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new ExtractTextPlugin('css/[name].css'),
        new webpack.optimize.CommonsChunkPlugin('common')
    ],
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.(js|jsx)$/,
                enforce: 'pre',
                use: [
                    {
                        options: {
                        configFile: path.resolve(__dirname, '.eslintrc'),
                        },
                        loader: 'eslint-loader',
                    },
                ],
                include: path.resolve(__dirname, '../src/js/'),
            },
            {
                oneOf: [
                    // cdn을 사용하지 않고 bundle에 같이 포함시킨다면 file-loader 대신 아래와 같이 url-loader 사용
                    // {
                    //     test: /\.(bmp|gif|jpe?g|png)$/,
                    //     loader: 'url-loader',
                    //     options: {
                    //         limit:  10000, // 10kb
                    //         publicPath: 'img',
                    //         outputPath: 'css/img',
                    //         name: '[name].[ext]',
                    //     }
                    // },
                    // {
                    //   test: /\.(eot|svg|ttf|woff|woff2)$/,
                    //   loader: 'url-loader',
                    //   options: {
                    //       limit:  10000, // 10kb
                    //       publicPath: 'font',
                    //         outputPath: 'css/font',
                    //         name: '[name].[ext]',
                    //   }
                    // },
                    {
                        test: [/\.(mp3|wav)$/],
                        loader: 'file-loader',
                        options: {
                            outputPath: 'js',
                            name: '[name].[ext]',
                        },
                    },
                    {
                        test: /\.(bmp|gif|jpe?g|png)$/,
                        loader: 'file-loader',
                        options: {
                            publicPath: '../img',
                            outputPath: 'img',
                            name: '[name].[ext]',
                        },
                    },
                    {
                        test: /\.(eot|svg|ttf|woff|woff2)$/,
                        loader: 'file-loader',
                        options: {
                            publicPath: '../font',
                            outputPath: 'font',
                            name: '[name].[ext]',
                        },
                    },
                    {
                        test: /\.(js|jsx)$/,
                        include: path.resolve(__dirname, '../src/js/'),
                        loader: 'babel-loader',
                        options: {
                            compact: true,
                            presets: [
                                [
                                    'env',
                                    {
                                        targets: {
                                        uglify: true,
                                        },
                                        modules: false,
                                        debug: true,
                                    },
                                ],
                                'react',
                            ],
                            plugins: [
                                'transform-es2015-destructuring',
                                'transform-class-properties',
                                [
                                    'transform-object-rest-spread',
                                    {
                                        useBuiltIns: true,
                                    },
                                ],
                                [
                                    'transform-react-jsx',
                                    {
                                        useBuiltIns: true,
                                    },
                                ],
                                [
                                    'transform-runtime',
                                    {
                                        helpers: false,
                                        polyfill: false,
                                        regenerator: true,
                                    },
                                ],
                                process.env.NODE_ENV === 'production'
                                ? ([
                                    'transform-regenerator',
                                    {
                                        async: false,
                                    },
                                    ],
                                    'syntax-dynamic-import')
                                : 'dynamic-import-node',
                                'syntax-dynamic-import',
                            ],
                        },
                    },
                    {
                        test: /\.scss$/,
                        loader: ExtractTextPlugin.extract(
                            Object.assign({
                                fallback: {
                                    loader: 'style-loader',
                                    options: {
                                        hmr: false,
                                    },
                                },
                                use: [
                                    {
                                        loader: 'css-loader',
                                        options: {
                                        importLoaders: 2,
                                        minimize: true,
                                        },
                                    },
                                    {
                                        loader: 'postcss-loader',
                                        options: {
                                            ident: 'postcss',
                                            plugins: () => [
                                                require('postcss-flexbugs-fixes'),
                                                autoprefixer({
                                                    browsers: [
                                                        '>1%',
                                                        'last 4 versions',
                                                        'Firefox ESR',
                                                        'not ie < 9',
                                                    ],
                                                    flexbox: 'no-2009',
                                                }),
                                            ],
                                        },
                                    },
                                    {
                                        loader: 'sass-loader',
                                    },
                                ],
                            })
                        ),
                    },
                    {
                        test: /\.css$/,
                        loader: ExtractTextPlugin.extract(
                            Object.assign({
                                fallback: {
                                    loader: 'style-loader',
                                    options: {
                                        hmr: false,
                                    },
                                },
                                use: [
                                    {
                                        loader: 'css-loader',
                                        options: {
                                        importLoaders: 1,
                                        minimize: true,
                                        },
                                    },
                                    {
                                        loader: 'postcss-loader',
                                        options: {
                                            ident: 'postcss',
                                            plugins: () => [
                                                require('postcss-flexbugs-fixes'),
                                                autoprefixer({
                                                    browsers: [
                                                        '>1%',
                                                        'last 4 versions',
                                                        'Firefox ESR',
                                                        'not ie < 9',
                                                    ],
                                                    flexbox: 'no-2009',
                                                }),
                                            ],
                                        },
                                    },
                                ],
                            })
                        ),
                    },
                    {
                        loader: 'file-loader',
                        exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
                        options: {
                            name: 'assets/[name].[ext]',
                        },
                    },
                ],
            },
        ],
    },
};
