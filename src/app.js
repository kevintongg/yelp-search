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
  }
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

function getReviews(businesses) {
  const choices = []
  businesses.forEach((business) => {
    choices.push({
      name: `${business.name}, Price: ${business.price}, About ${business.distance} mile(s) away.`,
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
  console.log(`Location: ${business.location}`)
  console.log(`Price: ${business.price}\n`)
  console.log('Reviews:')
  yelp.reviews(business.id).then((result) => {
    const json = JSON.parse(result)
    json.reviews.forEach((review) => {
      let date = review.time_created.split('-')
      let temp = date[2].split(' ')
      let formatedDate = date[1] + '/' + temp[0] +'/' + date[0] 

      console.log(`Rated ${review.rating}/5 by ${review.user.name} on ${formatedDate} `)
      console.log(`${review.text}`)
      console.log('--------------------------------------------------')
    })
  })
}

module.exports = {
  search,
  reviews,
};
