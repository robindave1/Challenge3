// Set api token
mapboxgl.accessToken = 'pk.eyJ1Ijoicm9iaW4xNyIsImEiOiJjazkxOGFveGkwOGtzM2ZwN2ZyOGl5d2czIn0.0V3fWjvWY2f6HekoZ1w58A';

// Initialate map
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  //style: 'mapbox://styles/mapbox/satellite-v9'
  // style: 'mapbox://styles/mapbox/dark-v10'
  // pitch: 45,
  // bearing: -17.6,
  // Positioning the map on a certain longitute + latitude and zooming in
  // Let op de volgorde van de lat, lon!!
  center: [4.322840, 52.067101],
  zoom: 15,

});


// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());