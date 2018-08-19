# landformPath
Methods that generates imaginary landform contour path.  
GitHub: https://github.com/YujiSODE/landformPath
>Copyright (c) 2018 Yuji SODE \<yuji.sode@gmail.com\>  
>This software is released under the MIT License.  
>See LICENSE or http://opensource.org/licenses/mit-license.php
______
## 1. Script
- `landformPath.js`: CanvasRenderingContext2D methods
- `landformPath_tools.js`: Tool for drawing imaginary landform contour lines

## 2. Synopsis
### Activating tools  
`var L=getLandform(canvas);`
- `canvas`: a canvas element

### Methods
- `L.reset();`  
  method that resets parameters for available landform paths
  
- `L.curves(x,y,radius,linesN,dN,N);`  
  method that generates landform contour lines using curved paths and returns modified radii

- `L.lines(x,y,radius,linesN,dN,N);`  
  method that generates landform contour lines using linear paths and returns modified radii

- `L.coveringCurves(radius,linesN,dN,N);`  
  method that generates landform contour lines covering the available landform paths and returns modified radii  
  the generated landform contour lines using curved paths

- `L.coveringLines(radius,linesN,dN,N);`  
  method that generates landform contour lines covering the available landform paths and returns modified radii  
  the generated landform contour lines using linear paths

#### Parameters for methods
- `x` and `y`: values of coordinates for the center
- `radius`: an array of radii
- `linesN`: the total number of contour lines
- `dN`: a span between two red lines
- `N`: an optional number of contour lines above the top red line  
  0 is default value
