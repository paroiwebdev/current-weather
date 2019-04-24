
const express       = require("express");
const app           = express();
const moment        = require('moment');
const request       = require("request");
const session       = require('express-session');
const bodyParser    = require("body-parser");

//requiring routes
var indexRoutes   = require("./routes/index");

app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

// passport config
app.use(require("express-session")({
  secret: "This is Man Utd!",
  resave: false,
  saveUninitialized: false
}));

app.use("/", indexRoutes);

app.listen(process.env.PORT || 4000,function(){
  console.log("The Weather App server has started!");
});
