var express = require("express");
var router  = express.Router();
var request = require("request");
var moment  = require('moment');


var apiKey  = 'a74289eb1383fa0e57264af1b7f50051';

router.get("/", function(req,res){
  res.render("index",{
    weather       : null,
    time          : null,
    city          : null,
    country       : null,
    currTemp      : null,
    currWeather   : null,
    currWind      : null,
    currHumid     : null,
    currPressure  : null,
    sunrise       : null,
    sunset        : null
  });
});

router.post("/", function(req,res) {
  var city    = req.body.city;
  var url     = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  request(url, function(err,response,body){
    if(err){
      console.log(err);
      res.render("index", {weather: null, error: 'Error, please try again'});
    } else {
            var weather     = JSON.parse(body);
            console.log(weather);
            var currWeather = [];

            // current city
            currWeather['currCity']       = weather.name;
            //current country
            currWeather['currCountry']    = weather.sys.country;
            //current temperature
            currWeather['currTemp']       = Math.round(weather.main.temp);
            // barometric pressure in hPa
  					currWeather['pressure']			  = Math.round(weather.main.pressure);
            // humidity (in percent)
  					currWeather['humidity']			  = Math.round(weather.main.humidity);
            // wind speed
  					currWeather['windSpeed']		  = Math.round(weather.wind.speed);
            //current time and date
            currWeather['currTime']       = weather.dt;
            //Convert from UTC to GMT
            currWeather['currTime']       = moment.unix(currWeather['currTime']).format("DD-MM-YYYY HH:mm:ss a");
            //sunrise
            currWeather['sunrise']        = weather.sys.sunrise;
            //Convert from UTC to GMT
            currWeather['sunrise']        = moment.unix(currWeather['sunrise']).format("HH:mm:ss a");
            //sunset
            currWeather['sunset']         = weather.sys.sunset;
            //Convert from UTC to GMT
            currWeather['sunset']         = moment.unix(currWeather['sunset']).format("HH:mm:ss a");

            res.render("index", {
              time          : currWeather['currTime'],
              city          : currWeather['currCity'],
              country       : currWeather['currCountry'],
              currTemp      : currWeather['currTemp']+"\xB0",
              currPressure  : currWeather['pressure'],
              currHumid     : currWeather['humidity'],
              currWind      : currWeather['windSpeed'],
              sunrise       : currWeather['sunrise'],
              sunset        : currWeather['sunset']
            });
        }
  });
});
module.exports = router;
