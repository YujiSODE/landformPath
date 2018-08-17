/*landformPath
* landformPath.js
*===================================================================
*	Copyright (c) 2018 Yuji SODE <yuji.sode@gmail.com>
*
*	This software is released under the MIT License.
*	See LICENSE or http://opensource.org/licenses/mit-license.php
*===================================================================
*/
//Methods that generates imaginary landform contour paths
/*
*=== Synopsis ===
* - `context.landformPathCurves(x,y,r,dr,rad0);`
*   method that generates imaginary landform contour path and returns modified array of radii.
*   this method using a quadratic Bézier curve to connect paths.
*
* - `context.landformPathLines=function(x,y,r,dr,rad0);`
*   method that generates imaginary landform contour path and returns modified array of radii.
*   this method using a line to connect paths.
*--- Parameters ---
*   - `context`: CanvasRenderingContext2D
*   - `x` and `y`: coordinates of the center
*   - `r`: an array of non-negative lengths for radii
*   - `dr`: an optional radius expansion
*     0 is default value
*   - `rad0`: an optional value for initial angle in radians
*     0 is default value
*------------------
* - `context.coveringCircle(X,Y,R);`
*   method that estimates properties of a circle covering the other circles.
*   returned value is `[x,y,radius]`.
*--- Parameters ---
*   - `context`: CanvasRenderingContext2D
*   - `X`: an array of horizontal center coordicates for inner circle
*   - `Y`: an array of vertical center coordicates for inner circle
*   - `R`: an array of radii for inner circles
*/
//============================================================================
//method that generates imaginary landform contour path and returns modified array of radii
//this method using a quadratic Bézier curve to connect paths
window.CanvasRenderingContext2D.prototype.landformPathCurves=function(x,y,r,dr,rad0){
	// - x and y: coordinates of the center
	// - r: an array of non-negative lengths for radii
	// - dr: an optional radius expansion
	//   0 is default value
	// - rad0: an optional value for initial angle in radians
	//   0 is default value
	var ctx=this,i=1,n=r.length,
		rad=0,dRad=0,pi2=2*Math.PI,
		R=0,X=0,Y=0,X0=0,Y0=0;
	//### initial values ###
	r=n>0?r:[1];
	n=r.length;
	dr=!dr?0:+dr;
	rad0=!rad0?0:+rad0;
	dRad=pi2/n;
	rad=rad0+dRad;
	R=Math.abs(r[0]);
	//### path ###
	ctx.translate(x,y);
	//initial values for x and y
	X0=R*Math.cos(rad0);
	Y0=R*Math.sin(rad0);
	ctx.moveTo(X0,Y0);
	while(i<n){
		R=Math.abs(r[i]);
		X=R*Math.cos(rad);
		Y=R*Math.sin(rad);
		ctx.quadraticCurveTo((R+1)*Math.cos(rad-dRad/2),(R+1)*Math.sin(rad-dRad/2),X,Y);
		rad+=dRad;
		i+=1;
	}
	//closing path
	R=Math.abs(r[0]);
	ctx.quadraticCurveTo((R+1)*Math.cos(rad-dRad/2),(R+1)*Math.sin(rad-dRad/2),X0,Y0);
	//reset the current canvas transformation
	ctx.setTransform(1,0,0,1,0,0);
	i=n=rad=dRad=pi2=R=X=Y=X0=Y0=null;
	//a modified array of radii is returned
	return r.map(e=>e+dr);
};
//method that generates imaginary landform contour path and returns modified array of radii
//this method using a line to connect paths
window.CanvasRenderingContext2D.prototype.landformPathLines=function(x,y,r,dr,rad0){
	// - x and y: coordinates of the center
	// - r: an array of non-negative lengths for radii
	// - dr: an optional radius expansion
	//   0 is default value
	// - rad0: an optional value for initial angle in radians
	//   0 is default value
	var ctx=this,i=1,n=r.length,
		rad=0,dRad=0,pi2=2*Math.PI,
		R=0,X=0,Y=0,X0=0,Y0=0;
	//### initial values ###
	r=n>0?r:[1];
	n=r.length;
	dr=!dr?0:+dr;
	rad0=!rad0?0:+rad0;
	dRad=pi2/n;
	rad=rad0+dRad;
	R=Math.abs(r[0]);
	//### path ###
	ctx.translate(x,y);
	//initial values for x and y
	X0=R*Math.cos(rad0);
	Y0=R*Math.sin(rad0);
	ctx.moveTo(X0,Y0);
	while(i<n){
		R=Math.abs(r[i]);
		X=R*Math.cos(rad);
		Y=R*Math.sin(rad);
		ctx.lineTo(X,Y);
		rad+=dRad;
		i+=1;
	}
	//closing path
	ctx.closePath();
	//reset the current canvas transformation
	ctx.setTransform(1,0,0,1,0,0);
	i=n=rad=dRad=pi2=R=X=Y=X0=Y0=null;
	//a modified array of radii is returned
	return r.map(e=>e+dr);
};
//method that estimates properties of a circle covering the other circles
//returned value is [x,y,radius]
window.CanvasRenderingContext2D.prototype.coveringCircle=function(X,Y,R){
	// - X: an array of horizontal center coordicates for inner circle
	// - Y: an array of vertical center coordicates for inner circle
	// - R: an array of radii for inner circles
	var xO=0,yO=0,rO=0,i=0,n=0,
		nX=X.length,nY=Y.length,nR=R.length,
		radii=[];
	n=nX*nY*nR>0?Math.min(nX,nY,nR):0;
	//### center coordinates of covering circle ###
	while(i<n){
		xO+=X[i];
		yO+=Y[i];
		i+=1;
	}
	xO=n!=0?xO/n:0;
	yO=n!=0?yO/n:0;
	//### the max radius of covering circle ###
	i=0;
	while(i<n){
		radii.push(Math.sqrt((X[i]-xO)**2+(Y[i]-yO)**2)+R[i]);
		i+=1;
	}
	rO=n!=0?radii.sort((a,b)=>b-a)[0]:0;
	return [xO,yO,rO];
};

