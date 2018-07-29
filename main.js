const express = require('express');
const app = express();
// for use w/ multiple roots
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
require('dotenv').config({path: '.env'});

// middleware section
app.use('/', express.static(path.join(__dirname, '/public')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// server
app.listen(process.env.PORT || 3000, () => {
	console.log('app listening...');
});

// position being sent from client-side, w00t
app.post('/', (req, res) => {
	const lat = req.body.lat;
	const long = req.body.long;

	getCity(lat,long);
	getWeather(lat,long);

	// combine location w/ weather data
	const city = [];
	
	function getCity(lat, long) {
		var options = { method: 'GET',
		  url: 'https://maps.googleapis.com/maps/api/geocode/json',
		  qs: 
		   { latlng: `${lat},${long}`,
		     key: process.env.GEO_KEY} };

		request(options, function (error, response, body) {
		  if (error) throw new Error(error);
		  // console.log(body);
		  let cityData = JSON.parse(body);
		  // console.log(cityData);
		  // res.send(cityData);

		  /**
		  since you can't do multiple res.send()--
		  extracted data needed (location)--
		  to combine with weather data being sent client side 
		  **/
		  let {formatted_address: location} = cityData.results[1];
      location = location.split(',').slice(1).join(',');  
		  city.push(location);
		});
	}

	function getWeather(lat, long) {
		// don't forget to install request -_-
		// allows for http calls
		var options = {
		  url: `https://api.darksky.net/forecast/${process.env.DARK_SKY}/${lat}, ${long}`,
		  qs: { exclude: '[minutely,hourly,alerts]' },
		  headers: 
		   { 'Postman-Token': process.env.PT,
		     'Cache-Control': 'no-cache' } };

		request(options, function (error, response, body) {
		  if (error) throw new Error(error);
		  // console.log(body);
		  // body shoots out data, now to display on client side...
		  // this give info pretty JSON fashion/readable
		  let weatherData = JSON.parse(body);
		 	// res.send(weatherData);
		  city.push(weatherData);
		  res.send(city);
		});
	}
}); // end of post