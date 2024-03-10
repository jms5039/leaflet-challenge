var myMap = L.map("map", {
  center: [39.9526, -75.1652], // Updated to Philadelphia's coordinates
  zoom: 4
});

var satelliteMap = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
  attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
}).addTo(myMap);

var grayscaleMap = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}", {
  attribution: "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ"
});

var outdoorsMap = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", {
  attribution: "Tiles &copy; Esri &mdash; Esri, USGS, NOAA"
});

var baseMaps = {
  "Satellite": satelliteMap,
  "Grayscale": grayscaleMap,
  "Outdoors": outdoorsMap
};

var tectonicPlates = new L.LayerGroup();
var earthquakes = new L.LayerGroup();

var overlayMaps = {
  "Tectonic Plates": tectonicPlates,
  "Earthquakes": earthquakes
};

L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);

// Load tectonic plates data using D3
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json")
  .then(function(data) {
    L.geoJSON(data, {
      color: "orange",
      weight: 2
    }).addTo(tectonicPlates);
    tectonicPlates.addTo(myMap);
  })
  .catch(function(error) {
    console.error("Error loading tectonic plates data:", error);
  });

// Load earthquake data using D3
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson")
  .then(function(data) {
    L.geoJSON(data, {
      pointToLayer: function (feature, latlng) {
        var magnitude = feature.properties.mag;
        var depth = feature.geometry.coordinates[2];
        return L.circle(latlng, {
          color: "black",
          fillColor: getColor(depth),
          fillOpacity: 0.75,
          radius: magnitude * 20000
        });
      },
      onEachFeature: onEachFeature
    }).addTo(earthquakes);
    earthquakes.addTo(myMap);
  })
  .catch(function(error) {
    console.error("Error loading earthquake data:", error);
  });

function getColor(depth) {
  return depth > 90 ? "#ea2c2c" :
         depth > 70 ? "#ea822c" :
         depth > 50 ? "#ee9c00" :
         depth > 30 ? "#eecc00" :
         depth > 10 ? "#d4ee00" :
                      "#98ee00";
}

function onEachFeature(feature, layer) {
  if (feature.properties && feature.properties.place) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr>
      <p>${new Date(feature.properties.time)}</p>
      <p>Magnitude: ${feature.properties.mag}</p>
      <p>Depth: ${feature.geometry.coordinates[2]} km</p>`);
  }
}

// Ensure the legend is added to the map
var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend'),
      depths = [-10, 10, 30, 50, 70, 90],
      labels = [];

  div.innerHTML = '<strong>Depth (km)</strong><br>';
  for (var i = 0; i < depths.length; i++) {
    div.innerHTML +=
        '<i style="background:' + getColor(depths[i] + 1) + '"></i> ' +
        depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + ' km<br>' : '+ km');
  }

  return div;
};

legend.addTo(myMap);
