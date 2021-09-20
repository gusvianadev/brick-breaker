const types = ['normal', 'big'];
const colors = [null, 'blue', 'brown', 'gray', 'green', 'light_blue'];

const layouts = [
	[
		['00', '01', '01', '00', '03', '03', '03', '00', '01', '01', '00'],
		['00', '01', '01', '00', '03', '03', '03', '00', '01', '01', '00'],
		['01', '01', '01', '02', '04', '04', '04', '02', '01', '01', '01'],
		['01', '01', '01', '02', '04', '04', '04', '02', '01', '01', '01'],
		['00', '01', '01', '00', '04', '04', '04', '00', '01', '01', '00'],
		['00', '01', '01', '00', '03', '03', '03', '00', '01', '01', '00'],
	],
	[
		['00', '01', '01', '00', '03', '03', '03', '00', '01', '01', '00'],
		['00', '01', '01', '00', '03', '03', '03', '00', '01', '01', '00'],
		['01', '01', '01', '02', '04', '04', '04', '02', '01', '01', '01'],
		['01', '01', '01', '02', '04', '04', '04', '02', '01', '01', '01'],
		['00', '01', '01', '00', '04', '04', '04', '00', '01', '01', '00'],
		['00', '01', '01', '00', '03', '03', '03', '00', '01', '01', '00'],
	],
];

const levels = {};

function buildLevels() {
	layouts.forEach((layout, layoutI) => {
		const level = layoutI + 1;
		levels[level] = [];

		layout.forEach((row, rowI) => {
			levels[level][rowI] = [];

			row.forEach((brick) => {
				if (brick !== '00') {
					const brickType = types[brick[0]];
					const brickColor = colors[brick[1]];

					levels[level][rowI].push({
						type: brickType,
						color: brickColor,
					});
				} else {
					levels[level][rowI].push(null);
				}
			});
		});
	});
}

buildLevels();

export default levels;
