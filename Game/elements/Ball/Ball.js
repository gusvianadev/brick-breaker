import normal from './assets/sprites/normal/*.png';
import loadSprites from '../../helpers/loadSprites';
import checkSpriteIteration from '../../helpers/checkSpriteIteration';

class Ball {
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
			duration: 2000,
			currentSpriteIteration: 0,
		};
		const currentSprite =
			this.sprites[this.states.current][
				this.animation.currentSpriteIteration
			];
		this.size = currentSprite.width;
		this.position = {
			x: this.game.width / 2 - currentSprite.width / 2,
			y: this.game.borders.bottom - currentSprite.height - 100,
		};
		this.speed = {
			x: 5,
			y: 5,
		};
	}

	collide(axis, values) {
		axis.forEach((coordinate, i) => {
			this.position[coordinate] = values[i];
			this.speed[coordinate] *= -1;
		});
		this.checkSides();
	}

	handleGameBordersCollision() {
		// left
		if (this.sides.left <= this.game.borders.left) {
			this.collide(['x'], [this.game.borders.left]);
		}
		// right
		if (this.sides.right >= this.game.borders.right) {
			this.collide(['x'], [this.game.borders.right - this.size]);
		}
		// top
		if (this.sides.top <= this.game.borders.top) {
			this.collide(['y'], [this.game.borders.top]);
		}
		// bottom
		if (this.sides.bottom >= this.game.borders.bottom) {
			this.collide(['y'], [this.game.borders.bottom - this.size]);
		}

		this.checkSides();
	}
	handlePaddleCollision() {
		const paddle = this.game.elements.paddle;
		const betweenLeftAndRightSideOfPaddle =
			this.sides.right >= paddle.sides.left &&
			this.sides.left <= paddle.sides.right;
		if (
			this.sides.bottom >= this.game.elements.paddle.sides.top &&
			betweenLeftAndRightSideOfPaddle
		) {
			this.collide(['y'], [paddle.sides.top - this.size]);

			if (
				this.center.x >= this.game.elements.paddle.center &&
				this.speed.x < 0
			) {
				this.speed.x *= -1;
			} else if (
				this.center.x <= this.game.elements.paddle.center &&
				this.speed.x > 0
			) {
				this.speed.x *= -1;
			}
		}

		this.checkSides();
	}

	changePosition() {
		this.position.x += this.speed.x;
		this.position.y += this.speed.y;
		this.checkSides();
		this.handleGameBordersCollision();
		this.handlePaddleCollision();
	}

	checkSides() {
		this.sides = {
			top: this.position.y,
			right: this.position.x + this.size,
			bottom: this.position.y + this.size,
			left: this.position.x,
		};
		this.center = {
			x: this.sides.left + this.size / 2,
			y: this.sides.top + this.size / 2,
		};
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
			this.size,
			this.size
		);
		ctx.restore();
		checkSpriteIteration(this, timestamp);
	}

	animate(timestamp) {
		this.changePosition();
		this.draw(timestamp);
	}
}

export default Ball;
