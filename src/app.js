const yelp = require('./index');
const inquirer = require('inquirer');

function search(location, category, term, number, radius) {
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
                price: `${item.price}`,
                location: `${item.location.address1}, ${item.location.city}, ${item.location.state} ${item.location.zip_code}`,
              });
            });
            getReviews(business);
          });
      });
  }
  yelp.search(location, category, term, number, radius)
    .then((item) => {
      const json = JSON.parse(item);
      const business = [];
      json.businesses.forEach((item) => {
        business.push({
          id: `${item.id}`,
          name: `${item.name}`,
          price: `${item.price}`,
          location: `${item.location.address1}, ${item.location.city}, ${item.location.state} ${item.location.zip_code}`,
        });
      });
      getReviews(business);
    });
}

function getReviews(businesses) {
  const choices = [];
  businesses.forEach((item) => {
    if (item.price !== undefined) {
      choices.push({
        name: `${item.name}: ${item.location}, Price: ${item.price}`,
        value: `${item.id}`,
        checked: false,
      });
    } else {
      choices.push({
        name: `${item.name}: ${item.location}`,
        value: `${item.id}`,
        checked: false
      });
    }
  });
  return inquirer.prompt([{
    type: 'list',
    message: 'select one business to get the three most recent reviews!',
    name: 'business',
    choices
  }])
    .then((answer) => {
      reviews(businesses, answer);
    });
}

function reviews(businesses, answer) {
  const business = businesses.find(business => business.id === answer.business);

  console.log(`Name: ${business.name}`);
  console.log(`Location: ${business.location}`);
  if (business.price !== undefined) {
    console.log(`Price: ${business.price}\n`);
  } else {
    console.log();
  }
  console.log('Reviews:');
  yelp.reviews(business.id).then((result) => {
    const json = JSON.parse(result);
    json.reviews.forEach((review) => {
      const date = review.time_created.split('-');
      const temp = date[2].split(' ');
      const formattedDate = date[1] + '/' + temp[0] + '/' + date[0];

      console.log(`Rated ${review.rating}/5 by ${review.user.name} on ${formattedDate}\n`);
      console.log(`${review.text}`);
      console.log('--------------------------------------------------');
    });
  });
}

function lookup(name, address1, city, state, country, phone) {
  yelp.lookup(name, address1, city, state, country, phone)
    .then((item) => {
      const json = JSON.parse(item);
      const businessList = [];
      json.businesses.forEach((item) => {
        businessList.push({
          id: `${item.id}`,
          name: `${item.name}`,
          location: `${item.location.address1}, ${item.location.city}, ${item.location.state} ${item.location.zip_code}`,
        });
      });
      getReviews(businessList);
    });
}


module.exports = {
  search,
  reviews,
  lookup,
};
