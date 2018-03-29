#!/usr/bin/env node

'use strict';

const fs = require('fs');
const fse = require('fs-extra');
const os = require('os');
const path = require('path');
const execSync = require('child_process').execSync;
const inquirer = require('inquirer');
const choiceSep = new inquirer.Separator();
const question = {
    type: 'list',
    name: 'answer',
    message: 'Do you want to install create-react-redux-pack',
    default: 'exit',
    choices: [
        choiceSep,
        { name: 'No', value: 'exit', short: '\n' },
        { name: 'Yes', value: 'yes', short: '\nInstalling create-react-redux-pack...' }
    ]
};
const stdioOption = { stdio : [0,1,2], maxBuffer : 1024 * 500 };

process.on('exit', () => console.log('\nBye~👋'));

inquirer
.prompt([question])
.then(({ answer }) => {
    if (answer === 'exit') {
        process.exit();
    }

    tmonReactStarter()
    .then(async manager => {
        await setBoilerplate();
        await install(manager);
    })
    .catch(e => {
        console.log('⛔️ ', e.msg);
    });
});

function setBoilerplate() {
    console.log('✅  Setting boilerplate...');

    fse.copySync(
        path.join(__dirname, '/boilerplate/'),
        path.join(process.cwd(), '/')
    );

    console.log('✅  Setted boilerplate successfully!');
}

function install(manager) {
    console.log('✅  Installing dependencies...');

    execSync(`${manager} install`);

    console.log('✅  Installed successfully!');
}

function shouldUseNpm() {
    console.log('✅  Checking npm...');

    try {
        execSync('npm --version');
        console.log('✅  Ok !');
        return true;
    } catch (e) {
        console.log('✅  Nope !');
        return false;
    }
}

function shouldUseYarn() {
    console.log('✅  Checking yarnpkg...');

    try {
        execSync('yarnpkg --version');
        console.log('✅  Ok !');
        return true;
    } catch (e) {
        console.log('✅  Nope !');
        return false;
    }
}

function tmonReactStarter() {
    return new Promise((resolve, reject) => {
        const useNpm = shouldUseNpm();
        const useYarn = useNpm ? false : shouldUseYarn();

        if (useNpm) {
            resolve('npm');
        } else if (useYarn) {
            resolve('yarn');
        } else {
            reject({
                msg: "⛔️ Please install package manager(https://yarnpkg.com/lang/en/ or https://nodejs.org/en/) !!! "
            })
        }
    });
}