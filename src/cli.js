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
        describe: 'radius around the selected location in METERS',
      })
      .option('o',{
        alias: 'open_now',
        describe: 'searches for businesses that are open; default is false',
      }),
    handler: (argv) => {
      app.search(argv.location, argv.category, argv.term, argv.number, argv.radius, argv.open_now);
    },
  })
  .help('help')
  .argv;
