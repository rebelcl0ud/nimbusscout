// https://api.darksky.net/forecast/[key]/[latitude],[longitude]
const $ = require('jquery');
// console.log('webpack config works!');


if ("geolocation" in navigator) {
  /* geolocation is available */
  navigator.geolocation.getCurrentPosition((position) => {
    // console.log(position);
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    $.ajax({
      url: '/',
      type: 'POST',
      data: {
        lat: latitude,
        long: longitude
      },
      success: (response) => {
        $('.location').html(latitude);
        console.log(response);
      }
    })
  });// this finds lat/ long position
} else {
  /* geolocation IS NOT available */
  $('.location').html('geolocation NOT available');
}
