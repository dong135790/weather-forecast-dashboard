// set main cards initial display to none so it does not appear empty upon first loading page
var currentWeather = document.querySelector('.current-weather');
currentWeather.style.display = 'none';
// create variable for section with forecast content
var forecastEl = document.querySelector('#forecast');
// set empty array to store all searched cities
var cities = [] 
var apiKey = "79026700d6d1fb2b065b0cdee07661c3" 
// set var city to value of localstorage('city')
var city = JSON.parse(localStorage.getItem('city'));
// set var for div containing past search btns
var pastSearchesEl = document.getElementById('past-searches');

// create function to build buttons beneath search form with city name pulled from local storage
var displayPastSearches = function () {
    for( var i = 0; i < city.length; i++) {
        var pastSearchBtn = document.createElement('button');
        pastSearchBtn.textContent = city[i];
        pastSearchBtn.value = city[i];
        pastSearchBtn.setAttribute('class', 'past-search-btn w-100 my-1 btn btn-lg btn-info');
        pastSearchesEl.appendChild(pastSearchBtn);
    }
}

// add conditional so past searches are only displayed upon initial loading if var city exists in local storage
if (city) {
    displayPastSearches();
}

// create function to add new cities to past search buttons using user input
var addToPastSearches = function (input) {
    var newPastSearch = document.createElement('button');
        newPastSearch.textContent = input;
        newPastSearch.value = input;
        newPastSearch.setAttribute('class', 'past-search-btn w-100 my-1 btn btn-lg btn-info');
        pastSearchesEl.appendChild(newPastSearch);
}

 // create function to fetch openweathermap current weather api 
var getApi = function (city) {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey + "&units=imperial";

    fetch(requestUrl)
    .then(function(response) {  
        // add conditional so if response.status is not found, it will alert user to enter in valid city name
          if (response.status === 404) {
            alert('Please enter valid City Name');
        }
        return response.json()
    })
    .then(function(data){
        console.log("Data: ", data)
        var searchForm = document.getElementById('search-form');
        // add class col-md so that search form shrinks and allows room for results
        searchForm.classList.add('col-md')
        // set data.coord to var coord so the city's coordinates are saved 
        var coord = data.coord; 
        // set lon and lat to separate variables to be used with forecast api
        var lon = coord.lon;
        var lat = coord.lat;
        var now = dayjs().format('MM-DD-YYYY');
        var iconCode = data.weather[0].icon;
        var iconEl = document.getElementById('icon');
        iconEl.src = ( 'https://openweathermap.org/img/wn/' + iconCode + '.png');

        // set textcontent for main card using data from api fetch
        var tempEl = document.getElementById('temp');
        var windEl = document.getElementById('wind');
        var humidityEl = document.getElementById('humidity');
        var mainCardHeader = document.getElementById('main-card-header');
        tempEl.textContent = "Temp: " + data.main.temp +" °F ";
        windEl.textContent = "Wind: " + data.wind.speed + ' MPH' ;
        humidityEl.textContent = "Humidity: " + data.main.humidity + ' %';
        mainCardHeader.textContent = data.name + ' ' + now;

        // display currentWeather
        currentWeather.style.display = null;
        // call function to get forecast for next 5 days
        getForecast(lat, lon);
    })
}

var getForecast = function (lat, lon) {
    // use coordinates from previous function to act as lat and lon for forecast api url
    var forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid="+ apiKey + "&units=imperial";
    fetch(forecastApiUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
        buildForecast(data);
    })
}

var buildForecast = function(data) {
    // use for loop to build forecastCards using data from fetch request;start at 6 so data is pulled from 3pm each day; increment by 8 so that pulls data from around noon each day for five days
    for (i=6; i <= data.list.length; i+=8) {
        // set variables to use for textContent defined as data pulled from api at each index position i 
        var forecastTemp = (data.list[i].main.temp);
        var forecastHum = (data.list[i].main.humidity);
        var forecastWind = (data.list[i].wind.speed);
        var dataDate = (data.list[i].dt_txt);
        var forecastIconCode = data.list[i].weather[0].icon;

        // slice dataDate and rejoin in forecastDate so that format matches same format as 'now' variable in main card
        var month = dataDate.slice(5, 7);
        var day = dataDate.slice(8, 10);
        var year = dataDate.slice(0, 4);
        var forecastDate = month + '-' + day + '-' + year;
        
        // create card elements
        var forecastTitle = document.querySelector('.forecast-title');
        var forecastCard = document.createElement('div');
        var cardEl = document.createElement('div');
        var forecastHeader = document.createElement('div');
        var forecastBody = document.createElement('div');
        var forecastIcon = document.createElement('img');
        var forecastListTemp = document.createElement('li');
        var forecastListHum = document.createElement('li');
        var forecastListWind = document.createElement('li');

        // set class for card elements and utilize bootstrap styling
        forecastCard.setAttribute('class', 'forecast-card col-12 col-md');
        cardEl.setAttribute('class', 'card text-white bg-info');
        forecastHeader.setAttribute("class","card-header");
        forecastBody.setAttribute('class','card-body h-100 list-style-type-none');
        // set icon src using specific icon code from data for each index position
        forecastIcon.src =( 'https://openweathermap.org/img/wn/' + forecastIconCode + '.png');

        // set textcontent to display info defined in beginning of function 
        forecastHeader.textContent = forecastDate;
        forecastListHum.textContent = "Humidity: " + forecastHum + " %";
        forecastListTemp.textContent = "Temp: " + forecastTemp + "°F";
        forecastListWind.textContent = "Wind: " + forecastWind + " MPH";
        forecastTitle.textContent= "5-Day Forecast:";

        // append elements to forecastEl section of html 
        forecastEl.appendChild(forecastCard);
        forecastCard.appendChild(cardEl);
        cardEl.appendChild(forecastHeader);
        cardEl.appendChild(forecastBody);
        forecastBody.appendChild(forecastListTemp);
        forecastBody.appendChild(forecastListHum);
        forecastBody.appendChild(forecastListWind);
        forecastHeader.appendChild(forecastIcon);
    }
}

// create function to clear content of forecast cards upon new searches
var clearForecastEl = function(){
      // clear out forecast cards from screen if user searches while cards are already present on the screen 
      if (document.querySelector('.forecast-card')){
        forecastEl.innerHTML = null;
    }
}
  
// add event listener to search-btn to prevent default, set user input to local storage, call getApi using input and add input to past searches
document.getElementById('search-btn').addEventListener('click', function(event){
    event.preventDefault();
    // set textinput value to var input using DOM
    
    var input = document.getElementById('TextInput').value;
    // push input to cities array 
    cities.push(input);
    // use cities array to store searched cities in local storage with key 'city'
    localStorage.setItem('city', JSON.stringify(cities));
    // call getApi function using currentcity
    clearForecastEl();
    getApi(input);
    // call function to add user input to past search buttons
    addToPastSearches(input);
})

// add event listener to pastSearchesEl to use value of button as input for getApi
pastSearchesEl.addEventListener('click', function(event){
    event.preventDefault();
    clearForecastEl();
    getApi(event.target.value);
})

