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
      var count = 1000;
      var monthsBack = 3;
      var boxSize = 0.005;

      // Get Crime data from 3 months back
      var date = new Date();
      date.setMonth(date.getMonth() - monthsBack);
      date = date.toISOString().split("").slice(0,-5);
      date.push("Z");
      date = date.join("");

      // Build a bounding box
      // req.body.coordinates = [37.783409, -122.409176]; // Hack Reactor's coordinates
      var bbox = [req.body.coordinates[1]-boxSize, req.body.coordinates[0]-boxSize, req.body.coordinates[1]+boxSize, req.body.coordinates[0]+boxSize];
      bbox = bbox.join(",");

      // Build API query
      var crimeSpotEndPoint = "http://sanfrancisco.crimespotting.org/crime-data?format=json";
      crimeSpotEndPoint = crimeSpotEndPoint + "&count=" + count;
      crimeSpotEndPoint = crimeSpotEndPoint + "&dtstart=" + date;
      crimeSpotEndPoint = crimeSpotEndPoint + "&bbox=" + bbox;

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