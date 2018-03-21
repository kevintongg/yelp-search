const
  yelp = require('./index')
  inquirer = require('inquirer')

const search = (location, category, term, number) => {
  yelp.search(location, category, term, number).then(item => {
    let json = JSON.parse(item)
    let business = []
    json.businesses.forEach(item => {
      business.push({id: `${item.id}`,
                    name: `${item.name} located at: ${item.location.address1}, ${item.location.city} ${item.location.zip_code}`})
    })
    getReviews(business)
  })
}

const getReviews = (business) => {
  let choices = []
  business.forEach(item => {
    choices.push({name: `${item.name}`, value: `${item.id}`, checked: false})
  })
  return inquirer.prompt([{
    type: 'checkbox',
    message: 'select one business to get the three most recent reviews!',
    name: 'businesses',
    choices: choices,
    validate: (answer) => {
      if (answer.length > 1) {
        return 'choose only one business'
      }
      return true
    }
  }]).then(answers => {
    reviews(answers.businesses[0])
  })
}

const reviews = (id) => {
  yelp.reviews(id).then(result => {
    let json = JSON.parse(result)
    json.reviews.forEach(item => {
      console.log(`${item.rating} out of 5: ${item.text}`)
    })
  })
}

module.exports = {
  search,
  reviews
}
