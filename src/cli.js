const
  app = require('./app')
  yargs = require('yargs')

  const flags = yargs.usage('$0: Usage <cmd> [options]')
    .command({
      command: 'search',
      desc: 'searches for businesses',
      builder: (yargs) => {
        return yargs
        .options('l', {
          alias: 'location',
          describe: 'area to search',
          demandOption: true
        }).option('c', {
          alias: 'category',
          describe: 'type of food'
        }).option('t', {
          alias: 'term',
          describe: 'what kind of food you want to look up'
        })
        .option('n', {
          alias: 'number',
          describe: 'number of businesses to show; default is 5'
        })
      },
      handler: (argv) => {
        app.search(argv.location, argv.category, argv.term, argv.number)
      }
    })
    .help('help')
    .argv
