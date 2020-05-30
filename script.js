// These two variables make you able to draw elements and interact with them on the HTML Canvas

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Variable for the background image

var field = new Image(); field.src = "images/field.jpg";

// Variables for the duck image, coordinates, and size.

var duck = new Image(); duck.src = "images/simpleduck.png";
var duckX = 1300;
var duckX2 = 1500;
var duckX3 = 1700;
var duckY = 150;
var duckY2 = 450;
var duckY3 = 0;

// I drew a rectangle around the duck images for use with a hitbox / hit test function because its easier to use coordinates of an object you created rather than an image

var rectX = duckX;
var rectY = duckY;
var rectX2 = duckX2;
var rectY2 = duckY2;
var rectX3 = duckX3;
var rectY3 = duckY3;

// These variables are images of the ammo counter in the bottom right.  Put into an array and using 'mag' to pick decide which image to draw.

var ammo1 = new Image(); ammo1.src="images/ammo1.png";
var ammo2 = new Image(); ammo2.src="images/ammo2.png";
var ammo3 = new Image(); ammo3.src="images/ammo3.png";
var ammo4 = new Image(); ammo4.src="images/ammo4.png";
var ammo = [ammo1, ammo2, ammo3, ammo4];
var mag = 0;

// These variables are for the crosshair image, coordinates and size.

var xhair = new Image(); xhair.src="images/xhair copy.png";
var xhairX = 600;
var xhairY = 360;
var xhairW = 100;
var xhairH = 100;

// These variables are used for the speed of the image moving along the x-axis

var dx = 5;
var dx2 = 5;
var dx3 = 5;

// These variables are used in the hitTest function and initializes the score to 0

var hit1 = false;
var hit2 = false;
var hit3 = false;
var shot = false;

// These variables are used to keep track of time with the counter, and the score

var counter = 0;
var score = 0;

// These variables hold the different images that are displayed at the start of the game, and the win or loss screen

var play = false;
var startImg = new Image(); startImg.src="images/start.jpg";
var win = new Image(); win.src="images/gameOverWin.png";
var lose = new Image(); lose.src="images/gameOverLose.png";
var gameOver = false;
var endScreen = [startImg, win, lose];
var WorL = 0;

// These functions draw 3 ducks with different speeds and coordinates.  Each duck has their own "hitbox" which is just a rectangle with the same coordinates and size as the duck images.

function drawDuck()
{
	ctx.drawImage(duck, duckX, duckY, 100, 100);
	ctx.fillStyle = "rgba(26,0,255,0.00)";
	ctx.fillRect(rectX, rectY, 100, 100);
}

function drawDuck2()
{
	ctx.drawImage(duck, duckX2, duckY2, 100, 100);
	ctx.fillStyle = "rgba(255,0,0,0.00)";
	ctx.fillRect(rectX2, rectY2, 100, 100);
}

function drawDuck3()
{
	ctx.drawImage(duck, duckX3, duckY3, 100, 100);
	ctx.fillStyle = "rgba(0,255,21,0.00)";
	ctx.fillRect(rectX3, rectY3, 100, 100);
}

// This function moves the ducks across the screen, and when it goes a certain distance it resets the X coordinate and changes the Y coordinates to a random number

function moveDuck()
{
	
	duckX = duckX - dx;
	duckX2 = duckX2 - dx2;
	duckX3 = duckX3 - dx3;
	
	rectX = duckX;
	rectX2 = duckX2;
	rectX3 = duckX3;
	
	rectY = duckY;
	rectY2 = duckY2;
	rectY3 = duckY3;

	
	if(duckX <= - 1000)
	{
		duckX = 1500;
		duckY = Math.floor(Math.random() * (500 - 10)) + 10;
		
	}
	
	if(duckX2 <= - 1000)
	{
		duckX2 = 1400;
		duckY2 = Math.floor(Math.random() * (500 - 10)) + 10;
	}
		
	if(duckX3 <= - 1000)
	{
		duckX3 = 1300;
		duckY3 = Math.floor(Math.random() * (500 - 10)) + 10;
	}
	
}

// These functions and event listeners draw the crosshair and enable you to control the crosshair with your mouse.

document.addEventListener("mousemove", mouseMoveHandler, false);

function drawXC()
{
	ctx.drawImage(xhair, xhairX, xhairY, xhairH, xhairW);
}


function mouseMoveHandler(e)
{
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width)
	{
        xhairX = relativeX - xhairW/2;
    }
	
	var relativeY = e.clientY - canvas.offsetTop;
    if(relativeY > 0 && relativeY < canvas.height)
	{
        xhairY = relativeY - xhairH/2;
    }
}

// These functions draw the ammo and score.

function drawText()
{
	ctx.font= "60px Dhurjati";
	ctx.fillStyle = "black";
	ctx.fillText("SCORE " + score, 25, 50);
}

function drawAmmo()
{
	ctx.drawImage(ammo[mag], 525, canvas.height - 130, 200, 150);
}

// This function determines whether or not the crosshair is over one of the duck images, and gives the input of whether or not you have clicked on one of the ducks.

function shotFired()
{
	if( xhairX + 50 >= rectX &&
		xhairX - 50 <= rectX + 100 &&
		xhairY + 50 >= rectY &&
		xhairY + 50 <= rectY + 100 &&
	  	shot === true)
	{
		
		hit1 = true;
		shot = false;
	}

	else
	{
		hit1 = false;
	}
	
	if( xhairX + 50 >= rectX2 &&
		xhairX - 50 <= rectX2 + 100 &&
		xhairY + 50 >= rectY2 &&
		xhairY + 50 <= rectY2 + 100 &&
	    shot === true)
	{
		
		hit2 = true;
		shot = false;
	}
	
	else
	{
		hit2 = false;
	}
	
	if( xhairX + 50 >= rectX3 &&
		xhairX - 50 <= rectX3 + 100 &&
		xhairY + 50 >= rectY3 &&
		xhairY + 50 <= rectY3 + 100 &&
	  	shot === true)
	{
		
		hit3 = true;
		shot = false;
	}
	
	else
	{
		hit3 = false;
	}
}

// This function tests if a duck has been hit, and resets the position and speed of the duck after it is hit

function hitTest()
{
	if(hit1 === true)
	{
		duckX = 1500;
		score = score + 500;
		duckY = Math.floor(Math.random() * (500 - 10)) + 10;
		dx = 5;
	
	}
	
	if(hit2 === true)
	{
		duckX2 = 1300;
		score = score + 500;
		duckY2 = Math.floor(Math.random() * (500 - 10)) + 10;
		dx2 = 5;
	
	}
	
	if(hit3 === true)
	{
		duckX3 = 1700;
		score = score + 500;
		duckY3 = Math.floor(Math.random() * (500 - 10)) + 10;
		dx3 = 5;

	}
	
}

// These functions make you able to interact with the canvas with your mouse and keyboard.  I made a reload, shoot, and stop shooting function.  They are all called by your mouse and keyboard. 


function shootTest()
{
	document.getElementById("myCanvas").onmousedown = function()
	{
		shoot();
		
	};
	
	document.getElementById("myCanvas").onmouseup = function()
	{
		stopS();
	};
	
	window.onkeydown = function()
	{
		reload();
	};
}

function reload()
{
	mag = 0;
}

function shoot()
{
	shot = true;
	
	if(mag === 3 && shot === true){
		shot = false;
	}
}

function stopS()
{
	shot = false;
	
	mag = mag + 1;
	
	if(mag >= 3){
		mag = 3;
	}
}


window.onkeydown = function()
	{
		restart();
	};

function restart()
{
	play = true;
	
}

// These 2 functions draw an images whenever the game isnt running, and starts the game when you click on the canvas.

function startScreen()
{
	if(play === false)
	{
		ctx.drawImage(endScreen[WorL], 0, 0, 1200, 720);
	}

}

// This draws the background image

function drawBack()
{
	ctx.drawImage(field, 0, 0, 1200, 720);
}

// This function ends the game whenever the counter reaches 15, and sets the win or lose screen.  Once the game is over it resets all of the variables so you can play again

function endGame()
{
	if(counter >= 15)
	{
		if(score >= 5000)
		{
			WorL = 1;
			play = false;
			score = 0;
			counter = 0;
			mag = 0;
			
			dx = 5;
			dx2 = 5;
			dx3 = 5;
			duckX = 1500;
			duckX2 = 1700;

;
			
		}
		
		else
		{
			WorL = 2;
			play = false;
			score = 0;
			counter = 0;
			mag = 0;
			
			dx = 5;
			dx2 = 5;
			dx3 = 5;
			duckX = 1500;
			duckX2 = 1700;
			duckX3 = 1300;
			
		}
		}

	
}

// This function adds a counter and makes it work.

function countDown()
{
	counter = counter + 0.01;
	ctx.font= "60px Dhurjati";
	ctx.fillStyle = "black";
	ctx.fillText("TIME: " + counter, 940, 50);
}

// This function is the one that actually draws everything on the canvas, and makes it look like a game with "requestAnimationFrame" 

function draw()
{
	if(play === false)
	{
		startScreen();
	}

	if(play === true)
	{
		drawBack();
		drawXC();
		drawDuck();
		moveDuck();
		drawDuck2();
		drawDuck3();
		drawAmmo();
		drawText();
		shotFired();
		hitTest();
		shootTest();
		endGame();
		countDown();
	}

	
	requestAnimationFrame(draw);
}

draw();





