// Ensure chooseColor is defined in the global scope
function chooseColor(depth) {
    return depth > 90 ? "#ea2c2c" :
           depth > 70 ? "#ea822c" :
           depth > 50 ? "#ee9c00" :
           depth > 30 ? "#eecc00" :
           depth > 10 ? "#d4ee00" :
                        "#98ee00";
}

var myMap = L.map('map').setView([40.7608, -111.8910], 5); // Center on Salt Lake City, Utah

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(myMap);

// Using D3 to fetch GeoJSON data
d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson').then(function(data) {
    function markerSize(magnitude) {
        return magnitude * 20000;
    }

    L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            return L.circle(latlng, {
                radius: markerSize(feature.properties.mag),
                fillColor: chooseColor(feature.geometry.coordinates[2]),
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });
        },
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3>" + feature.properties.place +
            "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" +
            "<p>Magnitude: " + feature.properties.mag + "</p>" +
            "<p>Depth: " + feature.geometry.coordinates[2] + " km</p>");
        }
    }).addTo(myMap);
});

// Add a legend
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
    depths = [-10, 10, 30, 50, 70, 90],
    labels = [];

    div.innerHTML += '<strong>Depth (km)</strong><br>';

    for (var i = 0; i < depths.length; i++) {
        div.innerHTML +=
        '<i style="background:' + chooseColor(depths[i] + 1) + '"></i> ' +
        depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + ' km<br>' : '+ km');
    }

    return div;
};

legend.addTo(myMap);
