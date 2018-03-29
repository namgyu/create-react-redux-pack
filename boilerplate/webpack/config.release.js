const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const coreConfig = require('./config.core');

module.exports = merge(coreConfig, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new UglifyJSPlugin({
           parallel: true,
           uglifyOptions: {
               output: {
                   quote_keys: true,
                   ascii_only: true,
                   keep_quoted_props: true
               }
           }
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
});
