var url     = require("url");
var express = require("express");

var PORT = require("./constants").HTTP_PORT;

module.exports = function(grid) {

  var app = express();
  app.use(express.static("client"));

  app.get("/canvas", function(req, res) {
    var query = url.parse(req.url, true).query;
    var offset = query.offset ? Number(query.offset) : 0;
    var data = grid.get(offset);
    return res.json(data).send();
  });

  app.listen(PORT, function() {
    console.log("Canvas Flood HTTP server listening on", PORT);
  });

};