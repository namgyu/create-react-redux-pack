const argv = require('yargs').argv;
const whiteList = require('./whitelist');
const PROXY_PROTOCOL = argv.ssl ? 'https' : 'http';
const PROXY_HOST = 'localhost';
const PROXY_PORT = argv.port || 8088;
const proxy = {};

if (process.env.PROXY_UI_SERVER) {
    proxy["**"] = `${PROXY_PROTOCOL}://${PROXY_HOST}:${PROXY_PORT}`
} else {
    Object.keys(whiteList).map(domain => {
        whiteList[domain].map(uri => {
            proxy[uri] = {
                target: domain,
                changeOrigin: true
            }
        })
    });
}

module.exports = {
    open: true,
    publicPath: '/shared/js/bundle/',
    contentBase: 'public/',
    host: PROXY_HOST,
    inline: true,
    port: 3000,
    proxy
};
