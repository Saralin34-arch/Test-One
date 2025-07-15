# Bauhaus Digital Archive - Computational Design Workflow

A comprehensive web-based art project exploring the intersection of Bauhaus principles and computational design practices, created for Columbia GSAPP's Computational Design Practices course.

## Project Overview

This project demonstrates a progression through four key modules, each building upon the previous to create a complete computational design workflow:

- **Module 1**: 2D Drawing & Animation
- **Module 2**: 3D Spatial Design  
- **Module 3**: Data Visualization
- **Module 4**: Environmental Relations

## Project Structure

```
Test-One/
├── index.html              # Main project homepage
├── demos/                  # Interactive demonstration pages
│   ├── 2d-demos.html      # Module 1: 2D animations
│   ├── 3d-demos.html      # Module 2: 3D spatial design
│   ├── d3-demos.html      # Module 3: D3.js visualizations
│   ├── relation-map.html  # Module 4: Environmental relations
│   ├── emissions-chart.html # U.S. Emissions visualization
│   └── nyc-air-contours.html # Air quality contours
├── js/                    # JavaScript modules
│   ├── script.js          # Main application logic
│   ├── 2d-drawing.js     # 2D canvas operations
│   ├── bouncing-ball.js   # Animation systems
│   ├── zoom-pan.js        # Interactive controls
│   ├── 3d-*.js           # Three.js 3D modules
│   ├── d3-script.js      # D3.js visualization logic
│   ├── relation-map-script.js # Environmental mapping
│   └── nyc-air-script.js # Air quality visualization
├── css/                   # Styling and design system
│   ├── main-style.css     # Main Bauhaus design system
│   ├── 2d-style.css      # 2D demo styling
│   ├── 3d-style.css      # 3D demo styling
│   ├── d3-style.css      # D3 visualization styling
│   ├── relation-map-style.css # Environmental map styling
│   ├── nyc-air-style.css # Air quality styling
│   └── main-bg.svg       # Background patterns
└── data/                  # Data files for visualizations
    ├── nyc_trees_sample.csv
    ├── nyc_environmental_data.csv
    ├── geodata.csv
    ├── nyc_air_quality_full_coords.csv
    └── Air_Quality_20250710.csv
```

## Design System

The project follows Bauhaus design principles with:
- **Typography**: Helvetica font family for consistency
- **Color Palette**: Primary colors with geometric shapes
- **Layout**: Grid-based, functional design
- **Interactivity**: Responsive and user-centered

## Modules

### Module 1: 2D Drawing & Animation
Interactive canvas experiments with organic shapes, color theory, and motion design principles.
- Organic grid generation
- Bouncing ball physics
- Zoom and pan interactions

### Module 2: 3D Spatial Design
Three-dimensional explorations using Three.js, focusing on geometry, lighting, and spatial relationships.
- Orbit controls for navigation
- Primitive geometry manipulation
- Dynamic lighting systems

### Module 3: Data Visualization
Geospatial data visualization using D3.js, exploring air quality data and density contours.
- NYC air quality mapping
- Density contour generation
- Interactive data exploration

### Module 4: Environmental Relations
Interactive mapping of urban environmental relationships between trees, air quality, and complaints.
- Relational data visualization
- Environmental impact mapping
- Interactive legend and tooltips

## Getting Started

1. Clone or download the repository
2. Open `index.html` in a modern web browser
3. Navigate through the modules using the project links
4. Each demo page includes interactive elements and controls

## Technologies Used

- **HTML5/CSS3**: Structure and styling
- **JavaScript**: Core functionality
- **Canvas API**: 2D graphics and animations
- **Three.js**: 3D graphics and spatial design
- **D3.js**: Data visualization and mapping
- **Bauhaus Design Principles**: Visual design system

## Instructor & Student

- **Instructor**: Catherine Griffiths
- **Student**: Sara Lin
- **Course**: Computational Design Practices
- **Institution**: Columbia GSAPP

## License

This project is created for educational purposes as part of the Columbia GSAPP Computational Design Practices course.

---

*Created with Bauhaus-inspired design principles and modern web technologies*
