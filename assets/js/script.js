$(document).ready(function () {
var apiKey = `4a1b4ca6cde231990b27cb12f870fadc`;
var apiUrl = `https://api.openweathermap.org/data/2.5/forecast`;

$('#search-bar').submit(function (event) {
    event.preventDefault();

    var cityName = $('#city-input').val().trim();

    if (cityName !== '') {
      getWeatherData(cityName);
    }
});

function getWeatherData(cityName) {
    var apiUrlWithParams = `${apiUrl}?q=${cityName}&appid=${apiKey}`;

    // Use jQuery's AJAX to make the API request
    $.ajax({
      url: apiUrlWithParams,
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        // Log the data to the console
        console.log('Weather Data:', data);

      // Update the UI with the weather data
      $('#current-city').text(data.city.name);
      var tempFahrenheit = ((data.list[0].main.temp - 273.15) * 9/5 + 32).toFixed(2);
      $('#current-temp').text(tempFahrenheit + ` F\u00B0`);
      $('#current-wind').text(data.list[0].wind.speed + ` Wind Speed (MPH)`);
      $('#current-humidity').text(data.list[0].main.humidity + ` % Humidity`);

      updateForecast(data.list.slice(1, 6)); 

      },
      error: function (error) {
        console.error('Error fetching data:', error);
      }
    });
  }

function updateForecast(forecastData) {
      var currentDate = new Date();
    // Iterate through the forecast data and update the UI
    for (let i = 0; i < forecastData.length; i++) {
      currentDate.setDate(currentDate.getDate() + 1);
      var date = currentDate.toLocaleDateString();
      var temp = ((forecastData[i].main.temp - 273.15) * 9/5 + 32).toFixed(2);
      var wind = forecastData[i].wind.speed.toFixed(2);
      var humidity = forecastData[i].main.humidity.toFixed(2);
      $('#day-' + (i + 1) + '-date').text(date);
      $('#day-' + (i + 1) + '-temp').text(temp + `F\u00B0`);
      $('#day-' + (i + 1) + '-wind').text(wind + ` Wind Speed (MPH)`);
      $('#day-' + (i + 1) + '-humidity').text(humidity + ` % Humidity`);


  }
}}
);
