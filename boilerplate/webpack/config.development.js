const argv = require('yargs').argv;
const webpack = require('webpack');
const merge = require('webpack-merge');
const coreConfig = require('./config.core');
const devServer = require('./config.dev.server');

const entry = Object.keys(coreConfig.entry)
    .reduce((_entry, _entryPath) => {
        const devEntry = [
            'webpack/hot/dev-server'
        ];

        return Object.assign(_entry, {
            [_entryPath]: devEntry
        });
    }, {});

module.exports = merge(coreConfig, {
    devtool: 'cheap-module-source-map',
    entry,
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer
});
