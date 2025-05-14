const { program } = require('commander');

program
    .description('Compares two configuration files and shows a difference.')
    .version('0.1.0', '-V, --vesrion', 'output the version number')
    .option('-h, --help', 'display help for command');

program.parse(process.argv);