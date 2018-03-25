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
  .command({
    command: 'lookup',
    desc: 'enter a search term, the city, state, country to lookup businesss',
    builder: yargs => yargs
      .options('n', {
        alias: 'name',
        describe: 'name of the business to lookup',
        demandOption: true,
      })
      .options('a', {
        alias: 'address',
        describe: 'address line 1 of business to lookup',
      })
      .option('ci', { // not sure why yargs/inquirer does not pick up this parameter
        alias: 'city', // use full flag for usage
        describe: 'city of the business to lookup',
        demandOption: true,
      })
      .option('s', {
        alias: 'state',
        // https://en.wikipedia.org/wiki/ISO_3166-2
        describe: 'state of the business to lookup (maximum length of 3)',
        demandOption: true,
      })
      .option('c', { // not sure why yargs/inquirer does not pick up this parameter
        alias: 'country', // use full flag for usage
        // https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
        describe: 'country of the business to lookup (maximum length of 2, MUST BE CAPITALIZED)',
        demandOption: true,
      })
      .option('p', {
        alias: 'phone',
        describe: 'phone number of business to lookup',
        /**
         *
         * The phone number of the business which can be submitted as
         * (a) locally ­formatted with digits only (e.g., 016703080) or
         *
         * (b) internationally­ formatted with a leading + sign and digits
         * only after (+35316703080).
         *
         * */
      }),
    handler: (argv) => {
      app.lookup(argv.name, argv.address1, argv.city, argv.state, argv.country, argv.phone);
    },
  })
  .help('help')
  .argv;
