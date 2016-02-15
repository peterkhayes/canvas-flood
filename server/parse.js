var CONSTANTS = require("./constants");

var SIZE        = CONSTANTS.SIZE;
var COLOR_REGEX = CONSTANTS.COLOR_REGEX;

module.exports = function(msg) {
  var str = msg.toString().split(" ");

  var x = parseInt(str[0], 10);
  var y = parseInt(str[1], 10);
  var color = str[2];
  var user = str[3];

  if (x < 0 || x >= SIZE) return null;
  if (y < 0 || y >= SIZE) return null;
  if (!COLOR_REGEX.test(color)) return null;
  if (user.length > 50) return null;

  return {x, y, color, user};
}