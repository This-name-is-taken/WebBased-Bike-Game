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
		//..........9
		var p1 = c.height - noise(t + this.x)*0.25;
		if(p1-15 > this.y){
			this.ySpeed -= 0.1;
		}else{
			this.y = p1 - 15;
			this.ySpeed = 0;
		}
		this.y -= this.ySpeed;


		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.drawImage(this.img, -15, -17, 35, 35);
		ctx.restore();
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


//................4:05