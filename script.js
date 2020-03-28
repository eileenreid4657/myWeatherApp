var addBtn = document.querySelector("#add-btn");
var searchedCitiesEl = document.querySelector("#searched-cities");
var cityEl = document.querySelector("#city");
var modalEl = document.querySelector("#modal-container");
var modalNameEl = document.querySelector("#modal-name");
var weatherInfoEl = document.querySelector("#weather-info");
var closeEl = document.querySelector(".close");
var saveBtn = document.querySelector("#save");

var cityListEl = [];
var currentid = 0;
var city = "";

function addCityToList(event) {
  event.preventDefault();
  city = cityEl.value;
  console.log("City: " + city);
  var li = document.createElement("li");
  li.id = cityListEl.length;
  li.innerHTML = city;
  cityListEl.push(city);
  console.log("City Array: " + cityListEl);
  searchedCitiesEl.append(li);


}

var createRow = function (response) {
  // Create a new table row element
  var tRow = $("<tr>");

  // Methods run on jQuery selectors return the selector they we run on
  // This is why we can create and save a reference to a td in the same statement we update its text
  var tempTd = $("<td>").text(response.main.temp);
  var humTd = $("<td>").text(response.main.humidity);
  var wspTd = $("<td>").text(response.wind.speed);
  // var uvTd = $("<td>").text(response.value);


  // Append the newly created table data to the table row
  $(".weather-data").empty();
  $(".weather-data").append(tempTd, humTd, wspTd);
  $("#temp").text(response.main.temp + `°`);
  console.log(response)
  $("#desc").text(response.weather[0].description)
  console.log(response)
  searchFiveDay();
  // Append the table row to the table body
  // $(".weather-data").append(tRow);
  // $(".weather-data").append(tempTd);
  // $(".weather-data").append(humTd);
  // document.getElementsByClassName(".weather-data")
};

function createUvRow(uVData) {
  $(".weather-data").append(uVData)
}


var searchFiveDay = function () {
  var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + "," + "US&appid=67552ce831bab1edacf38a97c7ac6639";
  console.log("Query URL: " + queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (fiveDayWeather) {
    // console.log("Five days: "+JSON.stringify(fiveDayWeather));

    var fiveDays = fiveDayWeather.list;
    var icons = [];
    for (var i = 0; i < 5; i++) {
      var icon = fiveDayWeather.list[i].weather[0].icon;
      console.log("icon src: " + icon);
      var qImg = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      $("#img" + i).attr("src", qImg);
      
    }

  

    var fiveDayArray = fiveDays.filter(function (weatherObj) {
      if (weatherObj.dt_txt.includes('06:00:00')) {
        return true
      } else {
        return false
      }
    })

  });
};

function weather() {
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=67552ce831bab1edacf38a97c7ac6639&units=imperial";
  $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function (response) {

      var curricon = response.weather[0].icon
      var weather = response.weather;
      var main = response.main;
      var wspd = response.wind.speed;
      var lat = response.coord.lat;
      var lon = response.coord.lon;


      // console.log(uv);

      var qImg = "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
      $("#icon").attr("src", qImg);
      createRow(response);

      var uVWeather = function () {
        var queryURL = 'https://api.openweathermap.org/data/2.5/uvi?appid=67552ce831bab1edacf38a97c7ac6639&lat=' + lat + '&lon=' + lon;
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function (uvresponse) {
          var uv = uvresponse.value;
          console.log("UV Index:" + uv);
          // createRow(response);
          createUvRow(uv)
        });
      };
      uVWeather();

      // console.log(lat);
      // console.log(lon);
      // console.log(icon);
      // console.log(weather);
      // console.log(main);
      // console.log(wspd);
      // createRow(response);
      searchFiveDay();

    });
}
weather();



addBtn.addEventListener("click", addCityToList);
addBtn.addEventListener("click", weather);
document.addEventListener("click", function (event) {
  if (event.target === modalEl) {
    close();
  }
});