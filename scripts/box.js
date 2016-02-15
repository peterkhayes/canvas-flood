var args = process.argv.slice(2);
var x0 = parseInt(args[0], 10);
var y0 = parseInt(args[1], 10);
var x1 = parseInt(args[2], 10);
var y1 = parseInt(args[3], 10);
var color = args[4];
var user = args[5];

var PORT = require("../server/constants").UDP_PORT;

var dgram = require("dgram");
var client = dgram.createSocket("udp4");

var total = (x1 - x0 + 1) * (y1 - y0 + 1);
var sent = 0;

for (var x = x0; x <= x1; x++) {
  for (var y = y0; y <= y1; y++) {
    var message = new Buffer([x, y, color, user].join(" "));
    client.send(message, 0, message.length, PORT, "127.0.0.1", function() {
      if (++sent === total) client.close();
    });
  }
}