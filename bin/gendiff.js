#!/usr/bin/env node

import getDiff from '../index.js';
import { Command } from 'commander';

const program = new Command();

program
    .argument('<filepath1>')
    .argument('<filepath2>')
    .description('Compares two configuration files and shows a difference.')
    .version('0.1.0', '-V, --version', 'output the version number')
    .option('-f, --format [type]', 'output format', 'stylish')
    .action((filepath1, filepath2) => {
        console.log(getDiff(filepath1, filepath2, program.opts().format))
    });

program.parse();