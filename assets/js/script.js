//Wait for document to be fully loaded before performing code
$(document).ready(function () {
//OpenWeatherMap API key
var apiKey = `4a1b4ca6cde231990b27cb12f870fadc`;
//API endpoint
var apiUrl = `https://api.openweathermap.org/data/2.5/forecast`;
//Event Listener  on the search button
$('#search-bar').submit(function (event) {
    event.preventDefault();
    //Get the trimmed value from the form
    var cityName = $('#city-input').val().trim();
    //Check if cityName is empty before making request
    if (cityName !== '') {
      //Run function to fetch weather data based on city name
      getWeatherData(cityName);
    }
});
//Function to fetch weather Data and update the UI
function getWeatherData(cityName) {
    //API URL with query parameters
    var apiUrlWithParams = apiUrl + '?q=' + cityName + '&appid=' + apiKey;

    // Use fetch to make the API request
    fetch(apiUrlWithParams)
      .then(response => {
          //Check if the network response is a success
          if (!response.ok) {
            //Throw Error response
             throw new Error(`Network response was not ok: ${response.status}`);
            }
            //parse the response as JSON and return
            return response.json();
    })
    .then(data => {
        
        console.log('Weather Data:', data);

        //Get the Current Date
        var currentDate = new Date();
        //Format the current date as a string for display
        var formattedDate = `(${currentDate.toLocaleDateString()})`;

      // Update the UI with the weather data
      //Current city and formatted date
      $('#current-city').text(`${data.city.name} ${formattedDate}`);
      //Calculate and convert the temperature to Fahrenheit from Kelvins.  
      //toFixed(2) adds 2 decimal places 
      //data.list[0] contains properties of temperature, wind speed, and humidity 
      var tempFahrenheit = ((data.list[0].main.temp - 273.15) * 9/5 + 32).toFixed(2);
      //Update the UI with the current temperature 
      $('#current-temp').text(tempFahrenheit + ` F\u00B0`);
      //Current Wind Speed
      $('#current-wind').text(data.list[0].wind.speed + ` Wind Speed (MPH)`);
      //Current Humidity percentage
      $('#current-humidity').text(data.list[0].main.humidity + ` % Humidity`);

      //update search history with most recent searched city
      updateSearchHistory(cityName);
      //update forecast in the UI for the next 5 days
      updateForecast(data.list.slice(1, 6)); 
      //clear the input field after a successful search
      $(`#city-input`).val(``);

      })
      .catch(error => {
        // Handle errors during an API request
        console.error('Error fetching data:', error);
    });
  }
//Function to update the 5 day forecast
function updateForecast(forecastData) {
      //Current date for reference
      var currentDate = new Date();
    // Iterate through the forecast data and update the UI
    for (let i = 0; i < forecastData.length; i++) {
      //Increase current date by increment of 1
      currentDate.setDate(currentDate.getDate() + 1);
      //Format the date as a string
      var date = currentDate.toLocaleDateString();
      //Calculate and format the temperature in Fahrenheit with 2 decimal places
      var temp = ((forecastData[i].main.temp - 273.15) * 9/5 + 32).toFixed(2);
      //Format wind speed with 1 decimal place
      var wind = forecastData[i].wind.speed.toFixed(1);
      //Formate humidity
      var humidity = forecastData[i].main.humidity;
      //Update UI elements for each day
      $('#day-' + (i + 1) + '-date').text(date);
      $('#day-' + (i + 1) + '-temp').text(temp + `F\u00B0`);
      $('#day-' + (i + 1) + '-wind').text(wind + ` Wind Speed (MPH)`);
      $('#day-' + (i + 1) + '-humidity').text(humidity + ` % Humidity`);
  }
}
;
//Function to update the search history in the UI with city name
function updateSearchHistory(cityName) {
  // Create a list item for the search history
  var listItem = $('<li>').text(cityName);

    // Add margin and hover effect styles
    listItem.css({
      'margin-bottom': '5px', 
      'cursor': 'pointer',
    });
  
    // Add hover effect
    listItem.hover(
      function() {
        // Change background color on hover
        $(this).css('background-color', '#e6e6e6');  
      },
      function() {
         // Reset background color when not hovering
        $(this).css('background-color', ''); 
      }
    );

  // Make the search history item clickable
  listItem.on('click', function () {
    getWeatherData(cityName);
  });

  // Add the list item to the top of the history list
  $('#search-history-list').prepend(listItem);
}
});
