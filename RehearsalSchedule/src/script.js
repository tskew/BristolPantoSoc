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
    var rehearsalsToReturn = [];

    $.each(rehearsals, function (index, rehearsal) {
        $.each(scenes, function (index, scene) {
            if (rehearsal.sceneNumber == scene) {
                rehearsalsToReturn.push(rehearsal);
            };
        });
    });
    
    return rehearsalsToReturn;
}

function getRehearsalsWithSpecificParts(parts) {
    if (rehearsals.length > 0) {
        return [rehearsals[0]];
    }
    return [];
}