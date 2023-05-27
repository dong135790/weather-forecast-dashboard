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
var forecastContainer1 = document.querySelector('#forecast-1');

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
            buttonEl.setAttribute('class', 'bg-light border');

            // Sets the button to city name
            buttonEl.setAttribute('location', data[0].name)

            buttonEl.textContent = data[0].name;

            buttonEl.onclick = function () {
                weatherApi(data[0].name)
            }
            historyContainer.append(buttonEl);

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
            function filterByID(item) {
                return item.dt_txt.includes('12:00:00') 
            }
                
            arrByID = data.list.filter(filterByID);
            console.log(arrByID)
            // let childrens = forecastContainer.firstElementChild;
            // console.log(forecastContainer)
            // console.log(childrens);
            forecastContainer.innerHTML = "";
            todayContainer.innerHTML = "";
            console.log(data);
            var date = dayjs().format('M/D/YYYY');
            console.log(data.list[0].dt_txt);  

            var weatherIcon = data.list[0].weather[0].icon;
            var todayTemperature = data.list[0].main.temp;
            var todayHumidity = data.list[0].main.humidity;
            var todayWindMph = data.list[3].wind.speed;
            console.log(weatherIcon, todayTemperature, todayHumidity, todayWindMph);
        
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

            // iconEl.textContent = weatherIcon;
            todayDate.textContent = date;
            temperatureEl.textContent = todayTemperature +' Fahrenheit';
            humidityEl.textContent = todayHumidity;
            windEl.textContent = todayWindMph +' Mph';

            console.log(arrByID)

            // day 1

            var forecastContainer1 = document.createElement('div');
            forecastContainer1.setAttribute('id', 'forecast-1');
            forecastContainer.appendChild(forecastContainer1);
            // forecastContainer.appendChild(forecastContainer1)
            var oneWeatherDescription = arrByID[0].weather[0].description
            var oneWeatherTemp = arrByID[0].main.temp;
            var oneWeatherWind = arrByID[0].wind.speed;

            var oneForecastDescriptionEl = document.createElement('p')
            var oneWeatherTempEl = document.createElement('p')
            var oneWeatherWindEl = document.createElement('p')

            oneForecastDescriptionEl.textContent = oneWeatherDescription
            oneWeatherTempEl.textContent = oneWeatherTemp + ' Fahrenheit'
            oneWeatherWindEl.textContent = oneWeatherWind + ' Mph';

            forecastContainer1.appendChild(oneForecastDescriptionEl)
            forecastContainer1.appendChild(oneWeatherTempEl)
            forecastContainer1.appendChild(oneWeatherWindEl)

            // Day 2

            var forecastContainer2 = document.createElement('div');
            forecastContainer2.setAttribute('id', 'forecast-2');
            forecastContainer.appendChild(forecastContainer2);
            // forecastContainer.appendChild(forecastContainer2)

            var twoWeatherDescription = arrByID[1].weather[0].description
            var twoWeatherTemp = arrByID[1].main.temp;
            var twoWeatherWind = arrByID[1].wind.speed;

            var twoForecastDescriptionEl = document.createElement('p')
            var twoWeatherTempEl = document.createElement('p')
            var twoWeatherWindEl = document.createElement('p')

            twoForecastDescriptionEl.textContent = twoWeatherDescription
            twoWeatherTempEl.textContent = twoWeatherTemp + ' Fahrenheit'
            twoWeatherWindEl.textContent = twoWeatherWind + ' Mph';

            forecastContainer2.appendChild(twoForecastDescriptionEl)
            forecastContainer2.appendChild(twoWeatherTempEl)
            forecastContainer2.appendChild(twoWeatherWindEl)

            // Day 3
            var forecastContainer3 = document.createElement('div');
            forecastContainer3.setAttribute('id', 'forecast-3');
            forecastContainer.appendChild(forecastContainer3);
            // forecastContainer.appendChild(forecastContainer3)

            var threeWeatherDescription = arrByID[2].weather[0].description
            var threeWeatherTemp = arrByID[2].main.temp;
            var threeWeatherWind = arrByID[2].wind.speed;

            var threeForecastDescriptionEl = document.createElement('p')
            var threeWeatherTempEl = document.createElement('p')
            var threeWeatherWindEl = document.createElement('p')

            threeForecastDescriptionEl.textContent = threeWeatherDescription
            threeWeatherTempEl.textContent = threeWeatherTemp + ' Fahrenheit'
            threeWeatherWindEl.textContent = threeWeatherWind + ' Mph';

            forecastContainer3.appendChild(threeForecastDescriptionEl)
            forecastContainer3.appendChild(threeWeatherTempEl)
            forecastContainer3.appendChild(threeWeatherWindEl)

            // Day 4
            var forecastContainer4 = document.createElement('div');
            forecastContainer4.setAttribute('id', 'forecast-4');
            forecastContainer.appendChild(forecastContainer1);
            // forecastContainer.appendChild(forecastContainer4)

            var fourWeatherDescription = arrByID[3].weather[0].description
            var fourWeatherTemp = arrByID[3].main.temp;
            var fourWeatherWind = arrByID[3].wind.speed;

            var fourForecastDescriptionEl = document.createElement('p')
            var fourWeatherTempEl = document.createElement('p')
            var fourWeatherWindEl = document.createElement('p')

            fourForecastDescriptionEl.textContent = fourWeatherDescription
            fourWeatherTempEl.textContent = fourWeatherTemp + ' Fahrenheit'
            fourWeatherWindEl.textContent = fourWeatherWind + ' Mph';

            forecastContainer4.appendChild(fourForecastDescriptionEl)
            forecastContainer4.appendChild(fourWeatherTempEl)
            forecastContainer4.appendChild(fourWeatherWindEl)


            
    

            
    

            // var twoForecast = document.createElement('p')
            // var threeForecast = document.createElement('p')
            // var fourForecast = document.createElement('p')
            // var fiveForecast = document.createElement('p')


            // var oneWeather = arrByID[0].weather[0].description
            // var oneWeatherTemp = arrByID[0].main.temp;
            // console.log(oneWeather)

            // var oneForecast = document.createElement('p')
            // var twoForecast = document.createElement('p')
            // var threeForecast = document.createElement('p')
            // var fourForecast = document.createElement('p')
            // var fiveForecast = document.createElement('p')

            // forecastContainer.appendChild(oneForecast)
            // forecastContainer.appendChild(twoForecast)
            // forecastContainer.appendChild(threeForecast)
            // forecastContainer.appendChild(fourForecast)
            // forecastContainer.appendChild(fiveForecast)

            // oneWeatherTemp.textContent = 
            // oneForecast.textContent = oneWeather;



        });
}

function localHistory () {
    console.log('hello')
    var searchInput = document.querySelector('#search-input').value;
    locationHistory.push(searchInput)
    console.log(searchInput)
    console.log(locationHistory)
    
}