const apiKey = "5e50577710e7a40ddc1e2be47b5c60ee";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherCardsDiv = document.querySelector(".weather-cards");

// const itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
// console.log(itemsArray);

// function getItems(){
//   const item = searchBox
//   createItem(item)
// }

// function createItem(item){
//   itemsArray.push(item.value)
//   localStorage.setItem('items', JSON.stringify(itemsArray))
//   location.reload()
// }

// function displayItems(){
//   let items = ""
//   for(let i = 0; i < itemsArray.length; i++){
//     items += `<div class="flex"><i class="fa-solid fa-clock-rotate-left"></i>
//     <p>${itemsArray[i]}</p>
//     </div>`
//   }
//   document.querySelector(".searchHistory").innerHTML = items

// }
// window.onload = function() {
//   displayItems()
// };

// document.addEventListener("DOMContentLoaded", function () {
//   loadSearchHistory();
// });

// function addKeyword() {

//   const searchTerm = searchBox.value.trim();

//   if (searchTerm !== "") {
//       // 検索キーワードを検索履歴に追加
//       addToSearchHistory(searchTerm);
//       searchBox.value = "";
//   }
// };
// function addToSearchHistory(searchTerm) {
//   const searchHistory = getSearchHistory();
//   searchHistory.push(searchTerm);
//   localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
//   loadSearchHistory();
// }
// function loadSearchHistory() {
//   const searchHistory = getSearchHistory();
//   let searchHistoryList = document.getElementById("#searchHistory");
//   searchHistoryList= "";

//   searchHistory.forEach(function (searchTerm) {
//       const listItem = document.createElement("li");
//       listItem.textContent = searchTerm;
//       searchHistoryList.appendChild(listItem);
//   });
// }

// // 検索履歴を取得する
// function getSearchHistory() {
//   const searchHistory = localStorage.getItem("searchHistory");
//   return searchHistory ? JSON.parse(searchHistory) : [];
// }
// let recentListEl = document.querySelector(".recentList");
// let inputSubmit = document.getElementById("submit");

// let recentSearch=[];
// searchBtn.addEventListener("click",(e)=>{
// e.preventDefault();
// recentSearch.unshift(searchBox.value)
// console.log(recentSearch);

// let recentHtmlList =""

// for(let i =0;i<recentSearch.length; i++){
//   recentHtmlList+=`<div class="recentItem">
//   <i class="fa-solid fa-clock-rotate-left"></i>
//   <p>${recentSearch[i]}</p>`
// }

// recentListEl.innerHTML = recentHtmlList;

// })

function checkWeather() {
  let cityValue = searchBox.value;
  if (cityValue.length == 0) {
    document.querySelector(".error").innerHTML = `
    <p>Please enter a city name</p>`;
    document.querySelector(".main-card").style.display = "none";
  } else {
    // localStorage.clear();  //全データを消去
    // searchBox.value = "";
    fetch(apiUrl + cityValue + `&appid=${apiKey}`)
      .then((resp) => resp.json())
      .then((data) => {
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML =
          Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML =
          data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
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
        document.querySelector(".error").innerHTML = `
      <p>City not found</p>`;
        document.querySelector(".main-card").style.display = "none";
        document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1508020268086-b96cf4f4bb2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHN1bnNldHxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60")`;
      });

    $.ajax({
      url:
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        cityValue +
        "&appid=5e50577710e7a40ddc1e2be47b5c60ee",
      method: "GET",
      dataType: "json",
      success: function (data) {
        for (i = 0; i < 35; i = i + 8) {
          document.getElementById("day" + (i + 1)).innerHTML =
            data.list[i].dt_txt.split(" ")[0];
          //Number(1.3450001).toFixed(2); // 1.35
        }
        for (i = 0; i < 35; i = i + 8) {
          document.getElementById("day" + (i + 1) + "Temp").innerHTML =
            Math.round(data.list[i].main.temp - 273.15) + "°C";
          //Number(1.3450001).toFixed(2); // 1.35
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

        const itemsArray = localStorage.getItem("items")
          ? JSON.parse(localStorage.getItem("items"))
          : [];
        console.log(itemsArray);
       
        // function getItems(){
        const item = searchBox;
        createItem(item);
        // }

        function createItem(item) {
          
          // location.reload()
          if (itemsArray.length >= 3) {
            itemsArray.shift(); // 古いものを削除
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
        // window.onload = function() {
        displayItems();
        // };
        // getItems();
        // searchBox.value = "";
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
// searchBtn.addEventListener("click", getItems());
