const checkSpriteIteration = (object, timestamp) => {
	const imagesLength = object.sprites[object.states.current].length;
	const passToNextImage =
		timestamp - object.animation.start >=
		object.animation.duration / imagesLength;

	// set the duration of the sprites's animation
	if (passToNextImage) {
		object.animation.start = timestamp;

		if (object.animation.currentSpriteIteration < imagesLength - 1) {
			object.animation.currentSpriteIteration++;
		} else {
			object.animation.currentSpriteIteration = 0;
		}
	}
};

export default checkSpriteIteration;
