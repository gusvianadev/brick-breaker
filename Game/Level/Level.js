import levels from './levels';
import normalBricks from './assets/bricks/sprites/normal/*.png';
import loadBricks from './helpers/loadBricks';
import Brick from './elements/Brick/Brick';

class Level {
	constructor(game) {
		this.game = game;
		this.currentLevel = 1;
		this.display = levels[this.currentLevel];
		this.normalBrickSize = {
			width: game.width / 11,
			height: game.width / 11 / 2,
		};
		this.bricksImages = loadBricks(this.normalBrickSize, [
			{ normal: normalBricks },
		]);
		this.elements = {
			bricks: [],
		};
	}

	levelUp() {
		this.brickPosition = {
			x: 0,
			y: 0,
		};

		let brickId = 0;
		levels[this.currentLevel].forEach((row) => {
			row.forEach((brick) => {
				if (brick) {
					const brickSprites =
						this.bricksImages[brick.type][brick.color];
					this.elements.bricks.push(
						new Brick(
							this.game,
							brickId,
							brickSprites,
							this.brickPosition
						)
					);
					brickId++;
				}
				this.brickPosition.x += this.normalBrickSize.width;
			});
			this.brickPosition.x = 0;
			this.brickPosition.y += this.normalBrickSize.height;
		});
	}

	removeBrick(brickId) {
		this.elements.bricks = this.elements.bricks.filter(
			(brick) => brick.id !== brickId
		);
	}

	draw() {
		this.elements.bricks.forEach((brick) => brick.animate());
	}

	animate() {
		this.draw();
	}
}

export default Level;
