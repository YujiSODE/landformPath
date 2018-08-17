//Yuji SODE 2018
//sample script using "landformPath.js" and "landformPath_tools.js"
//###### code example ######
//canvas size: 300x300
var C=window.document.getElementById('sample1'),
	R=[],i=0,L=getLandform(C);
//1st path
while(i<20){R.push(20*Math.random()),i+=1;}
L.curves(70,70,R,10,5);
//2nd path
R=[],i=0;
while(i<30){R.push(10*Math.random()),i+=1;}
L.lines(180,120,R,11,5,1);
//3rd path
R=[],i=0;
while(i<20){R.push(30*Math.random()),i+=1;}
L.curves(80,190,R,7,5,2);
//4th path
R=[],i=0;
while(i<40){R.push(25*Math.random()),i+=1;}
L.coveringCurves(R,10,5);