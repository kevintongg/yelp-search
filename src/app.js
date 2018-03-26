const yelp = require('./index');
const inquirer = require('inquirer');

function search(location, category, term, number, radius, open_now) {
  if(open_now === 't'){
    open_now = true
  }else if(open_now ==='true'){
    open_now = true
  }
  else if(open_now === 'f'){
    open_now = false
  }else{
    open_now = false
  }
  if (term === true) {
    yelp.list()
    .then((result) => {
      const choices = [];
      const categories = JSON.parse(result);
      categories.forEach((category) => {
        choices.push(category.title);
      });
      return inquirer.prompt([{
        type: 'list',
        message: 'list of category',
        name: 'categories',
        choices,
      }])
    })
      .then((answer) => {
        term = answer.categories;
      })
      .then(() => {
        yelp.search(location, category, term, number, radius, open_now)
          .then((item) => {
            
            const json = JSON.parse(item);
            console.log('Total searches found: ', json.total)
            //console.log(json.total)
            if(json.total < 1){
              console.log('No businesses found!')
            }
            else{
              const business = [];
              json.businesses.forEach((item) => {
                let distance_miles = Math.ceil(item.distance/1609.34)
                business.push({
                  id: `${item.id}`,
                  name: `${item.name}`,
                  price: `${item.price}`,
                  distance:`${distance_miles}`,
                  location: `${item.location.address1}, ${item.location.city}, ${item.location.state} ${item.location.zip_code}`,
                  });
              });
              getReviews(business);
            }
          });
      });
  }else{
  yelp.search(location, category, term, number, radius, open_now)
    .then((item) => {
      const json = JSON.parse(item);
      console.log('Total searches found: ', json.total)
      if(json.total < 1){
        console.log('No businesses found!')
      }
      else{
        const business = [];
        json.businesses.forEach((item) => {
          //console.log(item)
          let distance_miles = Math.ceil(item.distance/1609.34)
          business.push({
            id: `${item.id}`,
            name: `${item.name}`,
            price: `${item.price}`,
            distance:`${distance_miles}`,
            location: `${item.location.address1}, ${item.location.city}, ${item.location.state} ${item.location.zip_code}`,
          });
        });
        getReviews(business);
      }
    });
  }
}

function getReviews(businesses) {
  const choices = [];
  businesses.forEach((item) => {
    if (item.price !== undefined) {
      choices.push({
        name: `${item.name}: ${item.location}, Price: ${item.price}, About ${item.distance} mile(s) away.`,
        value: `${item.id}`
      });
    } else {
      choices.push({
        name: `${item.name}: ${item.location}, About ${item.distance} mile(s) away.`,
        value: `${item.id}`
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
      reviews(businesses.find(business => business.id === answer.business));
    });
}

function reviews(business) {
  console.log(`Name: ${business.name}`);
  console.log(`Location: ${business.location}`);
  if (business.price !== undefined) {
    console.log(`Price: ${business.price}\n`);
  } 

  console.log('Reviews:');
  console.log('--------------------------------------------------');
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

function list() {
  yelp.list()
    .then((result) => {
      const choices = [];
      const categories = JSON.parse(result);
      categories.forEach((category) => {
        choices.push(category.title);
      });
      inquirer.prompt([{
        type: 'list',
        message: 'list of category',
        name: 'category',
        choices,
      }]);
    });
}

module.exports = {
  search,
  reviews,
  lookup,
  list,
};
