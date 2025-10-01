// 1. Initialize the map object and center it on the USA
var map = L.map('map').setView([38, -95], 4); 

// Adding a different basemap (CartoDB Positron) for a clean background
var basemapUrl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';
var basemap = L.tileLayer(basemapUrl, {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    opacity: 1.0 
}).addTo(map);

// Source: USGS Earthquake Data [cite: 9]
var earthquakeUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

// Function to determine marker color based on magnitude (Requisito 3(3) and 3(4))
function getColor(magnitude) {
    // Defines the severity levels based on the magnitude of the earthquakes [cite: 23, 24]
    return magnitude > 5 ? '#bd0026' : // Red for high magnitude
           magnitude > 4 ? '#f03b20' : // Dark orange
           magnitude > 3 ? '#fd8d3c' : // Orange
           magnitude > 2 ? '#feb24c' : // Light orange
           magnitude > 1 ? '#fed976' : // Yellow
                         '#ffffb2'; // Light yellow for minor
}

// Function to determine marker size based on magnitude (Requisito 3(3))
function getRadius(magnitude) {
    return magnitude * 4; // Multiplier to make smaller earthquakes visible
}

// Fetch GeoJSON data from USGS
$.getJSON(earthquakeUrl, function(data) {
    L.geoJSON(data, {
        // Requisito 3(1): Create a marker on the map for each earthquake
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng, {
                radius: getRadius(feature.properties.mag), // Size based on magnitude
                fillColor: getColor(feature.properties.mag), // Color based on magnitude
                color: "#000", // Border color
                weight: 1, // Border weight
                opacity: 1,
                fillOpacity: 0.8
            });
        },
        // Requisito 3(2): Add a popup displaying magnitude, location, and time
        onEachFeature: function(feature, layer) {
            var magnitude = feature.properties.mag;
            var place = feature.properties.place;
            // Convert UNIX timestamp to readable time string
            var time = new Date(feature.properties.time).toLocaleString(); 

            layer.bindPopup(
                "<b>Magnitude:</b> " + magnitude + "<br>" +
                "<b>Location:</b> " + place + "<br>" +
                "<b>Time:</b> " + time
            );
        }
    }).addTo(map);

    // Requisito 3(4): Create a legend on the map
    var legend = L.control({ position: 'bottomright' });

    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend'),
            magnitudes = [0, 1, 2, 3, 4, 5],
            labels = [];

        div.innerHTML += '<h4>Earthquake<br>Magnitude</h4>'; // Legend title
        
        // Loop through magnitude intervals and create colored squares
        for (var i = 0; i < magnitudes.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(magnitudes[i] + 1) + '"></i> ' +
                magnitudes[i] + (magnitudes[i + 1] ? '&ndash;' + magnitudes[i + 1] + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(map);

});
