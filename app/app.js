const
  yelp = require('../yelp');
  inquirer = require('inquirer');

const search = (location, category, term) => {
  console.log('Starting')
  yelp.search(location, category, term, 10)
}

module.exports = {
  search
}
