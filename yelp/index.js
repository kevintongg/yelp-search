const
  config = require('./config')
	request = require('request')

const fetch = (params) => {
	// qs = params in python
	return request.get({url: `${config.url}`, qs: params, headers: {'Authorization': `Bearer ${config.api_key}`}}, (err, res, body) => {
		res.setEncoding('utf-8')
		// let jsonString = JSON.stringify(res.body)
		let json = JSON.parse(res.body)
		console.log(json['businesses'])
	})
}

exports.search = (location, category, term, limit) => {
	params = {
		location: location,
		category: category,
		term: term,
		limit: limit,
		sort_by: 'rating'
	}
	return fetch(params)
}
