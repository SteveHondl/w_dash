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

        // TODO: Update the UI with the weather data
      },
      error: function (error) {
        console.error('Error fetching data:', error);
      }
    });
  }
});
