var addBtn = document.querySelector("#add-btn");
var searchedCitiesEl = document.querySelector("#searched-cities");
var cityEl = document.querySelector("#city");
var modalEl = document.querySelector("#modal-container");
var modalNameEl = document.querySelector("#modal-name");
var weatherInfoEl = document.querySelector("#weather-info");
var closeEl = document.querySelector(".close");
var saveBtn = document.querySelector("#save");

var cityListEl = [{city: "city"}];
var currentid = 0;

function addCityToList(event) {
    event.preventDefault();
    var city = cityEl.value;
    var li = document.createElement("li");
    li.id = cityListEl.length;
    li.innerHTML = city;
    cityListEl.push({city: city});
    searchedCitiesEl.append(li);
}

var APIkey = "67552ce831bab1edacf38a97c7ac6639"
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=" + APIkey;
    $.ajax({
        url: queryURL,
        method: "GET"
      })
    .then(function(response){
        
        var weather = response.weather;
        var main = response.main;
        var wspd = response.wind.speed;

        console.log(weather);
        console.log(main);
        console.log(wspd);
        
        });

// var searchAPI = function(uVWeather) {
//   var queryURL = 'api.openweathermap.org/data/2.5/forecast?q=' + city + "&appid =" + "67552ce831bab1edacf38a97c7ac6639";
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(uVWeather) {
//     createRow(uVWeather);
//   });
// };
// uVWeather();

// addBtn.addEventListener("click", addCityToList);
// searchedCitiesEl.addEventListener("click", handleClick);
// document.addEventListener("click", function(event) {
//   if (event.target === modalEl) {
//     close();
//   }
// });


