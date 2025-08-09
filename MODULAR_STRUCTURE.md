# Modular Structure Documentation

## 🏗️ **New Modular Organization**

The Test-One website has been reorganized into individual modules, each with its own HTML, CSS, and JavaScript files. This creates a cleaner, more maintainable structure where each module is self-contained.

## 📁 **Module Structure**

### **Each Module Contains:**
```
modules/moduleX-name/
├── index.html      # Standalone HTML page
├── style.css       # Module-specific CSS
└── script.js       # Module-specific JavaScript
```

## 🎯 **Available Modules**

### **Module 1: 2D Drawing & Animation**
- **Location**: `modules/module1-2d/`
- **Files**: `index.html`, `style.css`, `script.js`
- **Features**: Organic grid, bouncing ball physics, zoom & pan controls
- **Technologies**: p5.js, HTML5 Canvas

### **Module 2: 3D Spatial Design**
- **Location**: `modules/module2-3d/`
- **Files**: `index.html`, `style.css`, `script.js`
- **Features**: Orbit controls, primitive geometry, lighting & materials, spatial canvas
- **Technologies**: p5.js WEBGL, Three.js

### **Module 5: Geospatial Structures**
- **Location**: `modules/module5-geospatial/`
- **Files**: `index.html`, `style.css`, `script.js`
- **Features**: Mapbox foundation, advanced features, external data loading
- **Technologies**: Mapbox GL JS, GeoJSON

## ✅ **Benefits of Modular Structure**

### **Self-Contained Modules:**
- Each module has its own HTML, CSS, and JS files
- No shared dependencies between modules
- Easy to understand and maintain
- Clear separation of concerns

### **Consistent Design:**
- All modules use the same Bauhaus design system
- Consistent typography, colors, and layout
- Responsive design across all modules
- Unified navigation and footer

### **Easy Development:**
- Work on one module without affecting others
- Clear file organization
- Easy to add new modules
- Simple deployment structure

### **Better Performance:**
- Only load necessary files for each module
- Smaller file sizes
- Faster loading times
- Reduced complexity

## 🔄 **Migration Status**

### **Completed Modules:**
- ✅ Module 1: 2D Drawing & Animation
- ✅ Module 2: 3D Spatial Design  
- ✅ Module 5: Geospatial Structures

### **Pending Modules:**
- ⏳ Module 3: Data Visualization (D3.js)
- ⏳ Module 4: Environmental Relations
- ⏳ Module 6: CO2 Emissions Visualization

## 📋 **How to Add New Modules**

1. **Create Module Directory:**
   ```bash
   mkdir modules/moduleX-name
   ```

2. **Create Module Files:**
   - `index.html` - Standalone HTML page
   - `style.css` - Module-specific CSS
   - `script.js` - Module-specific JavaScript

3. **Follow Design System:**
   - Use Bauhaus design principles
   - Include header with navigation
   - Add hero section with module info
   - Include footer with credits

4. **Update Main Index:**
   - Add module to main navigation
   - Update links to point to new module

## 🎨 **Design System**

### **CSS Variables:**
```css
:root {
  --bauhaus-black: #000000;
  --bauhaus-white: #ffffff;
  --bauhaus-gray-50: #fafafa;
  --bauhaus-gray-100: #f5f5f5;
  --bauhaus-gray-200: #e5e5e5;
  --bauhaus-gray-400: #a3a3a3;
  --bauhaus-gray-600: #525252;
  --bauhaus-gray-800: #262626;
}
```

### **Typography:**
- Font: Helvetica Neue, Helvetica, Arial, sans-serif
- Weights: 400 (normal), 600 (medium), 700 (bold), 900 (black)
- Sizes: 14px (small), 16px (body), 18px (large), 24px (h3), 56px (h1)

### **Layout:**
- Max-width: 1000px
- Padding: 64px (desktop), 32px (mobile)
- Margins: 80px (main), 120px (sections)

## 🚀 **Usage**

### **Accessing Modules:**
1. Go to main page: `http://localhost:8000`
2. Click on any module link
3. Each module opens as a standalone page
4. Use "← Back to Project" to return to main page

### **Development:**
1. Edit module files directly in their directories
2. Each module is self-contained
3. Changes don't affect other modules
4. Easy to test individual modules

## 📊 **File Organization**

### **Before (Shared Structure):**
```
demos/
├── 2d-demos.html
├── 3d-demos.html
├── geospatial-maps.html
css/
├── main-style.css
├── 2d-style.css
├── 3d-style.css
js/
├── 2d-drawing.js
├── 3d-orbit-control.js
├── mapBox_Sketch_01.js
```

### **After (Modular Structure):**
```
modules/
├── module1-2d/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── module2-3d/
│   ├── index.html
│   ├── style.css
│   └── script.js
└── module5-geospatial/
    ├── index.html
    ├── style.css
    └── script.js
```

This modular approach makes the codebase more maintainable, easier to understand, and provides better separation of concerns. 