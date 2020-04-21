// Set api token
mapboxgl.accessToken = 'pk.eyJ1Ijoicm9iaW4xNyIsImEiOiJjazkxOGFveGkwOGtzM2ZwN2ZyOGl5d2czIn0.0V3fWjvWY2f6HekoZ1w58A';

// Initialate map
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/robin17/ck91a3syy106u1ioaa6baw45a',
  center: [4.3707859780647595, 52.048796831847454],
  zoom: 12,

});

  var popup = new mapboxgl.Popup()
     .setHTML('<h3>De Bosplas</h3><p>De plek voor de landing.</p>');

 
 var marker = new mapboxgl.Marker()
   .setLngLat([4.3707859780647595, 52.048796831847454])
   .setPopup(popup)
  .addTo(map);



// Voeg de zoekbalk toe
map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
  }), 'bottom-left'
);

// voeg stad toe
map.addControl(new mapboxgl.NavigationControl());

var cities = [
  
  {
    name: 'Den Haag',
    coordinates: [4.3110216669828105, 52.079582527427874]
  },
  {
    name: 'Voorburg',
    coordinates: [4.356694609184501, 52.07075254325255]
  },
  {
    name: 'Rijswijk',
    coordinates: [4.318361401664902, 52.045494075778095]
  },
  {
    name: 'Nootdorp',
    coordinates: [4.393767625444752, 52.04333042145183]
  },
  {
    name: 'Boswijk',
    coordinates: [4.365317815172602, 52.04630134510029]
  },
];

var openWeatherMapUrl = 'https://api.openweathermap.org/data/2.5/weather';
var openWeatherMapUrlApiKey = '6a719e3c4dfb752cbb9fe577d9c14591';

map.on('load', function () {
  cities.forEach(function(city) {
    // Usually you do not want to call an api multiple times, but in this case we have to
    // because the openWeatherMap API does not allow multiple lat lon coords in one request.
    var request = openWeatherMapUrl + '?' + 'appid=' + openWeatherMapUrlApiKey + '&lon=' + city.coordinates[0] + '&lat=' + city.coordinates[1];

    // krijg het weer van de coordinaten
    fetch(request)
      .then(function(response) {
        if(!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(function(response) {
        // Then plot the weather response + icon on MapBox
        plotImageOnMap(response.weather[0].icon, city)
      })
      .catch(function (error) {
        console.log('ERROR:', error);
      });
  });
});

function plotImageOnMap(icon, city) {
  map.loadImage(
    'http://openweathermap.org/img/w/' + icon + '.png',
    function (error, image) {
      if (error) throw error;
      map.addImage("weatherIcon_" + city.name, image);
      map.addSource("point_" + city.name, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: city.coordinates
            }
          }]
        }
      });
      map.addLayer({
        id: "points_" + city.name,
        type: "symbol",
        source: "point_" + city.name,
        layout: {
          "icon-image": "weatherIcon_" + city.name,
          "icon-size": 1.3
        }
      });
    }
  );
}