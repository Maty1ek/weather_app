# weather_app
There will be my personal notes and code explanation. So if you are reading this, just know it.

<input type="text" placeholder="Enter your city name" spellcheck="false">

// Atribut spellcheck is used if we want to check the user's text for spell errors


.input {
    flex: 1;
}

// flex in css is used if we eant to give an element how much space it will have in the container. flex:1 means thet an element will have only 1 part of the container


***JS Code instructions***

<!-- 1 -->
**First, create 2 variables. in 1 of them we will save our api key, in another a link to get data about weather**

 const apiKey = '3cc390baec9352133f13fa603d69366'
 const apiURL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=astana'

*API key is a unique key generated specially for you. Thanks to that, the server will know who are usind and many are using it*

*API URL is a link to the openweathermap's Data Base. Thanks to that, u can get the data u need.*

*units=metric means we are using Celcium degree, we can change it to another ones*

*q means query, we write here the name of any city, and it returns the weather data of that city*


<!-- 2 -->
**Create an async function to request weather data**

 async function checkWeather() {
     const response = await fetch(apiURL + `&appid=${apiKey}`)
 }

*Async functions are used when we want our code to run despite async function hasnt finished doing his job. In this case, if we want to request data from API DB, but dont wait until it comes, we use async functions*

*In short, async function is a type of function, that tells us that the function has operations, that can take some time (like data request from the internet), but it wont block another code's work*

<!-- line itself -->
 const response = await fetch(apiURL + `&appid=${apiKey}`)

*We use await in the async functions to say "wait here, before going further, before completing next line in this function". So we use them if a proccess can take some time. Requesting data from server needs time.*

*function fetch() is a JavaScript's function, which gets used to send queries to the servers by internet. It allows us to get datas from another web-sites or API*


<!-- 3 -->
**Unpack the data from the server by using .json()**

 let data = await response.json()

*After we get the data from a server by using fetch(), we get an object called Response. The data we get from the server comes us in a specific format (JSON for example). The function fetch() makes a request and helps us to get that data. When fetch() recieves it, the function adds specific properties in that response object, and one of them is a property called .json()*

*As I said, we need to use await if a proccess takes some time. So that means that using .json() takes some time, as we are "unpacking" the recieved data in JSON format.*

*Function fetch just trsansforms into an object "response". Method .json() is a part of an object 'response' and provided by function fetch(), not by server.*

<!-- Full code -->
 async function checkWeather() {
     const response = await fetch(apiURL + `&appid=${apiKey}`)
     let data = await response.json()    
 }

<!-- Just mistakes -->
**Mistakes I did**

 const response = fetch(apiURL + `&appid=${apiKey}`)
 let data = response.json()

 console.log(response, data);

*When we use fetch(), we wait a response from a sever, which takes some time. Therefore, before we recieve the response, the fetch() function returns a "Promise". Since "Promise" doesn't have any .json() method, console returns an error, because our variable 'response' doesn't have any 'json() methods*

*Why it happens? Because fetch() takes some time, and untill it recieves a response from the server, it returns us a "Promise", and due to not using a key word 'await' in an async function, interpretator reads the variable as a Promise, which doesn't have .json() method*

*What are the "Promises"? Promise is a promise from fetch(), that we will recieve the data from the server in the future, but not right now. Imagine that you are ordering a pizza by a phone: you are calling (creating a promise), pizza is getting prepared (promise is in waiting), and finally it is getting delivered (Promise is completed)*


<!-- 4 -->
**Get all the DOM elements from html page and set the data in that elements**

<!-- set city name -->
 cityName.innerHTML = data.name 
<!-- set temp -->
 temp.innerHTML = `${Math.round(data.main.temp)}&#176;C`
<!-- set wind speed -->
 wind.innerHTML = `${Math.round(data.wind.speed)} km/h`
<!-- set humidity per cent -->
 humidity.innerHTML = `${data.main.humidity} %`
<!-- set weather icon -->
 weather_icon.src = `images/${data.weather[0].main.toLowerCase()}.png` 


<!-- 5 -->
**Add event listener to the input**

 searchInput.addEventListener('change', () => {
     checkWeather(`${searchInput.value}`)
 })

*Here we are adding an event listener to the input. WHen the input gets changed, we call the async function to show all of the data in our app*


<!-- 6 -->
**Add an error handler**

 if(!response.ok) {
     errorCon.style = 'display: block;'
     mainWeatherCon.style.display = 'none'
 }

*If we wont get response from the server, the property of our response object called "ok" will return false, but if we get the data properly and ther is no any errors, it will return true.*

*If that property is false, we show an error container, but if everything is ok, we just return every data we have.*
