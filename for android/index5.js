var c = document.createElement("canvas");
var ctx = c.getContext("2d");
c.width = 964;
c.height = 950;
document.body.appendChild(c);

//...........2
var perm = [];

while(perm.length < 255){
	while(perm.includes(val = Math.floor(Math.random()*255)));
	perm.push(val);
}

var lerp = (a,b,t) => (a + (b-a) *(1- Math.cos(t*Math.PI))/2); //.........6

var noise = x=>{
	//............4
	x = x* 0.01 % 255;


	return lerp(perm[Math.floor(x)], perm[Math.ceil(x)], x - Math.floor(x));	
}


//.........8
var player = new function(){
	this.x = 100;
	this.y = 800;
	this.ySpeed = 0; //.....9
	this.rot = 0;
	this.rSpeed = 0;


	this.img = new Image();
	this.img.src = "bicycle.png";
	this.draw = function(){
		//..........9
		var p1 = c.height - noise(t + this.x)*0.25;
		var p2 = c.height - noise(t+5 + this.x)*0.25;//.....11
		var grounded = 0; //.............12

		if(p1-15 > this.y){
			this.ySpeed += 0.1;
		}else{
			this.y = p1 - 15;
			this.ySpeed -= 0.3; //.........10
			grounded = 1; //......12
		}

		if(!playing || grounded && Math.abs(this.rot) > Math.PI * 0.5){//............15
			playing = false;
			this.rSpeed = 5;
			k.ArrowRight = 2;
			k.ArrowLeft = 2;
			k.ArrowLeft = 0;
			if(nowspeed == 0)
				nowspeed = speed; 
			this.x -= nowspeed * 0.2;
		}

		var angle = Math.atan2((p2-15) - this.y, (this.x+5) - this.x);//.......12

		this.y += this.ySpeed;

		if(grounded && playing){
		this.rot -= (this.rot - angle) * 0.5;//.........12
		this.rSpeed -= this.rSpeed - (angle - this.rot); //...13
		
		}
		this.rSpeed += (k.ArrowDown - k.ArrowUp) * 0.001;
		if(!grounded)
		this.rSpeed += (k.ArrowDown - k.ArrowUp) * 0.08; //.......14
		//k.ArrowUp = 0;
		//k.ArrowDown = 0;
		this.rot -= this.rSpeed * 0.08;
		if(this.rot > Math.PI) this.rot = -Math.PI;
		if(this.rot < -Math.PI) this.rot = Math.PI;


		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.rot);
		ctx.drawImage(this.img, -15, -20, 45, 45);
		ctx.restore();
	}
}


//........7
var t = 0;
var playing = true;
//................14
var speed = 0;
var nowspeed = 0;
var k = {ArrowLeft:0, ArrowRight:0, ArrowUp:0, ArrowDown:0};

//...............1
function loop(){
	speed += (k.ArrowRight - k.ArrowLeft)* 0.1;
	k.ArrowRight = 0;
	k.ArrowLeft = 0;
	if(speed < 0)
		speed = 0;
	if(speed > 3)
		speed = 3;
	//console.log(k);
	if(playing)
		t += 5 * speed; //........7
	if(!playing)
		t += 5* nowspeed;
	ctx.fillStyle = "#19f";
	ctx.fillRect(0, 0, c.width, c.height);

	//............3
	ctx.fillStyle = "black";
	ctx.beginPath();
	//...........4
	ctx.moveTo(0, c.height);
	for (var i = 0; i < c.width; i++)
		ctx.lineTo(i, c.height - noise(t + i)*0.25);  //.......5,7

	//.......4
	ctx.lineTo(c.width, c.height);
	ctx.fill();
	

player.draw(); //............8
	requestAnimationFrame(loop);



}


function butt1click(){
	k.ArrowLeft = 1;
	k.ArrowRight = 0;
}
function butt2click(){
		k.ArrowRight = 1;
		k.ArrowLeft = 0;
}
function butt4click(){
	k.ArrowUp = 1;
	k.ArrowDown = 0;
}
function butt5click(){
		k.ArrowDown = 1;
		k.ArrowUp = 0;
}
function butt3click(){
		
		k.ArrowDown = 0;
		k.ArrowUp = 0;
}

onkeydown = d => k[d.key] = 1;
onkeyup = d => k[d.key] = 0;

loop();


//................7:25

