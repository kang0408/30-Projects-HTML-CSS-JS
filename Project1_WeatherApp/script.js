const apiKey = "36593d87e86b050fab77cc27237ec851";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=vi&q=";

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');

async function checkWeather(city) {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = 'block';
        document.querySelector('.weather').style.display = 'none';
    }
    
    var data = await response.json();

    console.log(data);

    document.querySelector('.weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.querySelector('.desc').innerHTML = data.weather[0].description;
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';

    document.querySelector(".error").style.display = 'none';
    document.querySelector('.weather').style.display = 'block';
}

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);

})

searchBox.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') checkWeather(searchBox.value);
})
