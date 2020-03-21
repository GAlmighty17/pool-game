import board_texture from './asset/image/board_texture.jpg';
const canvas = document.getElementById('pool-board');
const ctx = canvas.getContext('2d');
const fpsView = document.getElementById("fps");
let bgTexture = new Image();
bgTexture.src = board_texture;
var boardFriction = 0.99;
var collisionFriction = 0.4;
var lastTime = new Date();
var mouseStart = { x: 0, y: 0 };
var mouseEnd = { x: 0, y: 0 };
var shotVector = { X: 0, y: 0, power: 0 }

canvas.width = document.getElementById("container").offsetWidth - 150;
canvas.height = document.getElementById("container").offsetHeight - 150;

function rotate(velocity, angle) {
	const rotatedVelocities = {
		x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
		y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
	};

	return rotatedVelocities;
}

function resolveCollision(particle, otherParticle) {
	const xVelocityDiff = particle.dx - otherParticle.dx;
	const yVelocityDiff = particle.dy - otherParticle.dy;

	const xDist = otherParticle.x - particle.x;
	const yDist = otherParticle.y - particle.y;

	// Prevent accidental overlap of particles
	if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

		// Grab angle between the two colliding particles
		const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

		// Store mass in var for better readability in collision equation
		const m1 = particle.mass;
		const m2 = otherParticle.mass;

		// Velocity before equation
		const u1 = rotate({ x: particle.dx, y: particle.dy }, angle);
		const u2 = rotate({ x: otherParticle.dx, y: otherParticle.dy }, angle);

		// Velocity after 1d collision equation
		const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
		const v2 = { x: u2.x * (m2 - m1) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

		// Final velocity after rotating axis back to original location
		const vFinal1 = rotate(v1, -angle);
		const vFinal2 = rotate(v2, -angle);

		// Swap particle velocities for realistic bounce effect
		particle.dx = vFinal1.x;
		particle.dy = vFinal1.y;

		otherParticle.dx = vFinal2.x;
		otherParticle.dy = vFinal2.y;
	}
}

addEventListener("mousedown", e => registerMoseStart(e));
addEventListener("mouseup", e => registerMoseEnd(e));

function registerMoseStart(event) {
	// if (cueBall.dx > 0.1 || cueBall.dy > 0.1) return;
	mouseStart = {
		x: event.x,
		y: event.y
	}
}

function registerMoseEnd(event) {
	// if (cueBall.dx > 0.1 || cueBall.dy > 0.1) return;
	mouseEnd = {
		x: event.x,
		y: event.y
	}
	var distance = getDistance(mouseStart, mouseEnd);
	if (distance === 0) return;
	var normalizedPower = 50 * distance / (canvas.width / 2);
	var power = normalizedPower > 50 ? 50 : normalizedPower;
	var direction = getDirection(mouseStart, mouseEnd, distance);
	shotVector = { ...direction, power };
	cueBall.dx += shotVector.power * shotVector.x;
	cueBall.dy += shotVector.power * shotVector.y;
	console.log(cueBall.dx, cueBall.dy);

}

function getDirection(point1, point2, distance) {
	var x = point1.x - point2.x;
	var y = point1.y - point2.y;
	var normalizeX = Math.round(x / distance * 1000) / 1000;
	var normalizeY = Math.round(y / distance * 1000) / 1000;
	return { x: normalizeX, y: normalizeY };
}

function getDistance(point1, point2) {
	let xDistance = point1.x - point2.x;
	let yDistance = point1.y - point2.y;
	return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function Hole(x, y) {
	this.radius = 100;
	this.x = 0;
	this.y = 0;

	this.draw = function(ctx) {
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(this.radius, this.y);
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI / 2, false);
		ctx.moveTo(this.x, this.y);
		// ctx.arc(X, Y, RADIUS, START ANGLE, END ANGLE, ANIT-CLOCKWISE(TRUE/FALSE));
		ctx.closePath();
		ctx.fillStyle = "#000";
		ctx.fill();
	}
}

function Ball(x, y, color) {
	this.radius = 43;
	this.x = x;
	this.y = y;
	this.dx = 0;
	this.dy = 0;
	this.color = color;
	this.mass = 1;

	this.draw = function(ctx) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
	}

	this.update = function(ctx) {
		// Movement of ball
		this.x += this.dx;
		this.y += this.dy;

		// To not stick to the wall
		if (this.x + this.radius + this.dx >= canvas.width)
			this.x = canvas.width - this.radius;
		if (this.x - this.radius <= 0)
			this.x = this.radius;
		if (this.y + this.radius + this.dy >= canvas.height)
			this.y = canvas.height - this.radius;
		if (this.y - this.radius <= 0)
			this.y = this.radius

		// To bounce back from the walls
		// Left Right Wall
		if (this.x + this.radius + this.dx >= canvas.width || this.x - this.radius <= 0) {
			this.dx = -this.dx * collisionFriction;
		} else {
			this.dx *= boardFriction;
		}

		// Top Bottom Wall
		if (this.y + this.radius + this.dy >= canvas.height || this.y - this.radius <= 0) {
			this.dy = -this.dy * collisionFriction;
		} else {
			this.dy *= boardFriction;
		}

		if (Math.abs(this.dx) < 0.1 && Math.abs(this.dy) < 0.1) {
			this.dx = 0;
			this.dy = 0;
		}

		for (var i = 0; i < balls.length; i++) {
			if (this === balls[i] && this === cueBall) return;
			if (getDistance({ x: this.x, y: this.y }, { x: balls[i].x, y: balls[i].y }) <= this.radius + balls[i].radius)
				resolveCollision(this, balls[i]);
		}

		this.draw(ctx);
	}
}

var cueBall;
var balls = new Array();
var hole;

function init() {
	cueBall = new Ball(100, canvas.height / 2, "#fff");
	for (var i = 1; i <= 15; i++) {
		balls.push(new Ball(i * 100, canvas.height / 2, `#f${i}f`))
	}
	hole = new Hole();
}

function gameLoop(timeStamp) {
	let delTime = timeStamp - lastTime;
	lastTime = timeStamp;
	fpsView.innerHTML = Math.floor(1000 / delTime) + 'fps';
	ctx.drawImage(bgTexture, 0, 0, canvas.width, canvas.height);
	hole.draw(ctx);
	cueBall.update(ctx);
	for (var i = 0; i < balls.length; i++) {
		balls[i].update(ctx);
	}
	requestAnimationFrame(gameLoop);
}
init();
gameLoop(0);