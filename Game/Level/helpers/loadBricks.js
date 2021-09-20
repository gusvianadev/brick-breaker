const loadBricks = (normalBrickSize, bricksArr) => {
	const bricks = {};

	bricksArr.forEach((brickType) => {
		Object.entries(brickType).forEach(([type, bricksObj]) => {
			bricks[type] = {};

			Object.entries(bricksObj).forEach(([name, src]) => {
				const color = name
					.replace('_normal', '')
					.replace('_broken', '');
				const state = name.replace(`${color}_`, '');
				const img = new Image();

				if (state === 'broken') {
					bricks[type][color] = {};
				}
				img.src = src;
				img.width =
					type === 'normal'
						? normalBrickSize.width
						: normalBrickSize.width * 2;
				img.height =
					type === 'normal'
						? normalBrickSize.height
						: normalBrickSize.height * 2;

				bricks[type][color][state] = img;
			});
		});
	});

	return bricks;
};

export default loadBricks;
