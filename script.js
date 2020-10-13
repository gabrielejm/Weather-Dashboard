$("#search-btn").click(function () {
  event.preventDefault();
  var cityInput = $('#input').val();
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=a40d7a1a6831874bf11b6952becc82c2";
  

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log('response:', response)
    var tempConvert =  Math.round((((response.main.temp) - 273.15)*1.8)+32);
    
    $('#daily-div').removeClass("hide");
    $('#city-date').text(response.name + " (" + (moment().format('l') + ")"))
    $('#temp-p').text("Temperature: " + tempConvert + " °F")
    $('#humid-p').text("Humidity: " + response.main.humidity + "%");
    $('#wind-p').text("Wind Speed: " + response.wind.speed + " MPH");
    $('#UV-p')
    




});

});

//second api call for 5 day forcast
//for loop





