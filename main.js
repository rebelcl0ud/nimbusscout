const express = require('express');
const app = express();
// for use w/ multiple roots
const path = require('path');
const bodyParser = require('body-parser');
var request = require('request');
require('dotenv').config({path: '.env'});

// middleware section
app.use('/', express.static(path.join(__dirname, '/public')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// server
app.listen(3000, () => {
	console.log('app listening...');
});

// position being sent from client-side, w00t
app.post('/', (req, res) => {
	const lat = req.body.lat;
	const long = req.body.long;

	getWeather(lat, long);
	res.send('POST req successful');
});

function getWeather(lat, long) {
	// don't forget to install request -_-
	// allows for http calls
	var options = { method: 'GET',
	  url: `https://api.darksky.net/forecast/${process.env.DARK_SKY}/${lat}, ${long}`,
	  qs: { exclude: '[minutely,hourly,alerts]' },
	  headers: 
	   { 'Postman-Token': process.env.PT,
	     'Cache-Control': 'no-cache' } };

	request(options, function (error, response, body) {
	  if (error) throw new Error(error);

	  // console.log(body);
	  // console.log(response);
	  // response shoots out data, now to display on client side...
	});
}
