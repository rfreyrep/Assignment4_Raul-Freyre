var map = L.map('map').setView([38, -95], 4); 

// adding a different basemap (CartoDB Positron)
var basemapUrl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';
var basemap = L.tileLayer(basemapUrl, {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    opacity: 1.0 
}).addTo(map);


// Source: Iowa State University Mesonet
var radarUrl = 'https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi';
var radarDisplayOptions = {
    layers: 'nexrad-n0r-900913',
    format: 'image/png',
    transparent: true
};
var radar = L.tileLayer.wms(radarUrl, radarDisplayOptions).addTo(map);

var weatherAlertsUrl = 'https://api.weather.gov/alerts/active?region_type=land';
$.getJSON(weatherAlertsUrl, function(data) {
    L.geoJSON(data, {
        style: function(feature) {
            
            var alertColor = 'orange'; 

             
            if (feature.properties.severity === 'Severe') {
                alertColor = 'red';
            }
            
            // Using a different colour if the severity is extreme 
            if (feature.properties.severity === 'Extreme') {
                alertColor = 'magenta'; 
            }
            
            // making the minor alerts visible
             if (feature.properties.severity === 'Minor') {
                 alertColor = 'yellow';
             }

            // GeoJSON is drawn as a solid polygon
            return {
                color: alertColor,
                fillOpacity: 0.6, 
                weight: 1
            };
        },
        onEachFeature: function(feature, layer) {
            // Adding Pop-up to display headline at click
            layer.bindPopup(feature.properties.headline);
        }
    }).addTo(map);
});

