

var COORD_SYSTEM_GPS = 'EPSG:4326';  // gps (long/lat) coord system..
var COORD_SYSTEM_OSM = 'EPSG:3857';  // SphericalMercatorCoords - google and OSM's coord system..

var map;
var baseMapLayer

var lastDropLocation = {};







    var lon = 86.7200;
    var lat = 21.9352;
    var zoomLavel = 12;
        
     baseMapLayer = new ol.layer.Tile({
      source: new ol.source.OSM()
    });

    map = new ol.Map({
        target: 'map',
        layers: [baseMapLayer],
        view: new ol.View({
            center: ol.proj.fromLonLat([lon, lat]),
            zoom: zoomLavel //Initial Zoom Level
        })
    });

    addInteraction();


    // var draw = new ol.interaction.Draw({
    //   source: new ol.source.OSM(),
     
    //   type: 'Box'
    // });
    // map.addInteraction(draw);


   




function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();

  lastDropLocation["x"] = ev.pageX;
    lastDropLocation["y"] = ev.pageY;

    var pixel = [ev.pageX, ev.pageY];
    var point = map.getCoordinateFromPixel(pixel);
    var pointArray = ol.proj.transform(point, 'EPSG:3857', 'EPSG:4326')

   

    // var mousePositionControl = new ol.control.MousePosition({
    //     coordinateFormat: function(coord) {return ol.coordinate.format(coord, template, 2);},
    //     projection: 'EPSG:4326',   
    //     undefinedHTML: '&nbsp;'
    //     });

        

  var lon = pointArray[0];
  var lat = pointArray[1];
  var marker = new ol.Feature({
      geometry: new ol.geom.Point(
      ol.proj.fromLonLat([lon, lat])
      ),  // Cordinates of Baripada Town
  });

  marker.setStyle(new ol.style.Style({
    image: new ol.style.Icon( ({
      src: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-64.png'
    }))
  }));

  var vectorSource = new ol.source.Vector({
    features: [marker]
  });

  var markerVectorLayer = new ol.layer.Vector({
    source: vectorSource,
  });

  map.addLayer(markerVectorLayer);

  var translate1 = new ol.interaction.Translate({
    features: new ol.Collection([marker])
  });

  map.addInteraction(translate1);

  map.on('singleclick', function (evt) {
    console.log(evt.coordinate);
});

}















