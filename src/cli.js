const app = require('./app');
const yargs = require('yargs');

const flags = yargs.usage('$0: Usage <cmd> [options]')
  .command({
    command: 'search',
    alias: 's',
    desc: 'searches for businesses',
    builder: yargs => yargs.options('l', {
      alias: 'location',
      describe: 'area to search',
    }).option('c', {
      alias: 'category',
      describe: 'type of food',
    }).option('t', {
      alias: 'term',
      describe: 'what kind of food you want to look up',
    }),
    handler: (argv) => {
      app.search(argv.location, argv.category, argv.term);
    },
  })
  .help('help')
  .argv;
