$("#search-btn").click(function () {
  event.preventDefault();
  var cityInput = $('#input').val();
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=a40d7a1a6831874bf11b6952becc82c2";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log('response:', response)
    
    




});

});

//second api call for 5 day forcast
//for loop




