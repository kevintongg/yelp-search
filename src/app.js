const yelp = require('./index');
const inquirer = require('inquirer');

function search(location, category, term, number) {
  if (term === true) {
    const choices = ['Resturaunt', 'Bars', 'Food', 'Delivery', 'Takeout'];
    return inquirer.prompt([{
      type: 'list',
      message: 'select a CATEGORY to get the three most recent reviews!',
      name: 'categories',
      choices,
    }])
      .then((answer) => {
        term = answer.categories;
      })
      .then(() => {
        yelp.search(location, category, term, number)
          .then((item) => {
            const json = JSON.parse(item);
            const business = [];
            json.businesses.forEach((item) => {
              business.push({
                id: `${item.id}`,
                name: `${item.name}`,
                location: `${item.location.address1}, ${item.location.city}, ${item.location.state} ${item.location.zip_code}`,
              });
            });
            getReviews(business);
          });
      });
  }
  yelp.search(location, category, term, number)
    .then((item) => {
      const json = JSON.parse(item);
      const business = [];
      json.businesses.forEach((item) => {
        business.push({
          id: `${item.id}`,
          name: `${item.name}`,
          location: `${item.location.address1}, ${item.location.city}, ${item.location.state} ${item.location.zip_code}`,
        });
      });
      getReviews(business);
    });
}

function getReviews(businesses) {
  const choices = []
  businesses.forEach((business) => {
    choices.push({
      name: `${business.name}`,
      value: `${business.id}`
    })
  })
  return inquirer.prompt([{
    type: 'list',
    message: 'select one business to get the three most recent reviews!',
    name: 'business',
    choices
  }])
    .then((answer) => {
      reviews(businesses, answer)
    })
}

function reviews(businesses, answer) {
  let business = businesses.find(business => business.id === answer.business)
  
  console.log(`Name: ${business.name}`)
  console.log(`Location: ${business.location}\n`)
  console.log('Reviews:')
  yelp.reviews(business.id).then((result) => {
    const json = JSON.parse(result)
    json.reviews.forEach((review) => {
      console.log(`${review.rating}/5`)
      console.log(`${review.text}`)
      console.log('--------------------------------------------------')
    })
  })
}

module.exports = {
  search,
  reviews,
};
