# Assignment 4: Leaflet Web Map with OpenStreetMap

## WebGIS Course Project

### Author: Raul Freyre

This repository hosts two complex web maps built with Leaflet to display real-time geospatial data, fulfilling all requirements for Assignment 4.

---

## 1. Weather Map
### A live weather map displaying real-time NEXRAD radar  and active severe weather alerts from the National Weather Service (NWS). The map uses CartoDB Positron as its base layer.

Key Features:
* WMS Radar Layer.
* Alert Symbology: Alerts are styled by severity: 'Severe' (Red), 'Extreme' (Magenta), and 'Minor' (Yellow).
* Pop-ups: Displays the alert headline on click.

Map Link:
<https://rfreyrep.github.io/Assignment4_Raul-Freyre/weather>

---

## 2. Earthquake Map


### A map showing recent global earthquake data (24-hour summary) provided by the U.S. Geological Survey (USGS).


* Custom Markers: Earthquakes are represented by **circle markers** styled by size and color based on their magnitude.
* Pop-ups: Displays the earthquake's **magnitude, location, and time** on click.
* Custom Legend: Includes a legend that explains the magnitude-based color symbology.

Map Link:
<https://rfreyrep.github.io/Assignment4_Raul-Freyre/earthquake>

---

## Submission Details

All source files are included in this repository. The final submission includes:

* Two separate maps located in the /weather and /earthquake subfolders.
* The overall goal was to host the application on GitHub Pages.