const API_KEY = 'aa13b6c122d444979ca73306230510';
const CurrentCityAPI_KEY = '49dccc5ad5c7052b5ab00204cfd9bce6';
const mainContainerTab = document.querySelector('.main-container');
const upperSection = document.querySelector('.upper-section');
const lowerSection = document.querySelector('.lower-section');
const loaderContainer = document.querySelector('.loader-container');
const city_input = document.querySelector('#city');
const search_btn = document.querySelector('.search-btn');
const currentLocationBtn = document.querySelector('.current-location-btn');
const place = document.querySelector('.place');
const time = document.querySelector('.time');
const date = document.querySelector('.date');
const temparatue = document.querySelector('.temp');
const feelsLikeTemp = document.querySelector('.feels-like-temp');
const sunrise = document.querySelector('.sunrise-timing');
const sunset = document.querySelector('.sunset-timing');
const humidity = document.querySelector('.humidity-percentage');
const windSpeed = document.querySelector('.windspeed-percentage');
const temperaturLogo = document.querySelector('.temperature-logo');
const tempLogoText = document.querySelector('.tempLogo-text');
const warningMessage = document.querySelector('.warning-message');
const warningPage = document.querySelector('.warning-page');
const firstDate = document.querySelector('.first-date');
const secondDate = document.querySelector('.second-date');
const thirdDate = document.querySelector('.third-date');
const fourthDate = document.querySelector('.fourth-date');
const fifthDate = document.querySelector('.fifth-date');
const firstDateLogo = document.querySelector('.first-date-logo');
const secondDateLogo = document.querySelector('.second-date-logo');
const thirdDateLogo = document.querySelector('.third-date-logo');
const fourthDateLogo = document.querySelector('.fourth-date-logo');
const fifthDateLogo = document.querySelector('.fifth-date-logo');
const firsttemp = document.querySelector('.first-temp');
const secondtemp = document.querySelector('.second-temp');
const thirdtemp = document.querySelector('.third-temp');
const fourthtemp = document.querySelector('.fourth-temp');
const fifthtemp = document.querySelector('.fifth-temp');
const firstHumidity = document.querySelector('.first-humidity-percent');
const secondHumidity = document.querySelector('.second-humidity-percent');
const thirdHumidity = document.querySelector('.third-humidity-percent');
const fourthHumidity = document.querySelector('.fourth-humidity-percent');
const fifthHumidity = document.querySelector('.fifth-humidity-percent');

let cityName = '';
let GlobalCityName;
async function showWeather() {
    loaderContainer.classList.add('active');
    try {
        const getCity = await getCurrentCity();
        let city = cityName ? cityName : getCity;
        const response = await fetch('https://api.weatherapi.com/v1/forecast.json?key=' + `${API_KEY}` + '&q=' + `${city}` + '&days=6&aqi=no&alerts=yes');
        const data = await response.json();
        loaderContainer.classList.remove('active');
        if (data.error) {
            upperSection.classList.remove('active');
            lowerSection.classList.remove('active');
            warningMessage.innerText = data.error.message;
            warningMessage.classList.add('active');
            warningPage.classList.add('active');
            throw new Error(data.error.message)
        }
        warningMessage.classList.remove('active');
        warningPage.classList.remove('active')
        upperSection.classList.add('active');
        lowerSection.classList.add('active');

         // rendering the data to the UI
        renderWeatherInfo(data);

    } catch (error) {
        throw error;
    }
}

async function getCurrentCity() {
    const getPosition = function () {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    };

    try {
        const position = await getPosition();
        const lat = position.coords.latitude.toFixed(2);
        const long = position.coords.longitude.toFixed(2);

        const response = await fetch('http://api.openweathermap.org/geo/1.0/reverse?lat=' + `${lat}` + '&lon=' + `${long}` + '&limit=5&appid=' + `${CurrentCityAPI_KEY}`);
        const output = await response.json();
        const cityName = output[0]?.name;
        GlobalCityName = cityName;
        return cityName;
    } catch (error) {
        console.error("Error getting geolocation:", error);
        if (error.code == 1) {
            alert('please grant access of location')
        }
        throw error;
    }
}

function formatDateTime(timeStamp) {
    const options = {
        hour: 'numeric',
        minute: 'numeric',
        weekday: 'long',
        day: 'numeric',
        month: 'short',
    };

    return new Date(timeStamp).toLocaleString('en-US', options);
}

function renderWeatherInfo(data) {
    let desired_date = formatDateTime(data?.current?.last_updated);
    let first_date = formatDateTime(data?.forecast?.forecastday[1]?.date).split(',');
    let second_date = formatDateTime(data?.forecast?.forecastday[2]?.date).split(',');
    let third_date = formatDateTime(data?.forecast?.forecastday[3]?.date).split(',');
    let fourth_date = formatDateTime(data?.forecast?.forecastday[4]?.date).split(',');
    let fifth_date = formatDateTime(data?.forecast?.forecastday[5]?.date).split(',');
    let first_desired_date = (first_date[0] + ',' + first_date[1]);
    let second_desired_date = (second_date[0] + ',' + second_date[1]);
    let third_desired_date = (third_date[0] + ',' + third_date[1]);
    let fourth_desired_date = (fourth_date[0] + ',' + fourth_date[1]);
    let fifth_desired_date = (fifth_date[0] + ',' + fifth_date[1]);
    let mydate = desired_date.split(',');
    let only_date = mydate[0] + ',' + mydate[1];
    let only_time = mydate[2];
    time.innerText = only_time == undefined ? '' : only_time;
    date.innerText = only_date;
    place.innerText = data?.location?.name;
    temparatue.innerText = data?.current?.temp_c + "℃";
    feelsLikeTemp.innerText = data?.current?.feelslike_c + "℃";
    humidity.innerText = data?.current?.humidity + '%';
    windSpeed.innerText = data?.current?.wind_kph + 'km/h';
    sunrise.innerText = data?.forecast?.forecastday[0].astro.sunrise;
    sunset.innerText = data?.forecast?.forecastday[0].astro.sunset;
    temperaturLogo.src = data?.current?.condition?.icon;
    tempLogoText.innerText = data?.current?.condition?.text;
    firstDate.innerText = first_desired_date;
    secondDate.innerText = second_desired_date;
    thirdDate.innerText = third_desired_date;
    fourthDate.innerText = fourth_desired_date;
    fifthDate.innerText = fifth_desired_date;
    firstDateLogo.src = data?.forecast?.forecastday[1]?.day?.condition?.icon;
    secondDateLogo.src = data?.forecast?.forecastday[2]?.day?.condition?.icon;
    thirdDateLogo.src = data?.forecast?.forecastday[3]?.day?.condition?.icon;
    fourthDateLogo.src = data?.forecast?.forecastday[4]?.day?.condition?.icon;
    fifthDateLogo.src = data?.forecast?.forecastday[5]?.day?.condition?.icon;
    firsttemp.innerText = data?.forecast?.forecastday[1]?.day?.maxtemp_c + '℃';
    secondtemp.innerText = data?.forecast?.forecastday[2]?.day?.maxtemp_c + '℃';
    thirdtemp.innerText = data?.forecast?.forecastday[3]?.day?.maxtemp_c + '℃';
    fourthtemp.innerText = data?.forecast?.forecastday[4]?.day?.maxtemp_c + '℃';
    fifthtemp.innerText = data?.forecast?.forecastday[5]?.day?.maxtemp_c + '℃';
    firstHumidity.innerText = data?.forecast?.forecastday[1]?.day?.avghumidity + "%";
    secondHumidity.innerText = data?.forecast?.forecastday[2]?.day?.avghumidity + "%";
    thirdHumidity.innerText = data?.forecast?.forecastday[3]?.day?.avghumidity + "%";
    fourthHumidity.innerText = data?.forecast?.forecastday[4]?.day?.avghumidity + "%";
    fifthHumidity.innerText = data?.forecast?.forecastday[5]?.day?.avghumidity + "%";

}

search_btn.addEventListener('click', function () {
    if (city_input.value) {
        let inputValue = city_input.value;
        cityName = inputValue;
        showWeather();
    }
})

city_input.addEventListener('keyup', function(e) {
    e.preventDefault();
    if(e.keyCode === 13) {
        search_btn.click();
    }
})

currentLocationBtn.addEventListener('click', function () {
    cityName = '';
    showWeather();
})

showWeather();
