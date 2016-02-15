var express          = require("express");

var createUDPServer  = require("./server/udp");
var createDataServer = require("./server/http");
var parseMessage     = require("./server/parse");
var grid             = require("./server/grid");

var CONSTANTS        = require("./server/constants");
var PRINT_INTERVAL   = CONSTANTS.PRINT_INTERVAL;
var ROLLUP_INTERVAL  = CONSTANTS.ROLLUP_INTERVAL;

var msgIdx = 0;
createUDPServer(function(buffer) {
  var message = parseMessage(buffer);
  if (message) {
    console.log("message", message);
    message.idx = msgIdx++;
    grid.set(message.x, message.y, message.color, message.user, message.idx);
  }
});

createDataServer(grid);

setInterval(grid.rollup, ROLLUP_INTERVAL);