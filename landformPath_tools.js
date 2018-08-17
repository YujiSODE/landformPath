/*landformPath
* landformPath_tools.js
*===================================================================
*	Copyright (c) 2018 Yuji SODE <yuji.sode@gmail.com>
*
*	This software is released under the MIT License.
*	See LICENSE or http://opensource.org/licenses/mit-license.php
*===================================================================
*/
//Tool script using "landformPath.js"
//This function returns function that returns the number of available landform contour paths and has some methods to draw imaginary landform contour paths
/*
*=== Synopsis ===
* Activating tools
* `var L=getLandform(canvas);`
* - `canvas`: a canvas element
*
*------ Methods ------
* 	- `L.reset();`
* 	method that resets parameters for available landform paths
*
* 	- `L.curves(x,y,radius,linesN,dN,N);`
* 	method that generates landform contour lines using curved paths and returns modified radii
*
* 	- `L.lines(x,y,radius,linesN,dN,N);`
* 	method that generates landform contour lines using linear paths and returns modified radii
*
* 	- `L.coveringCurves(radius,linesN,dN,N);`
* 	method that generates landform contour lines covering the available landform paths and returns modified radii
* 	the generated landform contour lines using curved paths
*
* 	- `L.coveringLines(radius,linesN,dN,N);`
* 	method that generates landform contour lines covering the available landform paths and returns modified radii
* 	the generated landform contour lines using linear paths
*
*--- Parameters for methods ---
* 	- `x` and `y`: values of coordinates for the center
* 	- `radius`: an array of radii
* 	- `linesN`: the total number of contour lines
* 	- `dN`: a span between two red lines
* 	- `N`: an optional number of contour lines above the top red line
* 	  0 is default value
*/
//============================================================================
//this function returns function that returns the number of available landform contour paths and has some methods to draw imaginary landform contour paths
function getLandform(canvas){
	// - canvas: a canvas element
	//returned function that returns the number of available landform paths
	var F=function(){return F.R.length;};
	F.X=[],F.Y=[],F.R=[];
	//### method that resets parameters for available landform paths ###
	F.reset=function(){
		F.X=[],F.Y=[],F.R=[];
	};
	//### method that generates landform contour lines using curved paths and returns modified radii ###
	F.curves=function(x,y,radius,linesN,dN,N){
		// - x and y: values of coordinates for the center
		// - radius: an array of radii
		// - linesN: the total number of contour lines
		// - dN: a span between two red lines
		// - N: an optional number of contour lines above the top red line
		//   0 is default value
		var ctx=canvas.getContext('2d'),arr=radius,arr2=[],i=0,P=[],_P=[],n=0;
		linesN=Math.floor(Math.abs(linesN));
		dN=Math.floor(Math.abs(dN));
		N=!N?0:-Math.floor(Math.abs(N));
		ctx.strokeStyle="#000";
		ctx.lineWidth=1.0;
		ctx.beginPath();
		while (i<linesN) {
			//contour line to color
			if(!((i+N)%dN!=0)){
				arr2.push(i!=0?P:arr);
			}
			//when i=(linesN-1)
			if(!(i<linesN-1)){
				F.X.push(x);
				F.Y.push(y);
				_P=linesN>1?P.map(a=>a):arr.map(a=>a);
				F.R.push(_P.sort((a,b)=>b-a)[0]);
			}
			P=i>0?ctx.landformPathCurves(x,y,P,5):ctx.landformPathCurves(x,y,arr,5);
			i+=1;
		}
		ctx.stroke();
		n=arr2.length;
		i=0;
		while(i<n){
			ctx.strokeStyle="#f00";
			ctx.lineWidth=1.0;
			ctx.beginPath();
			ctx.landformPathCurves(x,y,arr2[i],0);
			ctx.stroke();
			i+=1;
		}
		ctx=arr2=i=_P=n=null;
		return P;
	};
	//### method that generates landform contour lines using linear paths and returns modified radii ###
	F.lines=function(x,y,radius,linesN,dN,N){
		// - x and y: values of coordinates for the center
		// - radius: an array of radii
		// - linesN: the total number of contour lines
		// - dN: a span between two red lines
		// - N: an optional number of contour lines above the top red line
		//   0 is default value
		var ctx=canvas.getContext('2d'),arr=radius,arr2=[],i=0,P=[],_P=[],n=0;
		linesN=Math.floor(Math.abs(linesN));
		dN=Math.floor(Math.abs(dN));
		N=!N?0:-Math.floor(Math.abs(N));
		ctx.strokeStyle="#000";
		ctx.lineWidth=1.0;
		ctx.beginPath();
		while (i<linesN) {
			//contour line to color
			if(!((i+N)%dN!=0)){
				arr2.push(i!=0?P:arr);
			}
			//when i=(linesN-1)
			if(!(i<linesN-1)){
				F.X.push(x);
				F.Y.push(y);
				_P=linesN>1?P.map(a=>a):arr.map(a=>a);
				F.R.push(_P.sort((a,b)=>b-a)[0]);
			}
			P=i>0?ctx.landformPathLines(x,y,P,5):ctx.landformPathLines(x,y,arr,5);
			i+=1;
		}
		ctx.stroke();
		n=arr2.length;
		i=0;
		while(i<n){
			ctx.strokeStyle="#f00";
			ctx.lineWidth=1.0;
			ctx.beginPath();
			ctx.landformPathLines(x,y,arr2[i],0);
			ctx.stroke();
			i+=1;
		}
		ctx=arr2=i=_P=n=null;
		return P;
	};
	//### method that generates landform contour lines covering the available landform paths and returns modified radii ###
	//the generated landform contour lines using curved paths
	F.coveringCurves=function(radius,linesN,dN,N){
		// - radius: an array of radii
		//   given radius array must be the minimum values such as initial values
		// - linesN: the total number of contour lines
		// - dN: a span between two red lines
		// - N: an optional number of contour lines above the top red line
		//   0 is default value
		//value of circle is [x,y,radius]
		var ctx=canvas.getContext('2d'),arr=[],P=[],circle=ctx.coveringCircle(F.X,F.Y,F.R);
		//radii are adjusted to cover other paths
		arr=radius.map(a=>a+circle[2]);
		F.reset();
		//drawing paths
		P=F.curves(circle[0],circle[1],arr,linesN,dN,N);
		ctx=arr=circle=null;
		return P;
	};
	//### method that generates landform contour lines covering the available landform paths and returns modified radii ###
	//the generated landform contour lines using linear paths
	F.coveringLines=function(radius,linesN,dN,N){
		// - radius: an array of radii
		//   given radius array must be the minimum values such as initial values
		// - linesN: the total number of contour lines
		// - dN: a span between two red lines
		// - N: an optional number of contour lines above the top red line
		//   0 is default value
		//value of circle is [x,y,radius]
		var ctx=canvas.getContext('2d'),arr=[],P=[],circle=ctx.coveringCircle(F.X,F.Y,F.R);
		//radii are adjusted to cover other paths
		arr=radius.map(a=>a+circle[2]);
		F.reset();
		//drawing paths
		P=F.lines(circle[0],circle[1],arr,linesN,dN,N);
		ctx=arr=circle=null;
		return P;
	};
	return F;
}
