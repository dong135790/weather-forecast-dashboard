// Api Url and key for weather
var weatherApiUrl = 'https://api.openweathermap.org';
var weatherApiKey = '2d9212370a96a1b044194ec9d251b1e2';
var locationHistory = [];

// Query Selects the important id
var searchForm = document.querySelector('#search-form');
var searchInput = document.querySelector('#search-input');
var searchHistory = document.querySelector('#history');
var todayContainer = document.querySelector('#today');
var forecastContainer = document.querySelector('forecast');

// For search hisotry
function searchHistory() {
    searchHistory.innerHTML = '';

    for (var i = locationHistory.length -1; i >= 0; i++) {
        var buttonEl = document.createElement('button');
        buttonEl.setAttribute('type', 'button');

        buttonEl.setAttribute('data-search', locationHistory[i]);
        buttonEl.textContent = locationHistory[i];
        searchHistory.append(buttonEl);
    }
}

function appendSearchHistory(search) {
    if (locationHistory.indexOf(search) !== -1) {
        return;
    }
    searchHistory.push(search);
}