const apiKey = "5e50577710e7a40ddc1e2be47b5c60ee";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherCardsDiv = document.querySelector(".weather-cards");
const resentSearchElements = document.querySelector('.resentSearch');

function checkWeather() {
  let cityValue = searchBox.value;
  if (cityValue.length == 0) {
    document.querySelector(".error").innerHTML = `
    <p>Please enter a city name</p>`;
    document.querySelector(".main-card").style.display = "none";
    document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1508020268086-b96cf4f4bb2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHN1bnNldHxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60")`;
    resentSearchElements.style.display = 'none';
  } else {
    resentSearchElements.style.display = 'block';
    const itemsArray = localStorage.getItem("items")
      ? JSON.parse(localStorage.getItem("items"))
      : [];
    console.log(itemsArray);


    const item = searchBox;
    createItem(item);

    function createItem(item) {
      if (itemsArray.length >= 3) {
        itemsArray.shift();
      }
      itemsArray.push(item.value);
      localStorage.setItem("items", JSON.stringify(itemsArray));
    }

    function displayItems() {
      let items = "";
      for (let i = 0; i < itemsArray.length; i++) {
        items += `<div class="flexItem"><i class="fa-solid fa-clock-rotate-left"></i>
<p>${itemsArray[i]}</p>
</div>`;
      }

      // itemsArray.push(item); // 新しい検索を追加

      // ローカルストレージに保存
      // saveSearchHistory(itemsArray)
      document.querySelector(".searchHistory").innerHTML = items;
    }
    displayItems();
    // localStorage.clear();  //全データを消去

    fetch(apiUrl + cityValue + `&appid=${apiKey}`)
      .then((resp) => resp.json())
      .then((data) => {
        // document.querySelector(".city").innerHTML = data.name;
        $(".city").html(data.name);
        $(".temp").html(Math.round(data.main.temp) + "°C");
        $(".humidity").html(data.main.humidity + "%");
        $(".wind").html(data.wind.speed + "km/h");

        // document.querySelector(".temp").innerHTML =
        //   Math.round(data.main.temp) + "°C";
        // document.querySelector(".humidity").innerHTML =
        //   data.main.humidity + "%";
        // document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
        if (data.weather[0].main == "Clouds") {
          weatherIcon.src = "./images/clouds.png";
          document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1536514498073-50e69d39c6cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2xvdWR8ZW58MHwwfDB8fHww&auto=format&fit=crop&w=800&q=60")`;
        } else if (data.weather[0].main == "Clear") {
          weatherIcon.src = "./images/clear.png";
          document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1598965914211-6ec6872593a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHN1bnxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60")`;
        } else if (data.weather[0].main == "Rain") {
          weatherIcon.src = "./images/rain.png";
          document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1438449805896-28a666819a20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHJhaW58ZW58MHwwfDB8fHww&auto=format&fit=crop&w=800&q=60")`;
        } else if (data.weather[0].main == "Drizzle") {
          weatherIcon.src = "./images/drizzle.png";
          document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1576234699886-7eb7f11aecb7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZHJpenpsZXxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60")`;
        } else if (data.weather[0].main == "Mist") {
          weatherIcon.src = "./images/mist.png";
          document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWlzdHxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60")`;
        }
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

    $.ajax({
      url:
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        cityValue +
        "&appid=5e50577710e7a40ddc1e2be47b5c60ee",
      method: "GET",
      dataType: "json",
      success: function (data) {
        searchBox.value = "";
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
            data.list[i].wind.speed + "km/h";
        }
        for (i = 0; i < 35; i = i + 8) {
          document.getElementById("day" + (i + 1) + "Hum").innerHTML =
            data.list[i].main.humidity + "%";
        }
        //------------------------------------------------------------

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
      error: function (error) {
        document.querySelector(".error").innerHTML = `
        <p>City not found</p>`;
        document.querySelector(".main-card").style.display = "none";
      },
    });
  }
}


searchBtn.addEventListener("click", checkWeather);
