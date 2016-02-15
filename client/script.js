var offset = (function() {
  var latest = 0;
  return {
    get: function() {
      return latest;
    },
    set: function(pixels) {
      latest = pixels.reduce(function(latest, pixel) {return latest < pixel.idx ? pixel.idx : latest; }, latest);
    }
  }
})();

var setPixels = (function() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext('2d');

  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var data = imageData.data;

  // Initalize all pixels to black and fully opaque.
  for (var i = 3; i < data.length; i += 4) {
    data[i] = 255;
  }
  ctx.putImageData(imageData, 0, 0);

  function getIdx (x, y) {
    return 4 * (canvas.width * y + x);
  }

  function getRed (color) {
    return parseInt(color.slice(0, 2), 16);
  }

  function getGreen (color) {
    return parseInt(color.slice(2, 4), 16);
  }

  function getBlue (color) {
    return parseInt(color.slice(4, 6), 16);
  }

  return function(pixels) {
    for (var i = 0; i < pixels.length; i++) {
      var pixel = pixels[i];
      var idx = getIdx(pixel.x, pixel.y);
      data[idx] = getRed(pixel.color);
      data[idx + 1] = getGreen(pixel.color);
      data[idx + 2] = getBlue(pixel.color);
    }
    ctx.putImageData(imageData, 0, 0);
    offset.set(pixels);
  }

})();


get("/canvas", function(err, board) {
  if (err) return console.error(err);
  setPixels(board);

  setInterval(function() {
    get("/canvas?offset=" + offset.get(), function(err, board) {
      if (err) return console.error(err);
      console.log("got pixels", board);
      setPixels(board);
    });
  }, 1000);

});





function get (url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.send('');
  xhr.onreadystatechange = function() {
    if (xhr.readyState < 4) {
      return;
    } else if (xhr.status !== 200) {
      return cb(new Error("Request failed."));
    } else {
      return cb(null, JSON.parse(xhr.responseText));
    }
  }
}

function drawBox (x0, y0, x1, y1, color) {
  var pixels = [];
  for (var x = x0; x <= x1; x++) {
    for (var y = y0; y <= y1; y++) {
      pixels.push({x: x, y: y, color: color});
    }
  }
  setPixels(pixels);
}