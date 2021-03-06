// https://api.darksky.net/forecast/[key]/[latitude],[longitude]
const $ = require('jquery');

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
        if(response.length < 2) {
          document.querySelector('.location').innerHTML = 'Mmm... looks like nimbus is being tempermental, try a refresh.';
        } 
        else {
          // city
          const location = response[0];        
          document.querySelector('.location').innerHTML = location; 

          // weather
          const { temperature: currentTemp, apparentTemperature: feelsLike, icon: tempIcon } = response[1].currentWeatherData; 
          const tempIconEdit = tempIcon.replace(/-/g, ' '); // this takes out dashes for descriptive output under skycon
          const dailySummary = response[1].dailyWeatherDataSummary;
        
          function celsiusConvert() {
            // C = (F - 32) / 1.8
            let cTemp = (currentTemp - 32) / 1.8;
            let cfeelsLike = (feelsLike - 32) / 1.8;
            
            cTemp = cTemp.toFixed(1);
            cfeelsLike = cfeelsLike.toFixed(1);
          
            return `<div class='tempIconDes'>
                      currently: ${tempIconEdit}
                    </div>
                    <br /> 
                      ${dailySummary}
                    <br /><br />
                    <br /><br />
                    <div class='actualTemp'>
                      ${cTemp}°C
                    </div>
                    <br />
                      Feels Like: ${cfeelsLike}°C`;   
          }

          function fahrenheitConvert() {
            // F = (C x 1.8) + 32
            const fTemp = currentTemp.toFixed(1);
            const ffeelsLike = feelsLike.toFixed(1);
            return `<div class='tempIconDes'>
                      currently: ${tempIconEdit}
                    </div>
                    <br /> 
                      ${dailySummary}
                    <br /><br />
                    <br /><br />
                    <div class='actualTemp'>
                      ${fTemp}°F
                    </div>
                    <br />
                      Feels Like: ${ffeelsLike}°F`;  
          }

          // FOR TOGGLE
          document.getElementById('f').innerHTML = fahrenheitConvert();
          document.getElementById('c').innerHTML = celsiusConvert();
          
          // SKYCONS
          /*global  Skycons:true*/
          const skycons = new Skycons({'color':'yellow'});
          let list = ['clear-day', 'clear-night', 'partly-cloudy-day', 'partly-cloudy-night', 'cloudy', 'rain', 'sleet', 'snow', 'wind', 'fog'];
          // console.log(list);
          for(let i = 0; i < list.length; i++) {
            if(tempIcon == list[i]) {
              skycons.set('weather-icon', list[i]);
            }
          }
          skycons.play();
        } // else
      } // success
    }); // ajax
  }); // navigation
} 
else {
  /* geolocation IS NOT available */
  document.querySelector('.location').innerHTML = 'geolocation NOT available'; 
}

// toggle button
$('#temp-button').on('click', function() {
  $('.weather').toggle();
});