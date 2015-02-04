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
	    it("should return no rehearsals when there are no rehearsals", function () {
	        rehearsals = [];

	        var result = getRehearsalsForScenes(null);

	        expect(result).toEqual([]);
	    });

	    it("should return no rehearsals when there are no rehearsals for those scenes", function () {
	        rehearsals = [{ sceneNumber: 1, rehearsalName: "test" }];

	        var result = getRehearsalsForScenes([2]);

	        expect(result).toEqual([]);
	    });

	    it("should return all rehearsals for a given set of scenes", function () {
	        rehearsals = [{ sceneNumber: 1, rehearsalName: "first test" },
	                      { sceneNumber: 1, rehearsalName: "second test" },
	                      { sceneNumber: 2, rehearsalName: "third test" },
	                      { sceneNumber: 3, rehearsalName: "not included" }];

	        var result = getRehearsalsForScenes([1, 2]);

	        expect(result.length).toEqual(3);
	        expect(result[0].rehearsalName).toEqual("first test");
	    });
	})

	describe("getting all rehearsals with specific parts", function () {
	    it("should return no rehearsals when there aren't any rehearsals", function () {
	        rehearsals = [];

	        var result = getRehearsalsWithSpecificParts(null);

	        expect(result).toEqual([]);
	    });

	    it("should return all rehearsals which specify the given parts", function () {
	        rehearsals = [{ rehearsalName: "rehearsal with specific part", specificParts: ["actor's part"] },
	                      { rehearsalName: "rehearsal with specific part", specificParts: ["actor's part"] },
	                      { rehearsalName: "rehearsal with specific part", specificParts: ["actor's other part"] },
	                      { rehearsalName: "rehearsal with multiple specific parts", specificParts: ["any part", "actor's part"] },
	                      { rehearsalName: "rehearsal without specific parts", sceneNumber: 1}]

	        var result = getRehearsalsWithSpecificParts(["actor's part", "actor's other part"]);

	        expect(result.length).toEqual(4);
	    })
	})

})