const
  config = require('./config')
	rp = require('request-promise')

const fetch = (params, command) => {
	// qs = params in python
  //console.log('Searching')
  return rp({url: `${config.url}/${command}`,
                 qs: params,
                 headers: {'Authorization': `Bearer ${config.api_key}`}})
                 .then(res => res)
}

exports.search = (location, category, term, number = 5) => {
	let params = {
		location: location,
		category: category,
		term: term,
		limit: number,
		sort_by: 'rating'
	}
  // https://api.yelp.com/v3/businesses/search
	return fetch(params, 'search')
}

exports.reviews = (id) => {
  params = {}
  // https://api.yelp.com/v3/businesses/{id}/reviews
  return fetch(params, `${id}/reviews`)
}
