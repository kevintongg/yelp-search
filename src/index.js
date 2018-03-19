const config = require('./config');
const request = require('request');

const fetch = params =>
  // qs = params in python
  request.get({
    url: `${config.url}`,
    qs: params,
    headers: {
      Authorization: `Bearer ${config.api_key}`,
    },
  }, (err, res, body) => {
    res.setEncoding('utf-8');
    // let jsonString = JSON.stringify(res.body)
    const json = JSON.parse(res.body);
    console.log(json.businesses);
  });

exports.search = (location, category, term, limit) => {
  params = {
    location,
    category,
    term,
    limit,
    sort_by: 'rating',
  };
  return fetch(params);
};
