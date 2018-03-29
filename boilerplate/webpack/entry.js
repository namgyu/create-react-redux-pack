const fs = require('fs');
const path = require('path');

function getEntry() {
    const entry = {};
    const cwd = process.cwd();

    fs.readdirSync(path.join(cwd, `src/js/entry/`)).map(_entry => {
        const name = path.parse(_entry).name;
        entry[name] = [path.resolve(__dirname, 'polyfills'), `entry/${name}`];
    });

    return entry;
}

module.exports = getEntry();
