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

  "sendSinchMessage": {
    post: function(req, res){
      console.log('req body',req.body);
      // request.post(url,callback)
      request({
      method: 'POST',
      url: 'https://messagingapi.sinch.com/v1/sms/19738655005',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      data: {
        "message":"TEST"
      },
      user:
        "application\\" + req.body.key + ":" + req.body.secret
      })
      .then(function(res) {
        console.log('res happened');
        return res;
      })
      .catch(function(error) {
        console.log('Error sending message');
      });
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

      // Build a bounding box
      req.body.coordinates = [37.783409, -122.409176]; // Hack Reactor's coordinates
      var bbox = [req.body.coordinates[1]-0.01, req.body.coordinates[0]-0.01, req.body.coordinates[1]+0.01, req.body.coordinates[0]+0.01];
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
