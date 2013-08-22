MAX_WIDTH = 1000;
MAX_HEIGHT = 800;
NUM_ASTEROIDS = 20;
ASTEROID_RADIUS = 15;
MIN_VELOCITY = -10;
MAX_VELOCITY = 10;

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function MovingObject(config) {
	this.x = config[0];
	this.y = config[1];
	this.xVel = config[2];
	this.yVel = config[3];
}

MovingObject.prototype.update = function(dx, dy) {
	this.x = Math.abs((this.x + dx + MAX_WIDTH) % MAX_WIDTH);
	this.y = Math.abs((this.y + dy + MAX_HEIGHT) % MAX_HEIGHT);
}

MovingObject.prototype.offscreen = function(){
	if (x < 0 || x > MAX_WIDTH || y < 0 || y > MAX_HEIGHT){
		return true;
	}else{
		return false;
	}
}

Function.prototype.inherits = function (superClass) {
	function Surrogate() {};
	Surrogate.prototype = superClass.prototype;
	this.prototype = new Surrogate();
}

function Asteroid (config) {
	this.x = config[0];
	this.y = config[1];
	this.xVel = config[2];
	this.yVel = config[3];
}
Asteroid.inherits(MovingObject);

Asteroid.prototype.draw = function(canvasContext) {
	canvasContext.fillStyle = "red";
	canvasContext.beginPath();
	canvasContext.arc(
		this.x,
		this.y,
		ASTEROID_RADIUS, 0,
		2 * Math.PI,
		false
	);
	canvasContext.fill();
}

function Game () {
	this.asteroids = [];
  for (var i = 0; i < NUM_ASTEROIDS; i++ ) {
		a = new Asteroid(Asteroid.randomAsteroid());
  	this.asteroids.push(a);
  }
}

Asteroid.randomAsteroid = function() {
	var x = getRandomInt(0, MAX_WIDTH);
	var y = getRandomInt(0, MAX_HEIGHT);
	var xVel = getRandomInt(MIN_VELOCITY, MAX_VELOCITY);
	var yVel = getRandomInt(MIN_VELOCITY, MAX_VELOCITY);
	return [x, y, xVel, yVel];
}


Game.prototype.draw = function() {
	this.canvas.fillStyle = "black";
	this.canvas.fillRect(0, 0, MAX_WIDTH, MAX_HEIGHT);

	for (var i = 0; i < NUM_ASTEROIDS; i++) {
		this.asteroids[i].draw(this.canvas);
	}
}

Game.prototype.update = function() {
	for (var i = 0; i < NUM_ASTEROIDS; i++) {
		this.asteroids[i].update(this.asteroids[i].xVel, this.asteroids[i].yVel);
	}
}

Game.prototype.start = function(canvasEl){
	var gameFunction = this;
  this.canvas = canvasEl.getContext("2d");
	window.setInterval(function () {
		gameFunction.update();
	  gameFunction.draw(this.canvas);
	}, 31);
}

$(function () {
  var canvas = $("<canvas width='" + MAX_WIDTH +
                 "' height='" + MAX_HEIGHT + "'></canvas>");
  $('body').append(canvas);
  // `canvas.get(0)` unwraps the jQuery'd DOM element;
  new Game().start(canvas.get(0));
});

// window.AsteroidsGame = (function (currentAsteroidObject) {
//   // attributes defined in file1
// 	currentAsteroidObject.MovingObject = "goat";
//
//   return currentAsteroidObject;
// })(AsteroidsGame || {});