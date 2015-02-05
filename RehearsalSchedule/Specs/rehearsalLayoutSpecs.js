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
        })
    })
})