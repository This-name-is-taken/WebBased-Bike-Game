var c = document.createElement("canvas");
var ctx = c.getContext("2d");
c.width = 500;
c.height = 350;
document.body.appendChild(c);

//...........2
var perm = [];

while(perm.length < 255){
	while(perm.includes(val = Math.floor(Math.random()*255)));
	perm.push(val);
}

var lerp = (a,b,t) => a + (b-a) *(1- Math.cos(t*Math.PI))/2; //.........6

var noise = x=>{
	//............4
	x = x* 0.01 % 255;


	return lerp(perm[Math.floor(x)], perm[Math.ceil(x)], x - Math.floor(x));	
}


//.........8
var player = new function(){
	this.x = c.width/2;
	this.y = 0;
	this.ySpeed = 0; //.....9
	this.rot = 0;


	this.img = new Image();
	this.img.src = "bicycle.png";
	this.draw = function(){

		//ctx.translate(this.x, this.y);
		ctx.drawImage(this.img, this.x, 100,60,60);
	}
}


//........7
var t = 0;
//...............1
function loop(){
	t+=1; //........7
	ctx.fillStyle = "#19f";
	ctx.fillRect(0, 0, c.width, c.height);

	//............3
	ctx.fillStyle = "black";
	ctx.beginPath();
	//...........4
	ctx.moveTo(0, c.height);
	for (let i = 0; i < c.width; i++)
		ctx.lineTo(i, c.height - noise(t + i)*0.25);  //.......5,7

	//.......4
	ctx.lineTo(c.width, c.height)
	ctx.fill();
	

player.draw(); //............8
	requestAnimationFrame(loop);
}

loop();