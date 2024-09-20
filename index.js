const cityName = document.querySelector('.city')
const wind = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')
const temp = document.querySelector('.temp')
const weather_icon = document.querySelector('.weather_icon')
const searchInput = document.querySelector('#searchInput')
const mainWeatherCon = document.querySelector('.weather')
const errorCon = document.querySelector('.error')

const apiKey = '3cc390baec9352133f13fa603d693664'
const apiURL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q='

async function checkWeather(city) {
    const response = await fetch(apiURL + city + `&appid=${apiKey}`)
    
    if(!response.ok) {
        errorCon.style = 'display: block;'
        mainWeatherCon.style.display = 'none'
    } else {
        let data = await response.json()    
    
        cityName.innerHTML = data.name
        temp.innerHTML = `${Math.round(data.main.temp)}&#176;C`
        wind.innerHTML = `${Math.round(data.wind.speed)} km/h`
        humidity.innerHTML = `${data.main.humidity} %`
        weather_icon.src = `images/${data.weather[0].main.toLowerCase()}.png`    
    
        mainWeatherCon.style.display = 'block'
        errorCon.style = 'display: none;'

    }

}

searchInput.addEventListener('change', () => {
    checkWeather(`${searchInput.value}`)
})


