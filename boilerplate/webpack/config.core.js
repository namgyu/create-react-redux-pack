const path = require('path');
const webpack = require('webpack');
const entry = require('./entry');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry,
    output: {
        path: path.resolve(__dirname, `../shared/js/bundle/`),
        filename: '[name].bundle.js'
    },
    resolve: {
        modules: [
            path.resolve(__dirname, `../src/js/`),
            'node_modules'
        ],
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
        }),
        new webpack.optimize.CommonsChunkPlugin('common')
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                enforce: 'pre',
                use: [
                    {
                        options: {
                            configFile: path.resolve(__dirname, '.eslintrc')
                        },
                        loader: 'eslint-loader'
                    }
                ],
                include: path.resolve(__dirname, `../src/js/`)
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]',
                }
            },
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, `../src/js/`),
                loader: 'babel-loader',
                options: {
                    compact: true,
                    presets: [
                        ["env", {
                            targets: {
                                ie: 9,
                                uglify: true,
                            },
                            useBuiltIns: false,
                            modules: false
                        }],
                        "react"
                    ],
                    plugins: [
                        "transform-es2015-destructuring",
                        "transform-class-properties",
                        ["transform-object-rest-spread", {
                            useBuiltIns: true
                        }],
                        ["transform-react-jsx", {
                            useBuiltIns: true
                        }],
                        ["transform-runtime", {
                            "helpers": false,
                            "polyfill": false,
                            "regenerator": true
                        }],
                        process.env.NODE_ENV === 'production' ?
                        (
                            ["transform-regenerator", {
                                async: false
                            }],
                            "syntax-dynamic-import"
                        )
                        : "dynamic-import-node"
                    ]
                }
            },
            {
                oneOf: [
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
                                            minimize: true
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
                                                        'not ie < 9'
                                                    ],
                                                    flexbox: 'no-2009'
                                                })
                                            ]
                                        }
                                    }
                                ]
                            })
                        )
                    },
                    {
                        loader: 'file-loader',
                        exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
                        options: {
                            name: '[name].[ext]',
                        }
                    }
                ]
            }
        ]
    }
};
