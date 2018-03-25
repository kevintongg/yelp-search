const app = require('./app');
const yargs = require('yargs');

const flags = yargs.usage('$0: Usage <cmd> [options]')
  .command({
    command: 'search',
    desc: 'searches for businesses',
    builder: yargs => yargs
      .options('l', {
        alias: 'location',
        describe: 'area to search',
        demandOption: true,
      }).option('c', {
        alias: 'category',
        describe: 'type of food',
      }).option('t', {
        alias: 'term',
        describe: 'what kind of food you want to look up',
      })
      .option('n', {
        alias: 'number',
        describe: 'number of businesses to show; default is 5',
      })
      .option('r', {
        alias: 'radius',
        describe: 'radius around the selected location',
      }),
    handler: (argv) => {
      app.search(argv.location, argv.category, argv.term, argv.number, argv.radius);
    },
  })
  .help('help')
  .argv;
