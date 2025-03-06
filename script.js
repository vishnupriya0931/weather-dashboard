const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const cityname = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const weather = document.getElementById('weather');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const loading = document.getElementById('loading');
const weatherinfo = document.querySelector('.weather-info');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    // cityInput .Value;
    // console.log(city);
    if(city){
        fetchWeather(city);
    }
});


async function fetchWeather(city) {

    const url = `https://wttr.in/${city}?format=j1`;
    
    try {
        loading.style.display = 'block';
        const response = await fetch(url);
    
        if (!response.ok) {
            throw new Error('City Not Found') ;
        }

        const data = await response.json();
        displayWeather(data);
        loading.style.display = 'none';
    } catch (error) {
        loading.innerHTML = 'Something went wrong , try again later';
        console.log(error.message);
    }

}

// set dynamic to show in innerHTML 

function displayWeather(data){
    const currentcondition = data.current_condition[0];
    cityname.textContent = data.nearest_area[0].areaName[0].value;
    temperature.textContent =`Temperature :${currentcondition.temp_C}°c`;
    weather.textContent = `Weather : ${currentcondition.weatherDesc[0].value}`;
    humidity.textContent = `Humidity : ${currentcondition.humidity}%`;
    wind.textContent = `Wind Speed : ${currentcondition.windspeedKmph} km/h`;
    weatherinfo.style.display = 'block';
}
