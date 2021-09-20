import Paddle from './elements/Paddle/Paddle';
import Ball from './elements/Ball/Ball';
import Controls from './Game_controls.js';
import Level from './Level/Level';

class Game {
	constructor(ctx, width, height) {
		this.title = 'Brick Breaker';
		this.ctx = ctx;
		this.width = width;
		this.height = height;
		this.borders = {
			top: 0,
			right: this.width,
			bottom: this.height,
			left: 0,
		};
		this.physics = {
			gravity: 0.5,
		};
		this.state = 'playing';

		// always put this last
		this.htmlScreens = {
			newGame: document.getElementById('new-game'),
			gameOver: document.getElementById('game-over'),
		};
		this.controls = new Controls(this);
	}

	start() {
		this.level = new Level(this);
		this.htmlScreens.newGame.style.display = 'flex';
		Object.entries(this.htmlScreens).forEach((screen) => {
			screen[1].style.width = `${this.width}px`;
			screen[1].style.height = `${this.height}px`;
		});
		this.newGame();
	}

	createLevel() {
		this.elements = {
			paddle: new Paddle(this),
			ball: new Ball(this),
		};
		this.level.levelUp();
	}

	newGame() {
		this.createLevel();
		Object.entries(this.htmlScreens).forEach((screen) => {
			screen[1].style.display = 'none';
		});
		this.state = 'playing';
	}

	gameOver() {
		this.htmlScreens.gameOver.style.display = 'flex';
		this.state = 'game over';
	}

	animate(timestamp) {
		if (this.state === 'playing') {
			Object.entries(this.elements).forEach((el) =>
				el[1].animate(timestamp)
			);
			this.level.animate();
		}
	}
}

export default Game;
