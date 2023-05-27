// Api Url and key for weather
var weatherApiUrl = 'https://api.openweathermap.org';
var weatherApiKey = '79026700d6d1fb2b065b0cdee07661c3';
// Stores an array that includes all the names of the cities that were searched for.
var locationHistory = {

};

// Query Selects the important id
var searchForm = document.querySelector('#search-form');
var searchInput = document.querySelector('#search-input');
var historyContainer = document.querySelector('#history');
var todayContainer = document.querySelector('#today');
var forecastContainer = document.querySelector('#forecast');
var searchbtn = document.getElementById('searchBtn');

// Searches up the location of a name and stores in local storage. Lat/Lon values are inside.
function geoApi () {
    var cityName = document.getElementById('search-input').value;
    // buggies
    console.log('Name,', cityName);
    // Renders the city based on what was typed
    var ApiUrl = weatherApiUrl + '/geo/1.0/direct?q=' + cityName +'&limit=1&appid=' + weatherApiKey;

    fetch(ApiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('DATA', data)
            // // logs lat/lon
            // console.log(data[0].lat, data[0].lon);

            locationHistory[data[0].name] = [data[0].lat, data[0].lon];
            console.log('LocationHistory []', locationHistory);

            // Create button and set its type to button (default is 'submit') so it won't refresh the screen
            var buttonEl = document.createElement('button');
            buttonEl.setAttribute('type', 'button');

            // Sets the button to city name
            buttonEl.setAttribute('location', data[0].name)

            buttonEl.textContent = data[0].name;
            console.log('1')

            buttonEl.onclick = function () {
                weatherApi(data[0].name)
            }
            console.log('1')

            historyContainer.append(buttonEl);
            console.log('1')


            localStorage.setItem("Locations", JSON.stringify(locationHistory));
            weatherApi(data[0].name);
        });
}

function weatherApi (city) {
    console.log(city)
    var cityCoords = JSON.parse(localStorage.getItem("Locations"));
    var lat = cityCoords[city][0];
    var lon = cityCoords[city][1];
    
    console.log(cityCoords);
    var api = 'https://api.openweathermap.org/data/2.5/forecast?lat='+ lat +'&lon='+ lon +'&appid=' + weatherApiKey + '&units=imperial';

    console.log(api);
    fetch(api)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            todayContainer.innerHTML = "";
            console.log(data.list[0].main.temp);
            var date = dayjs().format('M/D/YYYY');
            console.log(date)  

            var weatherIcon = data.list[1].weather.icon;
            var todayTemperature = data.list[0].main.temp;
            var todayHumidity = data.list[0].main.humidity;
            var todayWindMph = data.list[3].wind.speed;
            console.log(weatherIcon, todayTemperature, todayHumidity, todayWindMph)
        
            var iconEl = document.createElement('div')
            var todayDate = document.createElement('p');
            var temperatureEl = document.createElement('p');
            var humidityEl = document.createElement('p');
            var windEl = document.createElement('p');

            todayContainer.appendChild(iconEl);
            todayContainer.appendChild(todayDate)
            todayContainer.appendChild(temperatureEl)
            todayContainer.appendChild(humidityEl)
            todayContainer.appendChild(windEl)

            iconEl.textContent = weatherIcon;
            todayDate.textContent = date;
            temperatureEl.textContent = todayTemperature;
            humidityEl.textContent = todayHumidity;
            windEl.textContent = todayWindMph;


        });
}

function localHistory () {
    console.log('hello')
    var searchInput = document.querySelector('#search-input').value;
    locationHistory.push(searchInput)
    console.log(searchInput)
    console.log(locationHistory)
    
}