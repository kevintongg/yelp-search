const
  yelp = require('./index')
  inquirer = require('inquirer')

const search = (location, category, term, number) => {
  yelp.search(location, category, term, number).then(item => {
    let json = JSON.parse(item)
    let business = []
    json.businesses.forEach(item => {
      business.push({id: `${item.id}`,
                    name: `${item.name}`, location: `${item.location.address1}, ${item.location.city} ${item.location.zip_code}`})
    })
    getReviews(business)
  })
}
//
const getReviews = (business) => {
  let choices = []
  business.forEach(item => {
    choices.push({name: `${item.name}`, value: `${item.id}`, checked: false})
  })
  return inquirer.prompt([{
    type: 'list',
    message: 'select one business to get the three most recent reviews!',
    name: 'business',
    choices: choices,
  }]).then(answer => {
    reviews(business, answer)
  })
}

const reviews = (business, answer) => {
  let bus = ''
  for(let i = 0; i < business.length; i++){
    if (business[i].id == answer.business)
      bus = business[i]

  }
  console.log('Business Name: ' + bus.name)
  console.log('Location: ' + bus.location)
  console.log('REVIEWS')
  console.log('--------------------------------------------------')
  yelp.reviews(bus.id).then(result => {
    let json = JSON.parse(result)
    json.reviews.forEach(item => {
      console.log(`${item.rating} out of 5: ${item.text}`)
      console.log('--------------------------------------------------')
    })
  })
}

module.exports = {
  search,
  reviews
}
