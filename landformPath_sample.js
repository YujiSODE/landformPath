//Yuji SODE 2018
//sample script using landformPath.js
//###### code example ######
var C=window.document.getElementById('sample1'),
	r=[1,3,5,7,11,13,17,19],
	R=[],i=0;
while(i<20){R.push(20*Math.random()),i+=1;}
var L=getLandform(C);
L.curves(30,30,R,10,5);
//L.lines(70,70,r,10,3,1);
//##########################
function getLandform(canvas){
	// - canvas: a canvas element
	var F=function(){return F.R.length;};
	F.X=[],F.Y=[],F.R=[];
	//method that resets parameters
	F.reset=function(){
		F.X=[],F.Y=[],F.R=[];
	};
	//method that generates landform contour lines using curved paths and returns modified radii
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
		arr2=i=_P=n=null;
		return P;
	};
	//method that generates landform contour lines using linear paths and returns modified radii
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
		arr2=i=_P=n=null;
		return P;
	};
	return F;
}
