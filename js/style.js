// get the api key and url
const apiKey = "5e50577710e7a40ddc1e2be47b5c60ee";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
  // declare main const
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search a");
const weatherIcon = document.querySelector(".weather-icon");
const weatherCardsDiv = document.querySelector(".weather-cards");
const resentSearchElements = document.querySelector('.resentSearch');
// check the current and weekly weather
function checkWeather() {
  let cityValue = searchBox.value;
  // show the error message
  if (cityValue.length == 0) {
    document.querySelector(".error").innerHTML = `
    <p>Please enter a city name</p>`;
    document.querySelector(".main-card").style.display = "none";
    document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1508020268086-b96cf4f4bb2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHN1bnNldHxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60")`;
    resentSearchElements.style.display = 'none';
  } else {
    resentSearchElements.style.display = 'block';
    // local storage for search history
    const itemsArray = localStorage.getItem("items")
      ? JSON.parse(localStorage.getItem("items"))
      : [];
    console.log(itemsArray);


    const item = searchBox;
    createItem(item);

    function createItem(item) {
      if (itemsArray.length >= 5) {
        itemsArray.shift();
      }
      itemsArray.push(item.value);
      localStorage.setItem("items", JSON.stringify(itemsArray));
    }

    function displayItems() {
      let items = "";
      for (let i = 0; i < itemsArray.length; i++) {
        items += `<div class="flexItem flex flex-wrap justify-left items-center mb-[5px]"><i class="fa-solid fa-clock-rotate-left pr-[10px] text-[16px]"></i>
<p class="my-[3px]">${itemsArray[i]}</p>
</div>`;
      }
      document.querySelector(".searchHistory").innerHTML = items;
    }
    displayItems();
    // localStorage.clear(); 
// api for current weather
    fetch(apiUrl + cityValue + `&appid=${apiKey}`)
      .then((resp) => resp.json())
      .then((data) => {
        // example of jQuery DOM
        $(".city").html(data.name);
        $(".temp").html(Math.round(data.main.temp) + "°C");
        $(".humidity").html(data.main.humidity + "%");
        $(".wind").html(data.wind.speed.toPrecision(2) + "km/h");
        // select img according to the weather
        if (data.weather[0].main == "Clouds") {
          weatherIcon.src = "./images/clouds.png";
          document.body.style.backgroundImage = `url("https://images.unsplash.com/uploads/14122598319144c6eac10/5f8e7ade?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2xvdWR5fGVufDB8MHwwfHx8MA%3D%3D")`;
        } else if (data.weather[0].main == "Clear") {
          weatherIcon.src = "./images/clear.png";
          document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1581205135021-fbad89f942a6?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njh8fHN1bm55fGVufDB8MHwwfHx8MA%3D%3D")`;
        } else if (data.weather[0].main == "Rain") {
          weatherIcon.src = "./images/rain.png";
          document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1565065524861-0be4646f450b?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFpbnl8ZW58MHwwfDB8fHww")`;
        } else if (data.weather[0].main == "Drizzle") {
          weatherIcon.src = "./images/drizzle.png";
          document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1576234699886-7eb7f11aecb7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZHJpenpsZXxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60")`;
        } else if (data.weather[0].main == "Mist") {
          weatherIcon.src = "./images/mist.png";
          document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWlzdHxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60")`;
        }
        // example of Javascript DOM
        document.querySelector(".main-card").style.display = "block";
        document.querySelector(".error").innerHTML = "";
      })
      .catch(() => {
        resentSearchElements.style.display = 'none';
        document.querySelector(".error").innerHTML = `
      <p>City not found</p>`;
        document.querySelector(".main-card").style.display = "none";
        document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1508020268086-b96cf4f4bb2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHN1bnNldHxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60")`;
        searchBox.value = "";
      });
// api for weekly weather
    $.ajax({
      url:
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        cityValue +
        "&appid=5e50577710e7a40ddc1e2be47b5c60ee",
      method: "GET",
      dataType: "json",
      success: function (data) {
        searchBox.value = "";
        // show the date from api 
        for (i = 0; i < 35; i = i + 8) {
          document.getElementById("day" + (i + 1)).innerHTML =
            data.list[i].dt_txt.split(" ")[0];
        }
        for (i = 0; i < 35; i = i + 8) {
          document.getElementById("day" + (i + 1) + "Temp").innerHTML =
            Math.round(data.list[i].main.temp - 273.15) + "°C";
        }

        for (i = 0; i < 35; i = i + 8) {
          document.getElementById("day" + (i + 1) + "Wind").innerHTML =
            data.list[i].wind.speed.toPrecision(2) + "km/h";
        }
        for (i = 0; i < 35; i = i + 8) {
          document.getElementById("day" + (i + 1) + "Hum").innerHTML =
            data.list[i].main.humidity + "%";
        }

        //Getting Weather Icons
        for (i = 0; i < 35; i = i + 8) {
          if (data.list[i].weather[0].main == "Clouds") {
            document.getElementById("img" + (i + 1)).src =
              "./images/clouds.png";
          } else if (data.list[i].weather[0].main == "Clear") {
            document.getElementById("img" + (i + 1)).src = "./images/clear.png";
          } else if (data.list[i].weather[0].main == "Rain") {
            document.getElementById("img" + (i + 1)).src = "./images/rain.png";
          } else if (data.list[i].weather[0].main == "Drizzle") {
            document.getElementById("img" + (i + 1)).src =
              "./images/drizzle.png";
          } else if (data.list[i].weather[0].main == "Mist") {
            document.getElementById("img" + (i + 1)).src = "./images/mist.png";
          }
        }


searchBox.value = "";
      },
      // show the error message
      error: function (error) {
        document.querySelector(".error").innerHTML = `
        <p>City not found</p>`;
        document.querySelector(".main-card").style.display = "none";
      },
    });
  }
}


searchBtn.addEventListener("click", checkWeather);
