// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");
require("component-leaflet-map");
var dot = require("./lib/dot");

var popup = dot.compile(require("./_popup.html"));

var mapElement = document.querySelector("leaflet-map");
var map = mapElement.map;
var L = mapElement.leaflet;

// map.on("click", function(e) {
//   console.log([e.latlng.lat, e.latlng.lng]);
// });

//do not load tiles we can't see
mapElement.lookup.painting.options.bounds = map.options.maxBounds;
map.fitBounds(map.options.maxBounds);
// window.addEventListener("resize", () => map.fitBounds(map.options.maxBounds));

window.paintings.forEach(function(row) {
  var shape;
  if (row.poly) {
    var points = row.poly.split(",").map(Number);
    var latlngs = [];
    for (var i = 0; i < points.length; i += 2) {
      latlngs.push([points[i], points[i+1]]);
    }
    shape = L.polygon(latlngs, { className: "painting-box" });
  } else if (row.ne) {
    var ne = row.ne.split(",").map(Number);
    var sw = row.sw.split(",").map(Number);
    shape = L.rectangle([ne, sw], { className: "painting-box" });
  }
  if (!shape) return;
  shape.addTo(map);
  shape.data = row;
  shape.setStyle({
    stroke: false
  });
  var html = popup(row);
  shape.bindPopup(popup(row));
});

// var fullscreen = 
//   "requestFullscreen" in document.body ? "requestFullscreen" :
//   "msRequestFullscreen" in document.body ? "msRequestFullscreen" :
//   "webkitRequestFullscreen" in document.body ? "webkitRequestFullscreen" :
//   "mozRequestFullScreen" in document.body ? "mozRequestFullScreen" :
//   null;

// if (fullscreen) document.body.classList.add("fullscreen-capable");

// document.querySelector(".fullscreen-toggle").addEventListener("click", function() {
//   mapElement[fullscreen]();
//   map.options.scrollWheelZoom = true;
// });

