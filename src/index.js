const config = require('./config');
const rp = require('request-promise');

function fetch(params, command) {
  // qs = params in python
  return rp({
    url: `${config.url}/${command}`,
    qs: params,
    headers: {
      Authorization: `Bearer ${config.api_key}`,
    },
  })
    .then(response => response)
    .catch(error => console.error(error));
}

exports.search = (location, category, term, number = 5, radius) => {
  const params = {
    location,
    category,
    term,
    limit: number,
    sort_by: 'rating',
    radius,
  };
  // https://api.yelp.com/v3/businesses/search
  return fetch(params, 'search');
};

exports.reviews = (id) => {
  const params = {};
  // https://api.yelp.com/v3/businesses/{id}/reviews
  return fetch(params, `${id}/reviews`);
};

exports.lookup = (name, address1, city, state, country, phone) => {
  const params = {
    name,
    address1,
    city,
    state,
    country,
    phone,
  };
  // https://api.yelp.com/v3/businesses/matches/lookup
  return fetch(params, 'matches/lookup');
};
