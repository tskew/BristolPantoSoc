"use strict";

describe("creates a personalised schedule for each actor", function () {

	beforeEach(function() {
		parts = [];
		scenes = [];
		rehearsals = [];
	})

	it("should return all rehearsals applicable to a given actor", function() {
		parts = [{actor : "any actor", character : "any part"}];
		scenes = [{sceneNumber : 1, characters: ["any part"]},
				  {sceneNumber: 2, characters: ["any other part"], optionalCharacters: ["any part"]}];
		rehearsals = [{rehearsalName: "rehearsal for scene containing actor", sceneNumbers : [1]},
					  {rehearsalName: "rehearsal for scene not containing actor", sceneNumbers: [2]},
					  {rehearsalName: "rehearsal for actor's optional part", sceneNumbers: [2, 3]},
					  {rehearsalName: "rehearsal for actor's part", specificParts: ["any part"]},
					  {rehearsalName: "rehearsal for everyone"}];

		var result = getRehearsalsForActor("any actor");

		expect(result.length).toEqual(4);
	})

	describe("getting all parts for a given actor", function() {
		it("should return no parts when there are no parts", function() {
			parts = [];

			var result = getPartsForActor(null);

			expect(result).toEqual([]);
		});

		it("should return no parts when the actor does not have a part", function() {
			parts = [{actor : "any actor", character : "any part"}];

			var result = getPartsForActor("any other actor");

			expect(result).toEqual([]);
		});

		it("should return all parts for that actor", function() {
			parts = [{actor : "any actor", character : "any part"},
					 {actor : "any actor", character : "any other part"}];

			var result = getPartsForActor("any actor");

			expect(result).toEqual(["any part", "any other part"]);
		});
	});

	describe("getting all scenes for an array of parts", function() {
		it("should return no scenes when there are no scenes", function() {
			scenes = [];

			var result = getScenesForParts(null);

			expect(result).toEqual([]);
		});

		it("should return no scenes when the parts are not in any scenes", function() {
			scenes = [{sceneNumber : 1, characters : ["any part"]}];

			var result = getScenesForParts(["any other part"]);

			expect(result).toEqual([]);
		});

		it("should return all scenes for the given parts", function() {
			scenes = [{sceneNumber : 1, characters : ["any part"]},
					  {sceneNumber : 2, characters : ["any part"]},
					  {sceneNumber : 3, characters : ["any other part"]}];

			var result = getScenesForParts(["any part", "any other part"]);

			expect(result).toEqual([1, 2, 3]);
		});
	});

	describe("getting optional scenes for an array of parts", function() {
		it("should return no scenes when there are no scenes", function() {
			scenes = [];

			var result = getOptionalScenesForParts(null);

			expect(result).toEqual([]);
		});

		it("should return no scenes when there are no scenes with optional parts", function() {
			scenes = [{sceneNumber: 1, characters: ["any part"]}];

			var result = getOptionalScenesForParts(["any part"]);

			expect(result).toEqual([]);
		});

		it("should return all scenes for the given optional parts", function() {
			scenes = [{sceneNumber: 1, optionalCharacters: ["any part"]},
					  {sceneNumber: 2, optionalCharacters: ["any part"]},
					  {sceneNumber: 3, optionalCharacters: ["not one of the parts", "any part"]},
					  {sceneNumber: 4, optionalCharacters: ["any other part"]},
					  {sceneNumber: 5, optionalCharacters: ["not one of the parts"]}];

			var result = getOptionalScenesForParts(["any part", "any other part"]);

			expect(result).toEqual([1, 2, 3, 4]);
		})
	})

	describe("getting all rehearsals for an array of scenes", function() {
	    it("should return no rehearsals when there are no rehearsals", function () {
	        rehearsals = [];

	        var result = getRehearsalsForScenes(null);

	        expect(result).toEqual([]);
	    });

	    it("should return no rehearsals when there are no rehearsals for those scenes", function () {
	        rehearsals = [{ sceneNumbers: [1], rehearsalName: "test" }];

	        var result = getRehearsalsForScenes([2]);

	        expect(result).toEqual([]);
	    });

	    it("should return all rehearsals for a given set of scenes", function () {
	        rehearsals = [{ sceneNumbers: [1], rehearsalName: "first test" },
	                      { sceneNumbers: [1], rehearsalName: "second test" },
	                      { sceneNumbers: [2], rehearsalName: "third test" },
	                      { sceneNumbers: [3], rehearsalName: "not included" }];

	        var result = getRehearsalsForScenes([1, 2]);

	        expect(result.length).toEqual(3);
	    });

	    it("should return multi-scene rehearsals which include the given scenes", function() {
	    	rehearsals = [{ sceneNumbers: [1, 2, 3], rehearsalName: "multi-scene rehearsal" }];

	    	var result = getRehearsalsForScenes([1]);

	    	expect(result.length).toEqual(1);
	    })
	})

	describe("getting all rehearsals which include optional parts for an array of scenes", function() {
		it("should return no rehearsals when there are no rehearsals", function() {
			rehearsals = [];

			var result = getRehearsalsWhichIncludeOptionalParts(null);

			expect(result).toEqual([]);
		});

		it("should return no rehearsals when there are no rehearsals for the given scenes", function() {
			rehearsals = [{sceneNumbers: [1]}];

			var result = getRehearsalsWhichIncludeOptionalParts([2]);

			expect(result).toEqual([]);
		})

		it("should return all rehearsals for the given scenes which include optional parts", function() {
			rehearsals = [{sceneNumbers: [1, 2]},
						  {sceneNumbers: [2]},
						  {sceneNumbers: [2, 3]},
						  {sceneNumbers: [3, 4]}];

			var result = getRehearsalsWhichIncludeOptionalParts([2, 3]);

			expect(result.length).toEqual(3);
		})
	})

	describe("getting all rehearsals with specific parts", function () {
	    it("should return no rehearsals when there aren't any rehearsals", function () {
	        rehearsals = [];

	        var result = getRehearsalsWithSpecificParts(null);

	        expect(result).toEqual([]);
	    });

	    it("should not return rehearsals which do not have specific parts", function() {
	    	rehearsals = [{ rehearsalName: "rehearsal without specific parts", sceneNumber: 1}];

	    	var result = getRehearsalsWithSpecificParts("actor's part");

	    	expect(result).toEqual([]);
	    });

	    it("should return all rehearsals which specify the given parts", function () {
	        rehearsals = [{ rehearsalName: "rehearsal with specific part", specificParts: ["actor's part"] },
	                      { rehearsalName: "rehearsal with specific part", specificParts: ["actor's part"] },
	                      { rehearsalName: "rehearsal with specific part", specificParts: ["actor's other part"] },
	                      { rehearsalName: "rehearsal with multiple specific parts", specificParts: ["any part", "actor's part"] },
	                      { rehearsalName: "rehearsal without specific parts", sceneNumbers: [1]}];

	        var result = getRehearsalsWithSpecificParts(["actor's part", "actor's other part"]);

	        expect(result.length).toEqual(4);
	    });
	});

	describe("getting full cast rehearsals", function() {
		it("should return no rehearsals when there are no rehearsals", function() {
			rehearsals = [];

			var result = getFullCastRehearsals();

			expect(result).toEqual([]);
		});

		it("should return all rehearsals which apply to the full cast", function() {
			rehearsals = [{ rehearsalName: "full cast rehearsal" },
						  { rehearsalName: "scene rehearsal", sceneNumbers : [1]},
						  { rehearsalName: "specific character rehearsal", specificParts: ["any part"] }];

			var result = getFullCastRehearsals();

			expect(result).toEqual([{ rehearsalName: "full cast rehearsal" }]);
		});
	});
})