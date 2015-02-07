"use strict";

describe("formats the rehearsal schedule into a timetable layout", function () {

    describe("getting the dates for the rehearsals", function () {
        it("should return no dates when there are no rehearsals", function () {
            var rehearsals = [];

            var result = getDatesFromRehearsals(rehearsals);

            expect(result).toEqual([]);
        });

        it("should return all dates for the given rehearsals", function () {
            var rehearsals = [{ date: { day: 1, month: 2 } },
                              { date: { day: 3, month: 4 } }];

            var result = getDatesFromRehearsals(rehearsals);

            expect(result).toEqual([{ day: 1, month: 2 }, { day: 3, month: 4 }]);
        });

        it("should not return duplicate dates", function () {
            var rehearsals = [{ date: { day: 1, month: 2 } },
                              { date: { day: 1, month: 2 } }];

            var result = getDatesFromRehearsals(rehearsals);

            expect(result).toEqual([{ day: 1, month: 2 }]);
        })
    });

    describe("sorting dates into chronological order", function () {
        it("should return an empty array when given an empty array", function () {
            var dates = [];

            var result = sortDates(dates);

            expect(result).toEqual([]);
        });

        it("should return the input dates when there is only one date given", function () {
            var dates = [{ day: 1, month: 2 }];

            var result = sortDates(dates);

            expect(result).toEqual([{ day: 1, month: 2 }]);
        });

        it("should return closest day first when given dates in the same month", function() {
            var dates = [{ day: 2, month: 1},
                         { day: 3, month: 1},
                         { day: 1, month: 1}];

            var result = sortDates(dates);

            expect(result).toEqual([{ day: 1, month: 1 }, { day: 2, month: 1 }, { day: 3, month: 1 }]);
        });

        it("should return the closest month first when given dates with the same day", function() {
            var dates = [{ day: 1, month: 2},
                         { day: 1, month: 1},
                         { day: 1, month: 3}];

            var result = sortDates(dates);

            expect(result).toEqual([{ day: 1, month: 1 }, { day: 1, month: 2 }, { day: 1, month: 3 }]);
        });

        it("should sort by month and then day", function() {
            var dates = [{ day: 2, month: 1},
                         { day: 1, month: 2}];

            var result = sortDates(dates);

            expect(result).toEqual([{ day: 2, month: 1 }, { day: 1, month: 2 }]);
        });
    });

    describe("getting the rehearsal title", function() {
        it("should always use the rehearsal name when present", function() {
            var rehearsal = {rehearsalName: "any name", sceneNumbers: [1]};

            var result = getRehearsalTitle(rehearsal);

            expect(result).toEqual("any name");
        });

        it("should return the scene number when there is a specific scene", function() {
            var rehearsal = {sceneNumbers: [1]};

            var result = getRehearsalTitle(rehearsal);

            expect(result).toEqual("Scene 1");
        });

        it("should return all scene numbers when there are multiple specific scenes", function() {
            var rehearsal = {sceneNumbers: [1, 2, 3]};

            var result = getRehearsalTitle(rehearsal);

            expect(result).toEqual("Scenes 1, 2, 3");
        });

        it("should return character names when there is a specific part", function() {
            var rehearsal = {specificParts: ["any part"]};

            var result = getRehearsalTitle(rehearsal);

            expect(result).toEqual("any part");
        });

        it("should return all character names when there are specific parts", function() {
            var rehearsal = {specificParts: ["any part", "any other part"]};

            var result = getRehearsalTitle(rehearsal);

            expect(result).toEqual("any part/any other part"); 
        })
    });

    describe("getting rehearsal time as a pixel offset", function() {
        it("should return no offset when the rehearsal is at the start of the schedule time", function() {
            StartTime = 1;
            var time = {hour: 1, minute: 0};

            var result = getTimeAsPixelOffset(time);

            expect(result).toEqual("0px");
        });

        it("should return the number of hours past the start of the schedule multiplied by the length of an hour", function() {
            StartTime = 1;
            PixelsPerHour = 2;
            var time = {hour: 3, minute: 0};

            var result = getTimeAsPixelOffset(time);

            expect(result).toEqual("4px");
        });

        it("should include the minutes as a fraction of the pixels per hour", function() {
            StartTime = 1;
            PixelsPerHour = 2;
            var time = {hour: 3, minute: 30};

            var result = getTimeAsPixelOffset(time);

            expect(result).toEqual("5px");
        })
    });

    describe("getting duration as a pixel length", function() {
        it("should return the duration multipied by the length of an hour and account for the 1px left border", function() {
            PixelsPerHour = 1;
            var duration = 2;

            var result = getDurationAsPixelLength(duration);

            expect(result).toEqual("1px");
        })
    });

    describe("getting the rehearsal time", function() {
        it("should pad minutes to double digits", function() {
            var minute = 9;

            var result = formatTime(minute);

            expect(result).toEqual("09");
        });

        it("should not pad minutes which are already double digits", function() {
            var minute = 10;

            var result = formatTime(minute);

            expect(result).toEqual("10");
        })
    })

    describe("getting a colour for the rehearsal", function() {
        it("should return the default colour when a rehearsal type is not specified", function() {
            ActingRehearsalColour = "green";
            var rehearsal = {rehearsalName: "any rehearsal"};

            var result = getColourForRehearsal(rehearsal);

            expect(result).toEqual("green");
        });

        it("should return the acting colour when the rehearsal type is 'A'", function() {
            ActingRehearsalColour = "green";
            var rehearsal = {rehearsalName: "acting rehearsal", rehearsalType: "A"};

            var result = getColourForRehearsal(rehearsal);

            expect(result).toEqual("green");
        });

        it("should return the singing colour when the rehearsal type is 'S'", function() {
            SingingRehearsalColour = "yellow";
            var rehearsal = {rehearsalName: "singing rehearsal", rehearsalType: 'S'};

            var result = getColourForRehearsal(rehearsal);

            expect(result).toEqual("yellow");
        });

        it("should return the dancing colour when the rehearsal type is 'D'", function() {
            DancingRehearsalColour = "red";
            var rehearsal = {rehearsalName: "dancing rehearsal", rehearsalType: 'D'};

            var result = getColourForRehearsal(rehearsal);

            expect(result).toEqual("red");
        })
    })
})