// Set api token
mapboxgl.accessToken = 'pk.eyJ1Ijoicm9iaW4xNyIsImEiOiJjazkxOGFveGkwOGtzM2ZwN2ZyOGl5d2czIn0.0V3fWjvWY2f6HekoZ1w58A';

// Initialate map
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/robin17/ck91a3syy106u1ioaa6baw45a',
  center: [4.322840, 52.067101],
  zoom: 15,

});

  var popup = new mapboxgl.Popup()
     .setHTML('<h3>De Haagse Hogeschool</h3><p>Is momenteel dicht.</p>');

 
 var marker = new mapboxgl.Marker()
   .setLngLat([4.324439, 52.067200])
   .setPopup(popup)
  .addTo(map);


// Voeg de planner toe
map.addControl(
  new MapboxDirections({
    accessToken: mapboxgl.accessToken
  }),
  'bottom-left'
);

// Voeg de zoekbalk toe
map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
  })
);

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());