# USGS Earthquake Visualization

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) ![USGS](https://img.shields.io/badge/USGS-Data%20Provider-green.svg)

## Background

The United States Geological Survey (USGS) is responsible for providing scientific data about natural hazards, the health of ecosystems and the environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

## Instructions

The instructions for this activity are broken into two parts:

### Part 1: Create the Earthquake Visualization

Your first task is to visualize an earthquake dataset. Complete the following steps:

1. **Get your dataset:** The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the [USGS GeoJSON Feed](Links to an external site. page) and choose a dataset to visualize.

2. **Import and visualize the data:** Use Leaflet to create a map that plots all the earthquakes from your dataset based on their longitude and latitude.

    - Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.

    - The depth of the earth can be found as the third coordinate for each earthquake.

    - Include popups that provide additional information about the earthquake when its associated marker is clicked.

    - Create a legend that will provide context for your map data.

### Part 2: Gather and Plot More Data

Plot a second dataset on your map to illustrate the relationship between tectonic plates and seismic activity. You will need to pull in this dataset and visualize it alongside your original data. Data on tectonic plates can be found at [fraxen/tectonicplates](https://github.com/fraxen/tectonicplates).

Perform the following tasks:

- Plot the tectonic plates dataset on the map in addition to the earthquakes.
- Add other base maps to choose from.
- Put each dataset into separate overlays that can be turned on and off independently.
- Add layer controls to your map.

## References

Dataset created by the United States Geological Survey
