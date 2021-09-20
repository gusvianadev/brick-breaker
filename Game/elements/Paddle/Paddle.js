import normal from './assets/sprites/normal/*.png';
import loadSprites from '../../helpers/loadSprites';
import checkSpriteIteration from '../../helpers/checkSpriteIteration';

class Paddle {
	constructor(game) {
		this.game = game;
		this.states = {
			all: [
				{
					name: 'normal',
					images: {
						src: normal,
						size: 0.2,
					},
				},
			],
			current: 'normal',
		};
		this.sprites = loadSprites(this);
		this.animation = {
			start: 0,
			duration: 300,
			currentSpriteIteration: 0,
		};
		const currentSprite =
			this.sprites[this.states.current][
				this.animation.currentSpriteIteration
			];
		this.size = {
			width: currentSprite.width,
			height: currentSprite.height,
		};
		this.position = {
			x: this.game.width / 2 - currentSprite.width / 2,
			y: this.game.borders.bottom - currentSprite.height - 20,
		};
		this.stats = {
			movementSpeed: 10,
		};
		this.speed = 0;
	}

	move(direction) {
		this.speed = this.stats.movementSpeed * direction;
	}

	stop() {
		this.speed = 0;
	}

	collide(axis, value) {}

	checkPosition() {
		this.position.x += this.speed;
		this.checkSides();

		// check game borders collision
		// left
		if (this.sides.left <= this.game.borders.left) {
			this.position.x = this.game.borders.left;
		}
		// right
		if (this.sides.right >= this.game.borders.right) {
			this.position.x = this.game.borders.right - this.size.width;
		}

		this.checkSides();
	}

	checkSides() {
		this.sides = {
			top: this.position.y,
			right: this.position.x + this.size.width,
			bottom: this.position.y + this.size.height,
			left: this.position.x,
		};
		this.center = this.sides.left + this.size.width / 2;
	}

	draw(timestamp) {
		const currentSprite =
			this.sprites[this.states.current][
				this.animation.currentSpriteIteration
			];
		const ctx = this.game.ctx;

		ctx.save();
		ctx.drawImage(
			currentSprite,
			this.position.x,
			this.position.y,
			this.size.width,
			this.size.height
		);
		ctx.restore();
		checkSpriteIteration(this, timestamp);
	}

	animate(timestamp) {
		this.checkPosition();
		this.draw(timestamp);
	}
}

export default Paddle;
