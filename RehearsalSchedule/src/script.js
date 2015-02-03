function getPartsForActor(actor) {
	var partsForActor = [];

	$.each(parts, function(index, part) {
		if (part.actor == actor) {
			partsForActor.push(part.character);
		}
	});
		
	return partsForActor;
}

function getScenesForParts(parts) {
	var scenesToReturn = [];

	$.each(scenes, function(index, scene) {
		$.each(scene.characters, function(index, character) {
			$.each(parts, function(index, part) {
				if (character == part) {
					scenesToReturn.push(scene.sceneNumber);
				};
			})
		})
	});

	return scenesToReturn;
}

function getRehearsalsForScenes(scenes) {
	return [];
}