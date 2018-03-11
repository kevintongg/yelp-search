const app = require('./app');
const yargs = require('yargs');

const flags = yargs.usage('$0: Usage <cmd> [options]')
  .command({
    command: 'search',
    desc: 'Searches Yelp',
    alias: 's',
    handler: (argv) => {
    
    },
  })
  .help()
  .argv;
