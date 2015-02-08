var express = require("express");
var cors = require("cors");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var path = require("path");

var router = require("express").Router();
var routes = require("./app/routes");

var app = express();
var port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({"extended": "true"}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "./public")));

for(var route in routes){
  for(var method in routes[route]){
    app[method]('/' + route, routes[route][method]);
  }
}

app.listen(port);
console.log("You are now logged into port " + port);
