var SIZE = require("./constants").SIZE;
var SIZE2 = SIZE * SIZE;

var board = [];

for (var i = 0; i < SIZE2; i++) {
  board.push([]);
}

function getIdx (x, y) {
  return SIZE * y + x;
}

function getLatest (cell) {
  return cell[cell.length - 1];
}

function getLatestFrom (users, cell) {
  if (cell.length === 0) return null;
  for (var i = cell.length; i--;) {
    if (users.indexOf(cell[i].user) > -1) {
      return cell[i];
    }
  }
  return null;
}

function getLatestWithout (users, cell) {
  if (cell.length === 0) return null;
  for (var i = cell.length; i--;) {
    if (users.indexOf(cell[i].user) === -1) {
      return cell[i];
    }
  }
  return null;
}



module.exports = {

  set: function (x, y, color, user, idx) {
    board[getIdx(x, y)].push({x, y, user, color, idx});
  },

  get: function(offset, include, exclude) {
    var getLatestFn;
    if (include && include.length > 0) {
      getLatestFn = getLatestFrom.bind(null, include);
    } else if (exclude && exclude.length > 0) {
      getLatestFn = getLatestWithout.bind(null, exclude);
    } else {
      getLatestFn = getLatest;
    }

    var output = [];
    for (var x = 0; x < SIZE; x++) {
      for (var y = 0; y < SIZE; y++) {
        var idx = getIdx(x, y);
        var latest = getLatestFn(board[idx])
        if (latest && latest.idx > offset) output.push(latest);
      }
    }
    return output;
  },

  rollup: function() {
    board = board.map(function (cell) {
      if (cell.length === 0) return cell;
      var usersSeen = {};
      var output = [];
      for (var i = cell.length; i--;) {
        if (!usersSeen[cell[i].user]) {
          output.push(cell[i]);
          usersSeen[cell[i].user] = true;
        }
      }
      return output.reverse();
    });
  },

};