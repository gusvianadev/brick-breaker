class Brick {
	constructor(game, id, sprites, position) {
		this.game = game;
		this.id = id;
		this.sprites = sprites;
		this.position = {
			x: position.x,
			y: position.y,
		};
		this.state = 'normal';
		const sprite = this.sprites[this.state];
		this.sides = {
			top: this.position.y,
			right: this.position.x + sprite.width,
			bottom: this.position.y + sprite.height,
			left: this.position.x,
		};
	}

	checkCollision() {
		const ball = this.game.elements.ball;
		const ballTop = ball.sides.top;
		const ballRight = ball.sides.right;
		const ballBottom = ball.sides.bottom;
		const ballLeft = ball.sides.left;

		if (
			ballTop <= this.sides.bottom &&
			ballRight >= this.sides.left &&
			ballBottom >= this.sides.top &&
			ballLeft <= this.sides.right
		) {
			const ballOffsetTop = this.sides.top - ball.sides.top;
			const ballOffsetRight = ball.sides.right - this.sides.right;
			const ballOffsetBottom = ball.sides.bottom - this.sides.bottom;
			const ballOffsetLeft = this.sides.left - ball.sides.left;

			// hit top
			if (
				ballOffsetTop >= 0 &&
				ballOffsetTop >= ballOffsetLeft &&
				ballOffsetTop >= ballOffsetRight
			) {
				ball.collide(['y'], [this.sides.top - ball.size]);
			}

			// hit right
			else if (
				ballOffsetRight >= 0 &&
				ballOffsetRight >= ballOffsetTop &&
				ballOffsetRight >= ballOffsetBottom
			) {
				ball.collide(['x'], [this.sides.right]);
			}
			// hit bottom
			else if (
				ballOffsetBottom >= 0 &&
				ballOffsetBottom >= ballOffsetLeft &&
				ballOffsetBottom >= ballOffsetRight
			) {
				ball.collide(['y'], [this.sides.bottom]);
			}
			// hit left
			else if (
				ballOffsetLeft >= 0 &&
				ballOffsetLeft >= ballOffsetTop &&
				ballOffsetLeft >= ballOffsetBottom
			) {
				ball.collide(['x'], [this.sides.left - ball.size]);
			}

			if (this.state === 'normal') {
				this.state = 'broken';
			} else {
				this.game.level.removeBrick(this.id);
			}

			ball.checkSides();
		}
	}

	draw() {
		const ctx = this.game.ctx;
		const sprite = this.sprites[this.state];

		ctx.save();
		ctx.drawImage(
			sprite,
			this.position.x,
			this.position.y,
			sprite.width,
			sprite.height
		);
		ctx.restore();
	}

	animate() {
		this.checkCollision();
		this.draw();
	}
}

export default Brick;
