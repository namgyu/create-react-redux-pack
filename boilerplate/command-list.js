const fs = require('fs');
const execSync = require('child_process').execSync;
const inquirer = require('inquirer');
const choiceSep = new inquirer.Separator();
const jobs = {
    type: 'list',
    name: 'job',
    message: 'Choose job.',
    default: 'build-wds',
    choices: [
        { name: '🛫  Webpack Dev Server (PORT: 3000)', value: 'build-wds', short: '\nRunning Webpack Dev Server(PORT 3000).' },
        { name: '🛫  Webpack Dev Server (PORT 3000) -> UI SERVER (PORT 8088) (PROXY)', value: 'build-wds-proxy', short: '\nRunning Webpack Dev Server(PORT 3000) -> UI SERVER (PORT 8088) (PROXY).' },
        { name: '🚀  Build JS(Production)', value: 'build-webpack', short: '\nBuild JS(Production)' },
        choiceSep,
        { name: '😢  Exit', value: 'exit', short: '\n' },
        choiceSep,
    ]
};
const stdioOption = { stdio : [0,1,2], maxBuffer : 1024 * 500 };

process.on('exit', () => console.log('\nBye~ 👋'));

inquirer.prompt([
    jobs
])
.then(({ job }) => {
    if (job === 'exit') {
        process.exit();
    } else if (job) {
        execSync(`npm run ${job}`, stdioOption);
    }
});
