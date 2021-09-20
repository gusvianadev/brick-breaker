import Game from './Game/Game.js';

const CANVAS = document.getElementById('canvas');
const ctx = CANVAS.getContext('2d');

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

CANVAS.width = GAME_WIDTH;
CANVAS.height = GAME_HEIGHT;
CANVAS.style.backgroundColor = '#FFFFFF';

const BrickBreaker = new Game(ctx, GAME_WIDTH, GAME_HEIGHT);
BrickBreaker.start();

const animateGame = (timestamp) => {
	ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
	BrickBreaker.animate(timestamp);
	requestAnimationFrame(animateGame);
};

requestAnimationFrame(animateGame);
