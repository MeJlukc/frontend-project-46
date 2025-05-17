#!/usr/bin/end node

const { program } = require('commander');

program
    .argument('<filepath1>')
    .argument('<filepath2>')
    .description('Compares two configuration files and shows a difference.')
    .version('0.1.0', '-V, --version', 'output the version number')
    .option('-f, --format [type]', 'output format');

program.parse(process.argv);

console.log('test');