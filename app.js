
const express       = require("express");
const app           = express();
const moment        = require('moment');
const request       = require("request");
const bodyParser    = require("body-parser");

app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));


//requiring routes
var indexRoutes   = require("./routes/index");

app.use("/", indexRoutes);

app.listen(process.env.PORT || 4000,function(){
  console.log("The Weather App server has started!");
});
