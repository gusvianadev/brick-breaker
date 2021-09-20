const loadSprites = (object) => {
	const sprites = {};

	object.states.all.forEach((state) => {
		const name = state.name;
		const images = state.images;
		const size = images.size;
		console.log(images);

		sprites[name] = [];

		Object.values(images.src).forEach((src) => {
			const newImg = new Image();
			newImg.src = src;
			newImg.width = newImg.width * size;
			newImg.height = newImg.height * size;
			sprites[name].push(newImg);
		});
	});

	return sprites;
};

export default loadSprites;
