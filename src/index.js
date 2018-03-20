const
  config = require('./config')
	request = require('request')

const fetch = (params, command) => {
	// qs = params in python
  if (command.toLowerCase() == 'search') {
    console.log('Searching')
    return request.get({url: `${config.url}/${command}`, qs: params, headers: {'Authorization': `Bearer ${config.api_key}`}}, (err, res, body) => {
      res.setEncoding('utf-8')
      let json = JSON.parse(res.body)
      console.log(json.businesses)
      if (json.businesses) {
        json.businesses.forEach(item => {
          console.log(item.name + ' located at: ' + item.location.address1 + ', ' + item.location.city, item.location.zip_code)
        })
      }
    })
  } else if (command.includes('reviews')) {
    console.log('Reviews')

  }
}

exports.search = (location, category, term, number = 5) => {
	let params = {
		location: location,
		category: category,
		term: term,
		limit: number,
		sort_by: 'rating'
	}
	return fetch(params, 'search')
}

exports.reviews = (business) => {
  // temp
  let id = 'so-cal-burgers-chill-and-grill-los-angeles'
  let params = {}
  return fetch(params, '${id}/reviews')
}
