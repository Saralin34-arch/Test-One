// Module 5: Geospatial Structures Script
// Combines Mapbox foundation, advanced features, and external data loading

console.log("Module 5: Geospatial Structures script loading...");

// Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1Ijoic2FyYWxpbjMwNCIsImEiOiJjbWRjY2M4OTYwOWZiMmxvazMyOWkwcW0xIn0.02wSv2MXs9AGoBqLdi6wQg';

// Global variables
let map1, map2, map3;
let linesVisible = true;
let regionsVisible = true;

// Initialize all maps
function initMaps() {
  console.log("Initializing maps...");
  initMap2();
  initMap3();
  setupControls();
}

// Map 1: Foundation - Interactive Map with Markers (REMOVED - container deleted)
// function initMap1() {
//   console.log("Initializing Map 1...");
//   map1 = new mapboxgl.Map({
//     container: 'mapbox-container-1',
//     style: 'mapbox://styles/mapbox/light-v11',
//     center: [-73.94723, 40.7462],
//     zoom: 12.18,
//     pitch: 0,
//     bearing: 0
//   });

//   map1.addControl(new mapboxgl.NavigationControl(), 'top-right');
//   map1.addControl(new mapboxgl.FullscreenControl(), 'top-right');
//   map1.addControl(new mapboxgl.ScaleControl({
//     maxWidth: 80,
//     unit: 'metric'
//   }), 'bottom-left');

//   map1.on('load', () => {
//     console.log("Map 1 loaded successfully");
//     // Add markers for NYC landmarks
//     const landmarks = [
//       { name: 'Times Square', coordinates: [-73.9855, 40.7580] },
//       { name: 'Central Park', coordinates: [-73.9654, 40.7829] },
//       { name: 'Brooklyn Bridge', coordinates: [-73.9969, 40.7061] },
//       { name: 'Statue of Liberty', coordinates: [-74.0445, 40.6892] },
//       { name: 'Empire State Building', coordinates: [-73.9857, 40.7484] }
//     ];

//     landmarks.forEach(landmark => {
//       const el = document.createElement('div');
//       el.className = 'marker';
//       el.style.width = '20px';
//       el.style.height = '20px';
//       el.style.borderRadius = '50%';
//       el.style.backgroundColor = '#000';
//       el.style.border = '2px solid #fff';
//       el.style.cursor = 'pointer';

//       new mapboxgl.Marker(el)
//         .setLngLat(landmark.coordinates)
//         .setPopup(new mapboxgl.Popup().setHTML(`<h3>${landmark.name}</h3>`))
//         .addTo(map1);
//     });

//     // Display coordinates on click
//     map1.on('click', (e) => {
//       const coordinates = e.lngLat;
//       new mapboxgl.Popup()
//         .setHTML(`Longitude: ${coordinates.lng.toFixed(4)}<br>Latitude: ${coordinates.lat.toFixed(4)}`)
//         .addTo(map1);
//     });
//   });

//   map1.on('error', (e) => {
//     console.error("Map 1 error:", e);
//   });
// }

// Map 2: Advanced - Line Features and Regions
function initMap2() {
  console.log("Initializing Map 2...");
  map2 = new mapboxgl.Map({
    container: 'mapbox-container-2',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [-76.1436367, 43.0457539], // Syracuse downtown coordinates
    zoom: 12 // Zoomed out to show the full city area
  });

  map2.on('load', () => {
    console.log("Map 2 loaded successfully");
    
    // Load Syracuse city boundaries
    console.log('Attempting to load Syracuse city boundaries...');
    fetch('../../demos/syracuse_city_boundaries.geojson')
      .then(response => {
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log('Response received, parsing JSON...');
        return response.json();
      })
      .then(syracuseCityData => {
        console.log('Syracuse city boundaries loaded successfully:', syracuseCityData);
        console.log('Number of features:', syracuseCityData.features ? syracuseCityData.features.length : 'No features');
        
        // Add Syracuse city boundaries as a source
        map2.addSource('syracuse-city', {
          type: 'geojson',
          data: syracuseCityData
        });

        // Add fill layer for Syracuse city (COMMENTED OUT - keeping only downtown)
        // console.log('Adding Syracuse city fill layer...');
        // map2.addLayer({
        //   id: 'syracuse-city-fill',
        //   type: 'fill',
        //   source: 'syracuse-city',
        //   paint: {
        //     'fill-color': '#4CAF50',
        //     'fill-opacity': 0.3
        //   }
        // });

        // Add border layer for Syracuse city (COMMENTED OUT - keeping only downtown)
        // console.log('Adding Syracuse city border layer...');
        // map2.addLayer({
        //   id: 'syracuse-city-border',
        //   type: 'line',
        //   source: 'syracuse-city',
        //   paint: {
        //     'line-color': '#2E7D32',
        //     'line-width': 3,
        //     'line-opacity': 0.8
        //   }
        // });

        // Add fill layer for downtown Syracuse (second feature)
        console.log('Adding downtown Syracuse fill layer...');
        map2.addLayer({
          id: 'syracuse-downtown-fill',
          type: 'fill',
          source: 'syracuse-city',
          paint: {
            'fill-color': '#FF9800',
            'fill-opacity': 0.5
          },
          filter: ['==', ['get', 'name'], 'Downtown Syracuse']
        });

        // Add border layer for downtown Syracuse
        map2.addLayer({
          id: 'syracuse-downtown-border',
          type: 'line',
          source: 'syracuse-city',
          paint: {
            'line-color': '#E65100',
            'line-width': 2,
            'line-opacity': 0.9
          },
          filter: ['==', ['get', 'name'], 'Downtown Syracuse']
        });

        // Add hover effects for Syracuse city (COMMENTED OUT - keeping only downtown)
        // map2.on('mouseenter', 'syracuse-city-fill', () => {
        //   map2.getCanvas().style.cursor = 'pointer';
        //   map2.setPaintProperty('syracuse-city-fill', 'fill-opacity', 0.5);
        // });

        // map2.on('mouseleave', 'syracuse-city-fill', () => {
        //   map2.getCanvas().style.cursor = '';
        //   map2.setPaintProperty('syracuse-city-fill', 'fill-opacity', 0.3);
        // });

        // Add hover effects for downtown Syracuse
        map2.on('mouseenter', 'syracuse-downtown-fill', () => {
          map2.getCanvas().style.cursor = 'pointer';
          map2.setPaintProperty('syracuse-downtown-fill', 'fill-opacity', 0.5);
        });

        map2.on('mouseleave', 'syracuse-downtown-fill', () => {
          map2.getCanvas().style.cursor = '';
          map2.setPaintProperty('syracuse-downtown-fill', 'fill-opacity', 0.3);
        });

        // Add click events for Syracuse city (COMMENTED OUT - keeping only downtown)
        // map2.on('click', 'syracuse-city-fill', (e) => {
        //   const coordinates = e.lngLat;
        //   const properties = e.features[0].properties;
          
        //   new mapboxgl.Popup()
        //     .setLngLat(coordinates)
        //     .setHTML(`
        //       <div style="text-align: center;">
        //         <h4>${properties.name}</h4>
        //         <p><strong>State:</strong> ${properties.state || 'NY'}</p>
        //         <p><strong>Area:</strong> ${properties.area || 'N/A'}</p>
        //         <p><strong>Population:</strong> ${properties.population || 'N/A'}</p>
        //         <p>${properties.description}</p>
        //       </div>
        //     `)
        //     .addTo(map2);
        // });

        // Add click events for downtown Syracuse
        map2.on('click', 'syracuse-downtown-fill', (e) => {
          const coordinates = e.lngLat;
          const properties = e.features[0].properties;
          
          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(`
              <div style="text-align: center;">
                <h4>${properties.name}</h4>
                <p><strong>Area:</strong> ${properties.area}</p>
                <p>${properties.description}</p>
              </div>
            `)
            .addTo(map2);
        });
      })
      .catch(error => {
        console.error('Error loading Syracuse city boundaries:', error);
        // Error message removed - no longer displaying to user
      });

    // Add Syracuse downtown route (example line feature) - REMOVED
    // const syracuseRoute = {
    //   type: 'Feature',
    //   properties: {
    //     name: 'Syracuse Downtown Route',
    //     description: 'Main route through downtown Syracuse'
    //   },
    //   geometry: {
    //     type: 'LineString',
    //     coordinates: [
    //       [-76.2294, 43.0457], // West side
    //       [-76.1436, 43.0457], // Downtown center
    //       [-76.0578, 43.0457]  // East side
    //     ]
    //   }
    // };

    // map2.addSource('syracuse-route', {
    //   type: 'geojson',
    //   data: syracuseRoute
    // });

    // map2.addLayer({
    //   id: 'syracuse-route-line',
    //   type: 'line',
    //   source: 'syracuse-route',
    //   layout: {
    //     'line-join': 'round',
    //     'line-cap': 'round'
    //   },
    //   paint: {
    //     'line-color': '#007cbf',
    //     'line-width': 4,
    //     'line-opacity': 0.8
    //   }
    // });

    // Hover effects for Syracuse route - REMOVED
    // map2.on('mouseenter', 'syracuse-route-line', () => {
    //   map2.getCanvas().style.cursor = 'pointer';
    //   map2.setPaintProperty('syracuse-route-line', 'line-width', 6);
    // });

    // map2.on('mouseleave', 'syracuse-route-line', () => {
    //   map2.getCanvas().style.cursor = '';
    //   map2.setPaintProperty('syracuse-route-line', 'line-width', 4);
    // });

    // map2.on('click', 'syracuse-route-line', (e) => {
    //   new mapboxgl.Popup()
    //     .setLngLat(e.lngLat)
    //     .setHTML('<h3>Syracuse Downtown Route</h3><p>Main route through downtown Syracuse</p>')
    //     .addTo(map2);
    // });

    // Load Syracuse commute routes GeoJSON to define orange zone boundary
    console.log('Loading Syracuse commute routes to define orange zone...');
    fetch('../../commute_routes_syracuse_only.geojson')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log('Syracuse commute routes data response received');
        return response.json();
      })
      .then(syracuseData => {
        console.log('Syracuse commute routes loaded successfully:', syracuseData);
        
        // Create a boundary polygon based on commute routes
        const coordinates = syracuseData.features.map(feature => feature.geometry.coordinates);
        
        // Create a polygon that connects all the commute route points
        // This will create a polygon that encompasses all the points
        const boundaryPolygon = {
          type: 'Feature',
          properties: {
            name: 'Syracuse Commute Routes Boundary',
            description: 'Boundary defined by commute route points in Syracuse',
            area: 'Commute Routes District'
          },
          geometry: {
            type: 'Polygon',
            coordinates: [createAllPointsPolygon(coordinates)]
          }
        };
        
                // Add the boundary as a source
        map2.addSource('syracuse-commute-boundary', {
          'type': 'geojson',
          'data': {
            type: 'FeatureCollection',
            features: [boundaryPolygon]
          }
        });

        // Add fill layer for the commute routes boundary (Manhattan Teal zone)
        map2.addLayer({
          'id': 'syracuse-commute-boundary-fill',
          'type': 'fill',
          'source': 'syracuse-commute-boundary',
          'paint': {
            'fill-color': '#4ECDC4',
            'fill-opacity': 0.5
          }
        });

        // Add border layer for the commute routes boundary
        map2.addLayer({
          'id': 'syracuse-commute-boundary-border',
          'type': 'line',
          'source': 'syracuse-commute-boundary',
          'paint': {
            'line-color': '#FFFFFF',
            'line-width': 2,
            'line-opacity': 0.9
          }
        });

        // Add connecting lines between the commute route points
        const connectedPoints = {
          type: 'Feature',
          properties: {
            name: 'Connected Commute Routes'
          },
          geometry: {
            type: 'LineString',
            coordinates: createAllPointsPolygon(coordinates).slice(0, -1) // Remove the last point to avoid closing the line
          }
        };

        map2.addSource('syracuse-commute-connections', {
          'type': 'geojson',
          'data': {
            type: 'FeatureCollection',
            features: [connectedPoints]
          }
        });

        map2.addLayer({
          'id': 'syracuse-commute-connections',
          'type': 'line',
          'source': 'syracuse-commute-connections',
          'paint': {
            'line-color': '#FFFFFF',
            'line-width': 3,
            'line-opacity': 0.9
          }
        });

        // Add the commute route points as markers within the boundary (on top of lines)
        map2.addSource('syracuse-commute-points', {
          'type': 'geojson',
          'data': syracuseData
        });

        map2.addLayer({
          'id': 'syracuse-commute-points',
          'type': 'circle',
          'source': 'syracuse-commute-points',
          'paint': {
            'circle-radius': 6,
            'circle-color': '#FF6B6B',
            'circle-stroke-color': '#ffffff',
            'circle-stroke-width': 2,
            'circle-opacity': 0.9
          }
        });

        // Add hover effects for the commute routes boundary
        map2.on('mouseenter', 'syracuse-commute-boundary-fill', () => {
          map2.getCanvas().style.cursor = 'pointer';
          map2.setPaintProperty('syracuse-commute-boundary-fill', 'fill-opacity', 0.7);
        });

        map2.on('mouseleave', 'syracuse-commute-boundary-fill', () => {
          map2.getCanvas().style.cursor = '';
          map2.setPaintProperty('syracuse-commute-boundary-fill', 'fill-opacity', 0.5);
        });

        // Add click events for the commute routes boundary
        map2.on('click', 'syracuse-commute-boundary-fill', (e) => {
          const coordinates = e.lngLat;
          const properties = e.features[0].properties;
          
          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(`
              <div style="text-align: center;">
                <h4>${properties.name}</h4>
                <p><strong>Area:</strong> ${properties.area}</p>
                <p>${properties.description}</p>
                <p><strong>Commute Routes:</strong> ${syracuseData.features.length} trip(s)</p>
              </div>
            `)
            .addTo(map2);
        });

        // Add click events for individual commute route points
        map2.on('click', 'syracuse-commute-points', (e) => {
          const coordinates = e.lngLat;
          const properties = e.features[0].properties;
          
          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(`
              <div style="text-align: center;">
                <h4>Commute Route Point</h4>
                <p><strong>Trip ID:</strong> ${properties.trip_id}</p>
                <p><strong>Coordinates:</strong> ${coordinates.lng.toFixed(6)}, ${coordinates.lat.toFixed(6)}</p>
                <p>Commute route location in Syracuse</p>
              </div>
            `)
            .addTo(map2);
        });

        // Add hover effects for connecting lines
        map2.on('mouseenter', 'syracuse-commute-connections', () => {
          map2.getCanvas().style.cursor = 'pointer';
          map2.setPaintProperty('syracuse-commute-connections', 'line-width', 4);
        });

        map2.on('mouseleave', 'syracuse-commute-connections', () => {
          map2.getCanvas().style.cursor = '';
          map2.setPaintProperty('syracuse-commute-connections', 'line-width', 3);
        });

        // Add click events for connecting lines
        map2.on('click', 'syracuse-commute-connections', (e) => {
          const coordinates = e.lngLat;
          
          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(`
              <div style="text-align: center;">
                <h4>Connected Commute Routes</h4>
                <p><strong>Boundary Type:</strong> Convex Hull</p>
                <p><strong>Total Points:</strong> ${syracuseData.features.length}</p>
                <p>Connecting lines between commute route points</p>
              </div>
            `)
            .addTo(map2);
        });

        console.log(`Created polygon connecting all ${syracuseData.features.length} commute route points`);
      })
      .catch(error => {
        console.error('Error loading Syracuse commute routes:', error);
        // Show error message on the map
        const errorDiv = document.createElement('div');
        errorDiv.style.position = 'absolute';
        errorDiv.style.top = '10px';
        errorDiv.style.left = '10px';
        errorDiv.style.background = 'rgba(255, 0, 0, 0.8)';
        errorDiv.style.color = 'white';
        errorDiv.style.padding = '10px';
        errorDiv.style.borderRadius = '5px';
        errorDiv.style.fontSize = '12px';
        errorDiv.textContent = `Error loading Syracuse commute routes: ${error.message}`;
        document.getElementById('mapbox-container-2').appendChild(errorDiv);
      });
  });

  map2.on('error', (e) => {
    console.error("Map 2 error:", e);
  });
  
  console.log("Map 2 features added:");
  console.log("- Connected sky blue zone boundary (defined by commute routes)");
  console.log("- Commute route points (dark blue dots)");
  console.log("- Connecting lines between points (dark blue)");
  console.log("- Syracuse City boundaries (green polygon) - REMOVED");
  console.log("- Syracuse Downtown Route (blue line) - REMOVED");
  console.log("- Syracuse visited places (orange circles) - REMOVED");
}

// Map 3: External Data - Loading GeoJSON from Files
function initMap3() {
  console.log("Initializing Map 3...");
  map3 = new mapboxgl.Map({
    container: 'mapbox-container-3',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [-73.94723, 40.7462],
    zoom: 12.18
  });

  map3.on('load', () => {
    console.log("Map 3 loaded successfully");
    // Load NYC Historic Districts GeoJSON data from API
    console.log("Attempting to load GeoJSON from: https://data.cityofnewyork.us/resource/skyk-mpzq.geojson");
    fetch('https://data.cityofnewyork.us/resource/skyk-mpzq.geojson')
      .then(response => {
        console.log("Fetch response status:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("NYC Historic Districts data loaded successfully:", data.features.length, "features");
        console.log("Sample feature:", data.features[0]);
        
        map3.addSource('historic-districts', {
          type: 'geojson',
          data: data
        });

        map3.addLayer({
          id: 'historic-districts-fill',
          type: 'fill',
          source: 'historic-districts',
          paint: {
            'fill-color': [
              'case',
              ['==', ['get', 'borough'], 'BK'], '#FF6B6B',  // Brooklyn - Red
              ['==', ['get', 'borough'], 'MN'], '#4ECDC4',  // Manhattan - Teal
              ['==', ['get', 'borough'], 'BX'], '#45B7D1',  // Bronx - Blue
              ['==', ['get', 'borough'], 'QN'], '#96CEB4',  // Queens - Green
              ['==', ['get', 'borough'], 'SI'], '#FFEAA7',  // Staten Island - Yellow
              '#CCCCCC'  // Default - Gray
            ],
            'fill-opacity': 0.6
          }
        });

        map3.addLayer({
          id: 'historic-districts-border',
          type: 'line',
          source: 'historic-districts',
          paint: {
            'line-color': '#FFFFFF',
            'line-width': 1
          }
        });

        // Fit map to data bounds
        const bounds = new mapboxgl.LngLatBounds();
        data.features.forEach(feature => {
          if (feature.geometry.type === 'MultiPolygon') {
            feature.geometry.coordinates.forEach(polygon => {
              polygon[0].forEach(coord => {
                bounds.extend(coord);
              });
            });
          }
        });
        map3.fitBounds(bounds, { padding: 50 });

        // Hover effects
        map3.on('mouseenter', 'historic-districts-fill', () => {
          map3.getCanvas().style.cursor = 'pointer';
        });

        map3.on('mouseleave', 'historic-districts-fill', () => {
          map3.getCanvas().style.cursor = '';
        });

        map3.on('click', 'historic-districts-fill', (e) => {
          const feature = e.features[0];
          const properties = feature.properties;
          new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`
              <h3>${properties.area_name || 'Historic District'}</h3>
              <p><strong>Borough:</strong> ${properties.borough || 'N/A'}</p>
              <p><strong>Status:</strong> ${properties.status_of_ || 'N/A'}</p>
              <p><strong>LP Number:</strong> ${properties.lp_number || 'N/A'}</p>
              <p><strong>Designation Date:</strong> ${properties.desdate ? new Date(properties.desdate).toLocaleDateString() : 'N/A'}</p>
              <p><strong>Public Hearing:</strong> ${properties.public_hea || 'N/A'}</p>
            `)
            .addTo(map3);
        });
      })
      .catch(error => {
        console.error('Error loading NYC Historic Districts GeoJSON:', error);
        const container = document.getElementById('mapbox-container-3');
        if (container) {
          container.innerHTML = `
            <div style="padding: 40px; text-align: center; color: #666; background: #f8f8f8; border-radius: 8px; margin: 20px;">
              <h3 style="color: #333; margin-bottom: 10px;">Map Data Loading Error</h3>
              <p style="margin-bottom: 15px;">Unable to load NYC Historic Districts data from the API.</p>
              <p style="font-size: 14px; color: #999;">Error: ${error.message}</p>
              <p style="font-size: 12px; color: #999; margin-top: 15px;">Please check your internet connection and try again.</p>
            </div>
          `;
        }
      });
  });

  map3.on('error', (e) => {
    console.error("Map 3 error:", e);
  });
}

// Setup control buttons
function setupControls() {
  console.log("Setting up controls...");
  // Map 1 controls - REMOVED (container deleted)
  // document.getElementById('zoomIn').addEventListener('click', () => {
  //   map1.zoomIn();
  // });

  // document.getElementById('zoomOut').addEventListener('click', () => {
  //   map1.zoomOut();
  // });

  // document.getElementById('resetView').addEventListener('click', () => {
  //   map1.flyTo({
  //     center: [-73.94723, 40.7462],
  //     zoom: 12.18
  //   });
  // });

  // Map 2 controls - UPDATED for downtown only
  document.getElementById('toggleLines').addEventListener('click', () => {
    // Lines removed - button disabled
    document.getElementById('toggleLines').textContent = 'Lines Removed';
    document.getElementById('toggleLines').disabled = true;
  });

  document.getElementById('toggleRegions').addEventListener('click', () => {
    regionsVisible = !regionsVisible;
    // Control the commute routes boundary (orange zone)
    map2.setLayoutProperty('syracuse-commute-boundary-fill', 'visibility', regionsVisible ? 'visible' : 'none');
    map2.setLayoutProperty('syracuse-commute-boundary-border', 'visibility', regionsVisible ? 'visible' : 'none');
    document.getElementById('toggleRegions').textContent = regionsVisible ? 'Hide Manhattan Teal Zone' : 'Show Manhattan Teal Zone';
  });

  document.getElementById('resetView2').addEventListener('click', () => {
    map2.flyTo({
      center: [-76.1436367, 43.0457539], // Syracuse downtown coordinates
      zoom: 14
    });
  });

  // Add Syracuse places toggle button - REMOVED
  // const toggleSyracuseButton = document.createElement('button');
  // toggleSyracuseButton.id = 'toggleSyracuse';
  // toggleSyracuseButton.className = 'control-btn';
  // toggleSyracuseButton.textContent = 'Hide Syracuse Places';
  // toggleSyracuseButton.style.marginLeft = '10px';
  
  // // Add the button to the controls container for map2
  // const map2Container = document.getElementById('mapbox-container-2');
  // if (map2Container && map2Container.parentElement) {
  //   const controlsContainer = map2Container.parentElement.querySelector('.controls');
  //   if (controlsContainer) {
  //     controlsContainer.appendChild(toggleSyracuseButton);
  //   }
  // }

  // toggleSyracuseButton.addEventListener('click', () => {
  //   const syracuseVisible = map2.getLayoutProperty('syracuse-visited-places-circles', 'visibility');
  //   const newVisibility = (syracuseVisible === 'visible') ? 'none' : 'visible';
    
  //   map2.setLayoutProperty('syracuse-visited-places-circles', 'visibility', newVisibility);
    
  //   toggleSyracuseButton.textContent = 
  //     (newVisibility === 'visible') ? 'Hide Syracuse Places' : 'Show Syracuse Places';
  // });

  // Map 3 controls
  document.getElementById('searchFeature').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    // Implement search functionality here
  });

  document.getElementById('resetFilters').addEventListener('click', () => {
    document.getElementById('searchFeature').value = '';
  });

  document.getElementById('fitToData').addEventListener('click', () => {
    // Re-fit to data bounds
    if (map3.getSource('historic-districts')) {
      const bounds = new mapboxgl.LngLatBounds();
      const data = map3.getSource('historic-districts')._data;
      data.features.forEach(feature => {
        if (feature.geometry.type === 'MultiPolygon') {
          feature.geometry.coordinates.forEach(polygon => {
            polygon[0].forEach(coord => {
              bounds.extend(coord);
            });
          });
        }
      });
      map3.fitBounds(bounds, { padding: 50 });
    }
  });
}

// Function to create a convex hull polygon from points
function createConvexHull(points) {
  console.log('Creating convex hull for', points.length, 'points:', points);
  
  // Simple convex hull algorithm - Graham scan
  if (points.length < 3) {
    // If less than 3 points, create a small polygon around the points
    const center = points[0] || [0, 0];
    const buffer = 0.001;
    return [
      [center[0] - buffer, center[1] - buffer],
      [center[0] + buffer, center[1] - buffer],
      [center[0] + buffer, center[1] + buffer],
      [center[0] - buffer, center[1] + buffer],
      [center[0] - buffer, center[1] - buffer]
    ];
  }

  // Find the point with the lowest y-coordinate (and leftmost if tied)
  let lowest = 0;
  for (let i = 1; i < points.length; i++) {
    if (points[i][1] < points[lowest][1] || 
        (points[i][1] === points[lowest][1] && points[i][0] < points[lowest][0])) {
      lowest = i;
    }
  }

  // Sort points by polar angle with respect to the lowest point
  const start = points[lowest];
  const sorted = points
    .filter((_, i) => i !== lowest)
    .sort((a, b) => {
      const angleA = Math.atan2(a[1] - start[1], a[0] - start[0]);
      const angleB = Math.atan2(b[1] - start[1], b[0] - start[0]);
      return angleA - angleB;
    });

  console.log('Starting point:', start);
  console.log('Sorted points:', sorted);

  // Graham scan to build the convex hull
  const hull = [start, sorted[0]];
  
  for (let i = 1; i < sorted.length; i++) {
    while (hull.length > 1 && !isLeftTurn(hull[hull.length - 2], hull[hull.length - 1], sorted[i])) {
      hull.pop();
    }
    hull.push(sorted[i]);
  }

  // Close the polygon
  hull.push(start);
  
  console.log('Final hull:', hull);
  return hull;
}

// Helper function to determine if three points make a left turn
function isLeftTurn(p1, p2, p3) {
  return (p2[0] - p1[0]) * (p3[1] - p1[1]) - (p2[1] - p1[1]) * (p3[0] - p1[0]) > 0;
}

// Function to create a polygon that includes all points
function createAllPointsPolygon(points) {
  console.log('Creating polygon with all', points.length, 'points:', points);
  
  if (points.length < 3) {
    // If less than 3 points, create a small polygon around the points
    const center = points[0] || [0, 0];
    const buffer = 0.001;
    return [
      [center[0] - buffer, center[1] - buffer],
      [center[0] + buffer, center[1] - buffer],
      [center[0] + buffer, center[1] + buffer],
      [center[0] - buffer, center[1] + buffer],
      [center[0] - buffer, center[1] - buffer]
    ];
  }

  // For 6 points, create a polygon that connects all points in order
  // Sort points by angle from center to ensure a reasonable polygon
  const centerLng = points.reduce((sum, p) => sum + p[0], 0) / points.length;
  const centerLat = points.reduce((sum, p) => sum + p[1], 0) / points.length;
  
  const sortedPoints = points.sort((a, b) => {
    const angleA = Math.atan2(a[1] - centerLat, a[0] - centerLng);
    const angleB = Math.atan2(b[1] - centerLat, b[0] - centerLng);
    return angleA - angleB;
  });
  
  // Close the polygon by adding the first point at the end
  const polygon = [...sortedPoints, sortedPoints[0]];
  
  console.log('Created polygon with all points:', polygon);
  return polygon;
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
  console.log('Module 5: Geospatial Structures initialized');
  initMaps();
}); 