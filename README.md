Yelp Search
============

Introduction
-------------

**CS4220 Midterm Project**

**Members:**
* [Kevin Tong](https://github.com/kevintongg)
* [Cedric Tong](https://github.com/cedrictongg)
* [Daniel Kale](https://github.com/dkale29)
* [Maurice Mejia](https://github.com/thwips)
* [Christopher Ly](https://github.com/ly-c-christopher)

Uses the [Yelp Fusion API](https://www.yelp.com/fusion)'s [business endpoints](https://www.yelp.com/developers/documentation/v3/business) to search for content

Installation
-------------
If you do not have Node.js installed, you can download it here: [https://nodejs.org/en/]() 

Run `npm i` in your terminal to install dependencies.

To use this application, create your own API key at [https://www.yelp.com/developers/documentation/v3]() and create your own config.json:

```json
{
	"api_key": "<your API key here>",
	"url": "https://api.yelp.com/v3/businesses"
}
```
and include it in the `src/` directory.

License
--------
See [LICENSE](https://github.com/kevintongg/yelp-search/blob/master/LICENSE) file.
