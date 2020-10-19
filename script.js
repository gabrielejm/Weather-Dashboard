var tempConvert;
var weatherIcon;
var iconURL;
var lat;
var long;
var uvURL;
var currentDate;
var fiveDayIcon;
var history;
var counter;
//function created in order to make api call in multiple places
function getweather(city) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=a40d7a1a6831874bf11b6952becc82c2";
  var apiKey = "a40d7a1a6831874bf11b6952becc82c2";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log("response:", response);
    tempConvert = Math.round((response.main.temp - 273.15) * 1.8 + 32);
    weatherIcon = response.weather[0].icon;
    iconURL = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
    lat = response.coord.lat;
    lon = response.coord.lon;
    uvURL =
      "https://api.openweathermap.org/data/2.5/uvi?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=a40d7a1a6831874bf11b6952becc82c2";

    $("#daily-div").removeClass("hide");
    $("#city-date").text(response.name + " (" + (moment().format("l") + ")"));
    $("#city-date").append("<span><img src=" + iconURL + "></span>");
    $("#temp-p").text("Temperature: " + tempConvert + " °F");
    $("#humid-p").text("Humidity: " + response.main.humidity + "%");
    $("#wind-p").text("Wind Speed: " + response.wind.speed + " MPH");

    $.ajax({
      url: uvURL,
      method: "GET",
    }).then(function (response) {
      uvValue = response.value;
      $("#UV-p").html(
        "<p>UV Index:<span id='uvText'> " + response.value + "</span></p>"
      );
      if (response.value < 3) {
        $("#uvText").addClass("bg-success");
      } else if (response.value > 2 || response.value < 8) {
        $("#uvText").addClass("bg-warning");
      } else {
        $("#uvText").addClass("bg-danger");
      }
    });
  });

  var fivedayinput = $("#input").val();
  var fivedayURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    fivedayinput +
    "&appid=a40d7a1a6831874bf11b6952becc82c2";

  $.ajax({
    url: fivedayURL,
    method: "GET",
  }).then(function (response) {
    console.log("responsefiveday:", response);
    for (let i = 0; i < response.list.length; i++) {
      if (response.list[i].dt_txt.indexOf("15:00:00") > 0) {
        console.log(response.list[i]);
      }
    }
    currentDate = moment().format("l");
    tempConvert = Math.round((response.list[7].main.temp - 273.15) * 1.8 + 32);
    fiveDayIcon = response.list[7].weather[0].icon;
    fiveDayIconURL =
      "https://openweathermap.org/img/wn/" + fiveDayIcon + "@2x.png";

    $("#five-day-div")
      .find(".card-body")
      .each(function (index, element) {
        console.log("index:", index);
        console.log("element:", element);

        // counter = 0;
        // counter++;
        // $(".five-day-date").text(
        //   moment().add(counter, "days").format("MM-DD-YYYY")
        // );
        // $(".five-day-icon").html(
        //   "<span><img src=" + fiveDayIconURL + "></span>"
        // );
        // $(".five-day-temp").text("Temp: " + tempConvert + " °F");
        // $(".five-day-humid").text(
        //   "Humidity: " + response.list[7].main.humidity + "%"
        // );
      });
  });
  //retreiving history from local storage IF the city thats being search is not in the history list
  var historylist = JSON.parse(localStorage.getItem("historylist")) || [];
  if (historylist.indexOf(city) === -1) {
    historylist.push(city);
  }
  //saving updated data back to local storage
  localStorage.setItem("historylist", JSON.stringify(historylist));
  //removing current html and empties history contents from html
  $("#history").html("");
  historylist.forEach((history) => {
    var item = $("<li>").text(history).addClass("list-group-item");
    item.on("click", function (event) {
      var city = event.target.innerText;
      getweather(city);
    });

    //adding <li> element to #history element
    $("#history").append(item);
  });
}

$("#search-btn").click(function () {
  event.preventDefault();
  var cityInput = $("#input").val();
  getweather(cityInput);
});

//second api call for 5 day forcast
//for loop
