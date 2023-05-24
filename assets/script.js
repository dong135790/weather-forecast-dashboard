var weatherApiUrl = 'https://api.openweathermap.org';
var weatherApiKey = '2d9212370a96a1b044194ec9d251b1e2';

var searchForm = document.querySelector('#search-form');
var searchInput = document.querySelector('#search-input');
var todayContainer = document.querySelector('#today');
var forecastContainer = document.querySelector('forecast');
var searchHistory = document.querySelector('#history');

function searchHistory() {
    searchHistory.innerHTML = '';
}