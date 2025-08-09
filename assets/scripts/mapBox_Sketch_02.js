/*
 * MAPBOX TUTORIAL: Line Features and Regions - New York City
 * ===========================================================
 * 
 * This script demonstrates how to create line features and regions using Mapbox GL JS.
 * It builds upon the basic map setup and shows how to add GeoJSON data for:
 * - Line features (routes, boundaries, paths)
 * - Polygon regions (neighborhoods, districts, areas)
 * 
 * WHAT ARE LINEFEATURES AND REGIONS?
 * - Line features: Represent linear data like roads, rivers, boundaries, or routes
 * - Regions (Polygons): Represent areas like neighborhoods, districts, or zones
 * 
 * PREREQUISITES:
 * - Basic understanding of HTML, CSS, and JavaScript
 * - A Mapbox access token (free at https://account.mapbox.com/access-tokens/)
 * - Mapbox GL JS library loaded in your HTML
 * - Understanding of GeoJSON format
 */

// Wrap everything in a function to maintain independence from other scripts
var mapboxSketch02 = function() {
  // ============================================================================
  // STEP 1: SET UP YOUR MAPBOX ACCESS TOKEN
  // ============================================================================
  // Using the same token as the first example for consistency
  mapboxgl.accessToken = 'pk.eyJ1Ijoic2FyYWxpbjMwNCIsImEiOiJjbWRjY2M4OTYwOWZiMmxvazMyOWkwcW0xIn0.02wSv2MXs9AGoBqLdi6wQg';

  // ============================================================================
  // STEP 2: CREATE THE MAP OBJECT
  // ============================================================================
  // Using Syracuse as the initial center for the map
  const map2 = new mapboxgl.Map({
      container: 'mapbox-container-2',
      style: 'mapbox://styles/saralin304/cmdcegfc000ae01s23fgqafyy', // Updated custom style URL
      center: [-76.1436367, 43.0457539], // Syracuse downtown coordinates
      zoom: 14,
      pitch: 0,
      bearing: 0
  });

  // ============================================================================
  // STEP 3: ADD MAP CONTROLS
  // ============================================================================
  map2.addControl(new mapboxgl.NavigationControl(), 'top-right');
  map2.addControl(new mapboxgl.FullscreenControl(), 'top-right');
  map2.addControl(new mapboxgl.ScaleControl({
      maxWidth: 80,
      unit: 'metric'
  }), 'bottom-left');

  // ============================================================================
  // STEP 4: WAIT FOR THE MAP TO LOAD
  // ============================================================================
  map2.on('load', () => {
      console.log('Map 2 loaded successfully!');
      console.log('Map centered on Syracuse:', map2.getCenter());
      
      // ========================================================================
      // STEP 5: ADD LINE FEATURES (ROUTES AND BOUNDARIES)
      // ========================================================================
      
      // Example 1: Manhattan Waterfront Route
      const waterfrontRoute = {
          'type': 'FeatureCollection',
          'features': [{
              'type': 'Feature',
              'properties': {
                  'name': 'Manhattan Waterfront Route',
                  'description': 'Scenic route along Manhattan\'s west side',
                  'color': '#0066cc'
              },
              'geometry': {
                  'type': 'LineString',
                  'coordinates': [
                      [-74.0150, 40.7080], // Battery Park
                      [-74.0120, 40.7150], // Tribeca
                      [-74.0080, 40.7250], // West Village
                      [-74.0050, 40.7350], // Chelsea
                      [-74.0020, 40.7450], // Hell's Kitchen
                      [-73.9980, 40.7550], // Midtown West
                      [-73.9950, 40.7650], // Upper West Side
                      [-73.9920, 40.7750], // Morningside Heights
                      [-73.9890, 40.7850]  // Harlem
                  ]
              }
          }]
      };

      // Add the waterfront route to the map
      map2.addSource('waterfront-route', {
          'type': 'geojson',
          'data': waterfrontRoute
      });

      map2.addLayer({
          'id': 'waterfront-route-line',
          'type': 'line',
          'source': 'waterfront-route',
          'layout': {
              'line-join': 'round',
              'line-cap': 'round'
          },
          'paint': {
              'line-color': '#0066cc',
              'line-width': 4,
              'line-opacity': 0.8
          }
      });

      // Example 2: Brooklyn Bridge Crossing
      const brooklynBridgeRoute = {
          'type': 'FeatureCollection',
          'features': [{
              'type': 'Feature',
              'properties': {
                  'name': 'Brooklyn Bridge Crossing',
                  'description': 'Historic bridge connecting Manhattan and Brooklyn',
                  'color': '#ff6600'
              },
              'geometry': {
                  'type': 'LineString',
                  'coordinates': [
                      [-73.9969, 40.7061], // Manhattan side
                      [-73.9900, 40.7000], // Brooklyn side
                      [-73.9850, 40.6950]  // Brooklyn approach
                  ]
              }
          }]
      };

      map2.addSource('brooklyn-bridge', {
          'type': 'geojson',
          'data': brooklynBridgeRoute
      });

      map2.addLayer({
          'id': 'brooklyn-bridge-line',
          'type': 'line',
          'source': 'brooklyn-bridge',
          'layout': {
              'line-join': 'round',
              'line-cap': 'round'
          },
          'paint': {
              'line-color': '#ff6600',
              'line-width': 6,
              'line-opacity': 0.9,
              'line-dasharray': [2, 2] // Creates a dashed line effect
          }
      });

      // ========================================================================
      // STEP 6: ADD REGION FEATURES (POLYGONS)
      // ========================================================================
      
      // Example 1: Central Park Region
      const centralParkRegion = {
          'type': 'FeatureCollection',
          'features': [{
              'type': 'Feature',
              'properties': {
                  'name': 'Central Park',
                  'area': '843 acres',
                  'description': 'Urban oasis in the heart of Manhattan',
                  'color': '#00aa44'
              },
              'geometry': {
                  'type': 'Polygon',
                  'coordinates': [[
                      [-73.9750, 40.7640], // Southwest corner
                      [-73.9550, 40.7640], // Southeast corner
                      [-73.9550, 40.8000], // Northeast corner
                      [-73.9750, 40.8000], // Northwest corner
                      [-73.9750, 40.7640]  // Close the polygon
                  ]]
              }
          }]
      };

      // ========================================================================
      // STEP 6.5: ADD SYRACUSE DOWNTOWN VISITED PLACES
      // ========================================================================
      
      // Load Syracuse downtown visited places GeoJSON
      fetch('syracuse_downtown_visited_places.geojson')
          .then(response => {
              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
          })
          .then(syracuseData => {
              console.log('Syracuse data loaded successfully:', syracuseData);
              
              // Add Syracuse visited places as a source
              map2.addSource('syracuse-visited-places', {
                  'type': 'geojson',
                  'data': syracuseData
              });

              // Add circle layer for visited places
              map2.addLayer({
                  'id': 'syracuse-visited-places-circles',
                  'type': 'circle',
                  'source': 'syracuse-visited-places',
                  'paint': {
                      'circle-radius': 8,
                      'circle-color': '#ff6b35',
                      'circle-stroke-color': '#ffffff',
                      'circle-stroke-width': 2,
                      'circle-opacity': 0.8
                  }
              });

              // Add hover effects for Syracuse visited places
              map2.on('mouseenter', 'syracuse-visited-places-circles', () => {
                  map2.getCanvas().style.cursor = 'pointer';
                  map2.setPaintProperty('syracuse-visited-places-circles', 'circle-radius', 12);
              });

              map2.on('mouseleave', 'syracuse-visited-places-circles', () => {
                  map2.getCanvas().style.cursor = '';
                  map2.setPaintProperty('syracuse-visited-places-circles', 'circle-radius', 8);
              });

              // Add click events for Syracuse visited places
              map2.on('click', 'syracuse-visited-places-circles', (e) => {
                  const coordinates = e.lngLat;
                  const properties = e.features[0].properties;
                  
                  new mapboxgl.Popup()
                      .setLngLat(coordinates)
                      .setHTML(`
                          <div style="text-align: center;">
                              <h4>Syracuse Downtown</h4>
                              <p><strong>Category:</strong> ${properties.category || 'Visited Place'}</p>
                              <p><strong>Source:</strong> ${properties.source || 'Google Takeout'}</p>
                              <p>Visited location in downtown Syracuse</p>
                          </div>
                      `)
                      .addTo(map2);
              });

              // Log the Syracuse data for debugging
              console.log('Syracuse data loaded successfully:', syracuseData.features.length, 'features');

          })
          .catch(error => {
              console.error('Error loading Syracuse data:', error);
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
              errorDiv.textContent = `Error loading Syracuse data: ${error.message}`;
              document.getElementById('mapbox-container-2').appendChild(errorDiv);
          });

      map2.addSource('central-park', {
          'type': 'geojson',
          'data': centralParkRegion
      });

      // Add the fill layer for Central Park
      map2.addLayer({
          'id': 'central-park-fill',
          'type': 'fill',
          'source': 'central-park',
          'paint': {
              'fill-color': '#00aa44',
              'fill-opacity': 0.3
          }
      });

      // Add the border layer for Central Park
      map2.addLayer({
          'id': 'central-park-border',
          'type': 'line',
          'source': 'central-park',
          'paint': {
              'line-color': '#00aa44',
              'line-width': 2,
              'line-opacity': 0.8
          }
      });

      // Example 2: Times Square District
      const timesSquareDistrict = {
          'type': 'FeatureCollection',
          'features': [{
              'type': 'Feature',
              'properties': {
                  'name': 'Times Square District',
                  'description': 'The crossroads of the world',
                  'color': '#cc0066'
              },
              'geometry': {
                  'type': 'Polygon',
                  'coordinates': [[
                      [-73.9900, 40.7520], // Southwest
                      [-73.9800, 40.7520], // Southeast
                      [-73.9800, 40.7640], // Northeast
                      [-73.9900, 40.7640], // Northwest
                      [-73.9900, 40.7520]  // 
                  ]]
              }
          }]
      };

      map2.addSource('times-square', {
          'type': 'geojson',
          'data': timesSquareDistrict
      });

      map2.addLayer({
          'id': 'times-square-fill',
          'type': 'fill',
          'source': 'times-square',
          'paint': {
              'fill-color': '#cc0066',
              'fill-opacity': 0.2
          }
      });

      map2.addLayer({
          'id': 'times-square-border',
          'type': 'line',
          'source': 'times-square',
          'paint': {
              'line-color': '#cc0066',
              'line-width': 2,
              'line-opacity': 0.8
          }
      });

      // ========================================================================
      // STEP 7: ADD INTERACTIVE FEATURES
      // ========================================================================
      
      // Add hover effects for line features
      map2.on('mouseenter', 'waterfront-route-line', () => {
          map2.getCanvas().style.cursor = 'pointer';
          map2.setPaintProperty('waterfront-route-line', 'line-width', 6);
      });

      map2.on('mouseleave', 'waterfront-route-line', () => {
          map2.getCanvas().style.cursor = '';
          map2.setPaintProperty('waterfront-route-line', 'line-width', 4);
      });

      map2.on('mouseenter', 'brooklyn-bridge-line', () => {
          map2.getCanvas().style.cursor = 'pointer';
          map2.setPaintProperty('brooklyn-bridge-line', 'line-width', 8);
      });

      map2.on('mouseleave', 'brooklyn-bridge-line', () => {
          map2.getCanvas().style.cursor = '';
          map2.setPaintProperty('brooklyn-bridge-line', 'line-width', 6);
      });

      // Add hover effects for polygon features
      map2.on('mouseenter', 'central-park-fill', () => {
          map2.getCanvas().style.cursor = 'pointer';
          map2.setPaintProperty('central-park-fill', 'fill-opacity', 0.5);
      });

      map2.on('mouseleave', 'central-park-fill', () => {
          map2.getCanvas().style.cursor = '';
          map2.setPaintProperty('central-park-fill', 'fill-opacity', 0.3);
      });

      map2.on('mouseenter', 'times-square-fill', () => {
          map2.getCanvas().style.cursor = 'pointer';
          map2.setPaintProperty('times-square-fill', 'fill-opacity', 0.4);
      });

      map2.on('mouseleave', 'times-square-fill', () => {
          map2.getCanvas().style.cursor = '';
          map2.setPaintProperty('times-square-fill', 'fill-opacity', 0.2);
      });

      // Add click events to show information
      map2.on('click', 'waterfront-route-line', (e) => {
          const coordinates = e.lngLat;
          const properties = e.features[0].properties;
          
          new mapboxgl.Popup()
              .setLngLat(coordinates)
              .setHTML(`
                  <div style="text-align: center;">
                      <h4>${properties.name}</h4>
                      <p>${properties.description}</p>
                  </div>
              `)
              .addTo(map2);
      });

      map2.on('click', 'central-park-fill', (e) => {
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

      // ========================================================================
      // STEP 8: ADD CUSTOM BUTTON FUNCTIONALITY
      // ========================================================================
      
      // Toggle line features visibility
      document.getElementById('toggleLines').addEventListener('click', () => {
          const waterfrontVisible = map2.getLayoutProperty('waterfront-route-line', 'visibility');
          const bridgeVisible = map2.getLayoutProperty('brooklyn-bridge-line', 'visibility');
          
          const newVisibility = (waterfrontVisible === 'visible') ? 'none' : 'visible';
          
          map2.setLayoutProperty('waterfront-route-line', 'visibility', newVisibility);
          map2.setLayoutProperty('brooklyn-bridge-line', 'visibility', newVisibility);
          
          document.getElementById('toggleLines').textContent = 
              (newVisibility === 'visible') ? 'Hide Lines' : 'Show Lines';
      });

      // Toggle polygon features visibility
      document.getElementById('toggleRegions').addEventListener('click', () => {
          const parkVisible = map2.getLayoutProperty('central-park-fill', 'visibility');
          const squareVisible = map2.getLayoutProperty('times-square-fill', 'visibility');
          
          const newVisibility = (parkVisible === 'visible') ? 'none' : 'visible';
          
          map2.setLayoutProperty('central-park-fill', 'visibility', newVisibility);
          map2.setLayoutProperty('central-park-border', 'visibility', newVisibility);
          map2.setLayoutProperty('times-square-fill', 'visibility', newVisibility);
          map2.setLayoutProperty('times-square-border', 'visibility', newVisibility);
          
          document.getElementById('toggleRegions').textContent = 
              (newVisibility === 'visible') ? 'Hide Regions' : 'Show Regions';
      });

      // Toggle Syracuse visited places visibility
      const toggleSyracuseButton = document.createElement('button');
      toggleSyracuseButton.id = 'toggleSyracuse';
      toggleSyracuseButton.className = 'control-btn';
      toggleSyracuseButton.textContent = 'Hide Syracuse Places';
      toggleSyracuseButton.style.marginLeft = '10px';
      
      // Add the button to the controls container
      const controlsContainer = document.querySelector('#mapbox-container-2').parentElement.querySelector('.controls');
      if (controlsContainer) {
          controlsContainer.appendChild(toggleSyracuseButton);
      }

      toggleSyracuseButton.addEventListener('click', () => {
          const syracuseVisible = map2.getLayoutProperty('syracuse-visited-places-circles', 'visibility');
          const newVisibility = (syracuseVisible === 'visible') ? 'none' : 'visible';
          
          map2.setLayoutProperty('syracuse-visited-places-circles', 'visibility', newVisibility);
          
          toggleSyracuseButton.textContent = 
              (newVisibility === 'visible') ? 'Hide Syracuse Places' : 'Show Syracuse Places';
      });

      // Reset view button
      document.getElementById('resetView2').addEventListener('click', () => {
          map2.flyTo({
              center: [-74.006, 40.7128],
              zoom: 11,
              pitch: 0,
              bearing: 0,
              duration: 2000
          });
      });

      // ========================================================================
      // STEP 9: ADD KEYBOARD SHORTCUTS
      // ========================================================================
      
      document.addEventListener('keydown', (e) => {
          switch(e.key) {
              case 'l':
              case 'L':
                  e.preventDefault();
                  document.getElementById('toggleLines').click();
                  break;
              case 'r':
              case 'R':
                  e.preventDefault();
                  document.getElementById('toggleRegions').click();
                  break;
              case 's':
              case 'S':
                  e.preventDefault();
                  const syracuseButton = document.getElementById('toggleSyracuse');
                  if (syracuseButton) syracuseButton.click();
                  break;
              case '0':
                  e.preventDefault();
                  document.getElementById('resetView2').click();
                  break;
          }
      });

      // ========================================================================
      // STEP 10: DEBUGGING AND CONSOLE OUTPUT
      // ========================================================================
      
      console.log('Mapbox Line Features and Regions Map initialized');
      console.log('Features added:');
      console.log('- Manhattan Waterfront Route (blue line)');
      console.log('- Brooklyn Bridge Crossing (orange dashed line)');
      console.log('- Central Park Region (green polygon)');
      console.log('- Times Square District (pink polygon)');
      console.log('- Syracuse Downtown Visited Places (orange circles)');
      console.log('Keyboard shortcuts:');
      console.log('- L: Toggle line features');
      console.log('- R: Toggle region features');
      console.log('- S: Toggle Syracuse places');
      console.log('- 0: Reset view');

  });
};

// Execute the sketch
mapboxSketch02(); 