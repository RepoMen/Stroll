var request = require("request");

module.exports = {
  "exampleEndPoint": {
    get: function(req, res){
      res.status(200).send("hi");
    },
    post: function(req, res){
      res.status(200).send("justPosted");
    }
  },

  "sfCrimeData": {
    get: function(req, res){
      var count = 100;
      // Get Crime data from 3 months back
      var date = new Date();
      date.setMonth(date.getMonth() - 3);
      date = date.toISOString().split("").slice(0,-5);
      date.push("Z");
      date = date.join("");

      var crimeSpotEndPoint = "http://sanfrancisco.crimespotting.org/crime-data?format=json";
      crimeSpotEndPoint = crimeSpotEndPoint + "&count=" + count;
      crimeSpotEndPoint = crimeSpotEndPoint + "&dtstart=" + date;

      request.get(crimeSpotEndPoint, function(error, crimeData){
        if (error) {
          console.error(error);
          res.status(400).send(error);
        } else {
          res.status(200).send(crimeData.body);
        }
      });
    }
  }
}