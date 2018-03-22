const yelp = require('./index');
const inquirer = require('inquirer');

function search(location, category, term, number) {
  console.log('start:', category)
  if(category == true){
    const choices = ['Resturaunt', 'Bars', 'Food', 'Delivery', 'Takeout']
    return inquirer.prompt([{
      type: 'list',
      message: 'select a CATEGORY to get the three most recent reviews!',
      name: 'categories',
      choices,
    }])
    .then((answer) =>{
      category = answer.categories
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
    })
  } else {
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
}

function getReviews(business) {
  const choices = [];
  business.forEach((item) => {
    choices.push({
      name: `${item.name}`,
      value: `${item.id}`,
      checked: false,
    });
  });
  return inquirer.prompt([{
    type: 'list',
    message: 'select one business to get the three most recent reviews!',
    name: 'business',
    choices,
  }])
    .then((answer) => {
      reviews(business, answer);
    });
}

function reviews(business, answer) {
  let b = '';
  business.forEach((e, i) => {
    if (e.id === answer.business) {
      b = business[i];
    }
  });
  console.log(`Name: ${b.name}`);
  console.log(`Location: ${b.location}`);
  console.log('\nReviews:');
  yelp.reviews(b.id).then((result) => {
    const json = JSON.parse(result);
    json.reviews.forEach((business) => {
      console.log(`${business.rating}/5`);
      console.log(`${business.text}`);
      console.log('--------------------------------------------------');
    });
  });
}

module.exports = {
  search,
  reviews,
};
