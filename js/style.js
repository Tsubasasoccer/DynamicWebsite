const apiKey="5e50577710e7a40ddc1e2be47b5c60ee";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon= document.querySelector(".weather-icon");
const weatherCardsDiv = document.querySelector(".weather-cards");

let checkWeather=()=>{
  let cityValue=searchBox.value
  if(cityValue.length == 0){
    document.querySelector(".error").innerHTML=`
    <p>Please enter a city name</p>`
    document.querySelector(".main-card").style.display="none";
  }else{
    searchBox.value=""
    fetch(apiUrl + cityValue+ `&appid=${apiKey}`)
    .then((resp)=> resp.json())
    .then((data)=>{
      document.querySelector(".city").innerHTML=data.name;
      document.querySelector(".temp").innerHTML=Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML=data.main.humidity + "%";
      document.querySelector(".wind").innerHTML=data.wind.speed + "km/h";
      if(data.weather[0].main == "Clouds"){
        weatherIcon.src="./images/clouds.png"
        document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1536514498073-50e69d39c6cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2xvdWR8ZW58MHwwfDB8fHww&auto=format&fit=crop&w=800&q=60")`
      }else  if(data.weather[0].main=="Clear"){
        weatherIcon.src="./images/clear.png"
        document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1598965914211-6ec6872593a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHN1bnxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60")`
      }else  if(data.weather[0].main=="Rain"){
        weatherIcon.src="./images/rain.png"
        document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1438449805896-28a666819a20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHJhaW58ZW58MHwwfDB8fHww&auto=format&fit=crop&w=800&q=60")`
      }else  if(data.weather[0].main=="Drizzle"){
        weatherIcon.src="./images/drizzle.png"
        document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1576234699886-7eb7f11aecb7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZHJpenpsZXxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60")`
      }else  if(data.weather[0].main=="Mist"){
        weatherIcon.src="./images/mist.png"
        document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWlzdHxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60")`
      }
      document.querySelector(".main-card").style.display="block";
      document.querySelector(".error").innerHTML=""

    })
    .catch(()=>{
      document.querySelector(".error").innerHTML=`
      <p>City not found</p>`
      document.querySelector(".main-card").style.display="none";

    })


    $.ajax({
      url:'https://api.openweathermap.org/data/2.5/forecast?q='+cityValue+'&appid=5e50577710e7a40ddc1e2be47b5c60ee',
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        for(i = 0; i<35; i=i+8){
          document.getElementById("day" + (i+1)).innerHTML =data.list[i].dt_txt.split(" ")[0];
          //Number(1.3450001).toFixed(2); // 1.35
      }
        for(i = 0; i<35; i=i+8){
          document.getElementById("day" + (i+1) + "Temp").innerHTML = Math.round(data.list[i].main.temp - 273.15) + "°C";
          //Number(1.3450001).toFixed(2); // 1.35
      }
  
      for(i = 0; i<35; i=i+8){
          document.getElementById("day" + (i+1) + "Wind").innerHTML =data.list[i].wind.speed + "km/h";
      }
      for(i = 0; i<35; i=i+8){
          document.getElementById("day" + (i+1) + "Hum").innerHTML =data.list[i].main.humidity + "%";
      }
      //------------------------------------------------------------
  
      //Getting Weather Icons
       for(i = 0; i<35; i=i+8){

          if(data.list[i].weather[0].main == "Clouds"){
            document.getElementById("img" + (i+1)).src ="./images/clouds.png"
          }else  if(data.list[i].weather[0].main=="Clear"){
            document.getElementById("img" + (i+1)).src ="./images/clear.png"
          }else  if(data.list[i].weather[0].main=="Rain"){
            document.getElementById("img" + (i+1)).src ="./images/rain.png"
          }else  if(data.list[i].weather[0].main=="Drizzle"){
            document.getElementById("img" + (i+1)).src ="./images/drizzle.png"
          }else  if(data.list[i].weather[0].main=="Mist"){
            document.getElementById("img" + (i+1)).src ="./images/mist.png"
          }
      }
      },
      error: function(error) {
        document.querySelector(".error").innerHTML=`
        <p>City not found</p>`
        document.querySelector(".main-card").style.display="none";
      }
    });
  

  }


  
}
// const createWeatherCard = (cityName, weatherItem, index) => {
// // HTML for the other five day forecast card
//       return `<li class="card">
//                   <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
//                   <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
//                   <h6>Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
//                   <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
//                   <h6>Humidity: ${weatherItem.main.humidity}%</h6>
//               </li>`;
  
// }
// const getWeatherDetails = (cityName, latitude, longitude) => {
//   const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={apiKey}`;
//   fetch(WEATHER_API_URL).then(response => response.json()).then(data => {
//       // Filter the forecasts to get only one forecast per day
//       const fiveDaysForecast = data.list.filter(forecast => {
//           const forecastDate = new Date(forecast.dt_txt).getDate();
//       });
//       // Clearing previous weather data
//       searchBox.value = "";
//       weatherCardsDiv.innerHTML = "";
//       // Creating weather cards and adding them to the DOM
//       fiveDaysForecast.forEach((weatherItem, index) => {
//           const html = createWeatherCard(cityName, weatherItem, index);

//               weatherCardsDiv.insertAdjacentHTML("beforeend", html);
//       });        
//   }).catch(() => {
//       alert("An error occurred while fetching the weather forecast!");
//   });
// }
// const getCityCoordinates = () => {
//   const cityName = searchBox.value.trim();
//   if (cityName === "") return;
//   const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;
  
//   // Get entered city coordinates (latitude, longitude, and name) from the API response
//   fetch(API_URL).then(response => response.json()).then(data => {
//       if (!data.length) return alert(`No coordinates found for ${cityName}`);
//       const { lat, lon, name } = data[0];
//       getWeatherDetails(name, lat, lon);
//   }).catch(() => {
//       alert("An error occurred while fetching the coordinates!");
//   });
// }
searchBtn.addEventListener("click", checkWeather);
// window.addEventListener("load",checkWeather);
// const apiKey="5e50577710e7a40ddc1e2be47b5c60ee";
// const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
// const searchBox = document.querySelector(".search input");
// const searchBtn = document.querySelector(".search button");
// const weatherIcon= document.querySelector(".weather-icon")

// async function checkWeather(city){
//   const response = await fetch(apiUrl + city+ `&appid=${apiKey}`)
//   if(response.status== 404){
//     document.querySelector(".error").style.display="block";
//     document.querySelector(".weather").style.display="none";
//   }else{
//     let data = await response.json();
  
//     document.querySelector(".city").innerHTML=data.name;
//     document.querySelector(".temp").innerHTML=Math.round(data.main.temp) + "°C";
//     document.querySelector(".humidity").innerHTML=data.main.humidity + "%";
//     document.querySelector(".wind").innerHTML=data.wind.speed + "km/h";
//     if(data.weather[0].main == "Clouds"){
//       weatherIcon.src="./images/clouds.png"
//     }else  if(data.weather[0].main=="Clear"){
//       weatherIcon.src="./images/clear.png"
//     }else  if(data.weather[0].main=="Rain"){
//       weatherIcon.src="./images/rain.png"
//     }else  if(data.weather[0].main=="Drizzle"){
//       weatherIcon.src="./images/drizzle.png"
//     }else  if(data.weather[0].main=="Mist"){
//       weatherIcon.src="./images/mist.png"
//     }
//     document.querySelector(".weather").style.display="block";
//     document.querySelector(".error").style.display="none";
//   }


  
// }
// searchBtn.addEventListener("click", ()=>{
//   checkWeather(searchBox.value);
// })
// checkWeather();