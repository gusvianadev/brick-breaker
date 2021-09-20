class Controls {
	constructor(game) {
		addEventListener('keydown', (ev) => {
			switch (ev.key) {
				case 'a':
				case 'ArrowLeft':
					game.elements.paddle.move(-1);
					break;
				case 'd':
				case 'ArrowRight':
					game.elements.paddle.move(1);
					break;
			}
		});
		addEventListener('keyup', (ev) => {
			switch (ev.key) {
				case 'a':
				case 'ArrowLeft':
					game.elements.paddle.speed < 0 &&
						game.elements.paddle.stop();
					break;
				case 'd':
				case 'ArrowRight':
					game.elements.paddle.speed > 0 &&
						game.elements.paddle.stop();
					break;
			}
		});

		document.getElementById('btn-start').addEventListener('click', () => {
			game.state = 'playing';
			game.newGame();
		});
		document.getElementById('btn-restart').addEventListener('click', () => {
			game.state = 'playing';
			game.newGame();
		});
	}
}

export default Controls;
