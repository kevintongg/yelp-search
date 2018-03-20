const
  yelp = require('./index')
  inquirer = require('inquirer')

const search = (location, category, term, number) => {
  yelp.search(location, category, term, number)
}

const reviews = (business) => {
  console.log(business)
}

module.exports = {
  search,
  reviews
}
