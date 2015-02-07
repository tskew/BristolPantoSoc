"use strict";

var parts = [];
var scenes = [];
var rehearsals = [];

function getRehearsalsForActor(actor) {
    var partsForActor = getPartsForActor(actor);
    var scenesForParts = getScenesForParts(partsForActor);
    var rehearsalsForScenes = getRehearsalsForScenes(scenesForParts);
    var rehearsalsWithSpecificParts = getRehearsalsWithSpecificParts(partsForActor);
    var fullCastRehearsals = getFullCastRehearsals();

    return [].concat(rehearsalsForScenes, rehearsalsWithSpecificParts, fullCastRehearsals);
}

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
            if (rehearsal.sceneNumbers != null) {
                if (rehearsal.sceneNumbers.indexOf(scene) > -1) {
                    rehearsalsToReturn.push(rehearsal);
                };
            };
        });
    });
    
    return rehearsalsToReturn;
}

function getRehearsalsWithSpecificParts(parts) {
    var rehearsalsToReturn = [];

    $.each(rehearsals, function (index, rehearsal) {
        if (rehearsal.specificParts != null) {
            $.each(rehearsal.specificParts, function (index, specificPart) {
                $.each(parts, function (index, part) {
                    if (specificPart == part) {
                        rehearsalsToReturn.push(rehearsal);
                    };
                });
            });
        };
    });
    
    return rehearsalsToReturn;
}

function getFullCastRehearsals() {
    var rehearsalsToReturn = []

    $.each(rehearsals, function(index, rehearsal) {
        if ((rehearsal.sceneNumbers == null) && (rehearsal.specificParts == null)) {
            rehearsalsToReturn.push(rehearsals);
        };
    })

    return rehearsalsToReturn;
}