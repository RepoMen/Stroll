module.exports = {
  "exampleEndPoint": {
    get: function(req, res){
      res.status(200).send("hi");
    },
    post: function(req, res){
      res.status(200).send("justPosted");
    }
  }
}