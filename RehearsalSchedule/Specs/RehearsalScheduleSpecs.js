describe("creates a personalised schedule for each actor", function() {

	beforeEach(function() {
		parts = [];
		scenes = [];
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

	describe("getting all rehearsals for an array of scenes", function() {
		it("should return no rehearsals when there are no rehearsals", function() {
			rehearsals = [];

			var result = getRehearsalsForScenes(null);

			expect(result).toEqual([]);
		})
	})

})