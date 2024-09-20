const weather = document.querySelector('.weather')
const temp = document.querySelector('.temp')
const humidity = document.querySelector('.humidity')
const wind = document.querySelector('.wind')
const cityName = document.querySelector('.city')
const searchInput = document.querySelector('#searchInput')
const errorCon = document.querySelector('.error')
const weatherIcon = document.querySelector('.weather_icon')

const apiKey = '3cc390baec9352133f13fa603d693664'
const apiURL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q='

async function weatherFunc(city) {
    const res = await fetch(apiURL + `${city}&appid=${apiKey}`)

    if (!res.ok) {
        errorCon.style.display = 'block'
        weather.style.display = 'none'
    } else {
        const data = await res.json()
    
        temp.innerHTML = `${Math.round(data.main.temp)}&#176;C`
        wind.innerHTML = `${data.wind.speed} km/h`
        cityName.innerHTML = data.name
        humidity.innerHTML = `${data.main.humidity}%`
        weatherIcon.src = `images/${data.weather[0].main.toLowerCase()}.png`
    
        weather.style.display = 'block'
        errorCon.style.display = 'none'
        console.log(res, data);
    }

}

searchInput.addEventListener('change', () => {
    weatherFunc(searchInput.value)
})
