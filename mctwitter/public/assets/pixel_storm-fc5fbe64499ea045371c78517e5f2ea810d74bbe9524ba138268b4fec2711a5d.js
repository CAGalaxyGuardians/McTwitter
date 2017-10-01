//https://codepen.io/amwmedia/pen/EjmRJK

(function () {
	'use strict';

	// cross browser requestAnimationFrame loop to handle the animation looping
	var rAF = (function(){
		return  window.requestAnimationFrame   ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function( callback ){
				window.setTimeout(callback, 1000 / 60);
			};
	})();

	var winWidth, winHeight, maxRadius, d,
		minRadius = 10,
		gridCols, gridRows,
		particles, tracer,
		countChangeRate = 5,
		gridSize = 14,
		particleSize = 3,
		canvas, ctx,
		avgFPS = 60,
		timer = (new Date()).getTime(),
		frameBuffer = [60,60,60,60,60,60,60,60,60,60],
		FPS = 0,
		tick = 1,
		fillStyles = [],
		friction = 0.97,
		initialized = false, initializing = true;

	// ------------------------ //
	// #### Particle Class #### //
	// ------------------------ //
	function Particle(){
		var _p = this;

		_p.newTracer = true;

		_p.x = tracer.x;
		_p.y = tracer.y;

		_p.fillOffset = 0;

		_p.tracer = {
			x: tracer.x,
			y: tracer.y
		};

		// start this particle with velocity
		_p.velx = Math.random() * 10 - 5;
		_p.vely = Math.random() * 10 - 5;
	}
	// Setup a common draw function that will be called
	// by all members of the Particle class
	Particle.prototype.draw = function(){
		var _p = this,
			box = {
				t: Math.floor(_p.y / gridSize) * gridSize,
				l: Math.floor(_p.x / gridSize) * gridSize,
				r: Math.ceil(_p.x / gridSize) * gridSize,
				b: Math.ceil(_p.y / gridSize) * gridSize
			};

		if (Math.abs(_p.velx) + Math.abs(_p.vely) < 1) {
			ctx.fillRect(box.l + particleSize, box.t + particleSize, gridSize - particleSize*2, gridSize - particleSize*2);
		} else if (Math.abs(_p.velx) > Math.abs(_p.vely)) {
			if (_p.y - box.b > box.t - _p.y) {
				ctx.fillRect(_p.x, box.t, particleSize, particleSize);
			} else {
				ctx.fillRect(_p.x, box.b, particleSize, particleSize);
			}
		} else {
			if (_p.x - box.l > box.r - _p.x) {
				ctx.fillRect(box.r, _p.y, particleSize, particleSize);
			} else {
				ctx.fillRect(box.l, _p.y, particleSize, particleSize);
			}
		}

		if (_p.newTracer) {
			ctx.fillRect(_p.tracer.x, _p.tracer.y, particleSize, particleSize);
			_p.newTracer = false;
		}
	};
	Particle.prototype.update = function(tick){
		if (d == null) { return; }
		var _p = this,
			_rnd = Math.random(),
			_vel,
			_t = _p.tracer,
			diffX, diffY,
			maxBurst = 10, burst;

		diffX = _t.x - _p.x;
		diffY = _t.y - _p.y;

		if ((Math.abs(_p.velx) < 2 && Math.abs(_p.vely) < 2) && (Math.abs(diffX) < 2 && Math.abs(diffY) < 2)) {
			burst = maxBurst * d.b + 2;

			_p.velx = Math.random() * burst - (burst / 2);
			_p.tracer.x = tracer.x + (d.b * maxRadius + minRadius) * Math.sin(_rnd * (Math.PI * 2));

			_p.vely = Math.random() * burst - (burst / 2);
			_p.tracer.y = tracer.y + (d.b * maxRadius + minRadius) * Math.cos(_rnd * (Math.PI * 2));

			if (!d.c) {
				_p.x = tracer.x;
				_p.y = tracer.y;
			}

			_p.fillOffset = 100 * d.a;
			_p.newTracer = true;
		}

		_p.velx += diffX / 1000;
		_p.vely += diffY / 1000;

		// friction
		_p.velx *= friction;
		_p.vely *= friction;

		// tick adjust
		_p.x += _p.velx * tick;
		_p.y += _p.vely * tick;

		_vel = Math.abs(_p.velx) + Math.abs(_p.vely);
		_p.fillStyle = Math.min(Math.round((_vel/15) * 99), 99) + (_p.fillOffset);
		_p.fillStyle = (_p.fillStyle + 100) % 100;
	};

	// ------------------------------ //
	// #### Draw the canvas data #### //
	// ------------------------------ //
	function drawScene(){
		var i, len, f, _p;

		ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
		ctx.fillRect(0, 0, winWidth, winHeight);
		_p = particles[i-1];
		for (len = fillStyles.length, f = 0; f < len; f++) {
			// draw each particle
			i = particles.length;
			ctx.fillStyle = fillStyles[f];

			for(; i-- ;){
				_p = particles[i];
				if (_p.fillStyle !== f) { continue; }
				_p.draw();
			}
		}

		// update the scene
		update();

		// schedule the next update
		rAF(drawScene);
	}

	// ------------------------------------------------ //
	// #### Update the scene, animate all elements #### //
	// ------------------------------------------------ //
	function update(){

		// 1000ms is 1s, divided by the number of ms it took
		// us since last update gives us how many times we
		// could have performed this frame within 1 second (FPS)
		var _timer = (new Date()).getTime();
		var _lastFPS = FPS;
		var i;

		FPS = 1000 / (_timer - timer);
		frameBuffer.shift();
		frameBuffer.push(FPS);
		// average the new FPS value with the last one to ease the change rate
		avgFPS = frameBuffer.reduce(function (prev, cur) { return prev + cur; }, 0) / frameBuffer.length;
		timer = _timer;

		// tick is how far from the ideal speed we are
		// if we are rendering slower, this number will be higher.
		// we'll use this to adjust the amount of movement we perform
		// on each particle per frame.
		tick = 60 / FPS;


		i = countChangeRate;
		if (avgFPS > 58) {
			for (; i-- ;) { particles.push(new Particle()); }
		} else if (avgFPS < 55) {
			for (; i-- ;) { particles.pop(); }
		}

		// look at each particle and evaluate how it should move
		// next based on it's current valocity and attraction to
		// any other particles that are close enough.
		for(i = particles.length; i-- ;){
			particles[i].update(tick);
		}
	}

	// -------------------------------------------- //
	// #### Initialize and setup the animation #### //
	// -------------------------------------------- //
	function init(){
		var i;

		initializing = true;
		// Get a reference to our canvas
		canvas = document.getElementById("canvas") || document.createElement("canvas");
		canvas.id = 'canvas';
		document.body.appendChild(canvas);
		sizeCanvas();
		ctx = canvas.getContext("2d");

		// setup init values
		particles = [];

		for (i = 100; i--;) {
			fillStyles[i] = 'hsla(' +
				(360 * (i/99)) + ', ' +
				'100%, 60%, 0.9)';
		}

		// create all of our particles and push them into our main array to hold.
		i = countChangeRate;
		for(; i-- ;){
			particles[i] = new Particle();
			console.log(particles[i])
		}

		if(!initialized){
			drawScene();
			bindEvents();
			initialized = true;
		}
		initializing = false;
	}


	function sizeCanvas(){
		winHeight = window.innerHeight;
		winWidth = window.innerWidth;
		maxRadius = Math.min(winWidth, winHeight)/2;

		canvas.width = winWidth;
		canvas.height = winHeight;
		canvas.style.width = winWidth + 'px';
		canvas.style.height = winHeight + 'px';
	}


	// -------------------------------------------------- //
	// #### Set up the event bindings for user input #### //
	// -------------------------------------------------- //
	function bindEvents(){
		// resize canvas when window resizes
		window.addEventListener('resize', init, false);
	}

	// Initialize the animation
	window.onRandomData(function (data) {
		d = {a: data.a / 40, b: data.b / 12, c: data.c};
		if (tracer == null) { tracer = {}; }
		tracer.x = d.a * (winWidth - maxRadius) + (maxRadius/2);
		tracer.y = d.b * (winHeight - maxRadius) + (maxRadius/2);
		if (!initialized) { init(); }
	});

}());
