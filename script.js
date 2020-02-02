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
    li.innerHTML = city + " <button>Weather Info:</button>";
    cityListEl.push({city: city});
    searchedCitiesEl.append(li);
}

function close() {
  modalEl.style.display = "none";
}

function handleClick(event) {
  if (event.target.matches("button")) {
    event.preventDefault();
    modalEl.style.display = "block";
    currentId = parseInt(event.target.parentElement.id);
    var city = cityListEl[currentId].city;
    var weatherInfo = cityList[currentId].weatherInfo;
    modalCityEl.textContent = city;
    if(weatherInfo) {
      weatherInfoEl.value  = weatherInfo;
    } else {
      weatherInfoEl.value = "";
    }
  }
}

closeEl.addEventListener("click", close);
saveBtn.addEventListener("click", function(event) {
  event.preventDefault();
  people[currentId].description = descriptionEl.value;
  close();
});

var searchOMDB = function(weather) {
  var queryURL = 'https://fcc-weather-api.glitch.me/api/current?lat=53.7071&lon =-1.24';
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    createRow(response);
  });
};
weather();

addBtn.addEventListener("click", addCityToList);
searchedCitiesEl.addEventListener("click", handleClick);
document.addEventListener("click", function(event) {
  if (event.target === modalEl) {
    close();
  }
});
addCityToList();

