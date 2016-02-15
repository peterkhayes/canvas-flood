var dgram = require("dgram");
var PORT = require("./constants").UDP_PORT;

module.exports = function(onMessage) {
  var server = dgram.createSocket("udp4");

  server.on("listening", () => {
    var address = server.address();
    console.log("Canvas Flood UDP server listening on", PORT);
  });

  server.on("message", onMessage);

  server.bind(PORT);

  return server;
}