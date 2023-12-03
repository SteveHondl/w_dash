var APIkey = "4a1b4ca6cde231990b27cb12f870fadc"


document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var cityName = document.getElementById('city-input').value.trim();
    
    if (cityName !== '') {
        console.log('City Name:', cityName);
        
    } else {
        console.log('Please enter a city name.');
    }
});