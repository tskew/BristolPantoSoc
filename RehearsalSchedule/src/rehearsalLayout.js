"use strict";

var StartTime = 12;
var PixelsPerHour = 90;

var ActingRehearsalColour = "#BE81F7";
var SingingRehearsalColour = "#FA5882";
var DancingRehearsalColour = "#81F7F3";

function getDatesFromRehearsals(rehearsals) {
    var dates = [];

    $.each(rehearsals, function (index, rehearsal) {
        if (datesNotAlreadyGrouped(rehearsal, dates)) {
            dates.push({ day: rehearsal.date.day, month: rehearsal.date.month });
        };
    });

    return dates;
}

function datesNotAlreadyGrouped(rehearsal, dates) {
    var notGrouped = true;

    $.each(dates, function (index, date) {
        if (date.day === rehearsal.date.day && date.month === rehearsal.date.month) {
            notGrouped = false;
        }
    })

    return notGrouped;
}

function sortDates(dates) {
    return dates.sort(function(a, b) {
        if (a.month > b.month) {
            return 1;
        } else if (a.month === b.month) {
            if (a.day > b.day) {
                return 1;
            } else {
                return -1
            };
        } else {
            return -1;
        };
    });
}

function getRehearsalTitle(rehearsal) {
    if (rehearsal.rehearsalName != null) {
        return rehearsal.rehearsalName;
    } else {
        if (rehearsal.sceneNumbers != null) {
            if (rehearsal.sceneNumbers.length === 1) {
                return "Scene " + rehearsal.sceneNumbers[0];
            } else {
                return "Scenes " + rehearsal.sceneNumbers.join(", ");
            }
        };

        if (rehearsal.specificParts != null) {
            return rehearsal.specificParts.join("/");
        }
    }
}

function getTimeAsPixelOffset(time) {
    var unitTimePastStart = time.hour - StartTime;
    unitTimePastStart += (time.minute / 60);
    return (unitTimePastStart * PixelsPerHour) + "px";
}

function getDurationAsPixelLength(duration) {
    return ((duration * PixelsPerHour) - 1) + "px";
}

function formatTime(minute) {
    return minute > 9 ? "" + minute: "0" + minute;
}

function getColourForRehearsal(rehearsal) {
    if (rehearsal.rehearsalType != null) {
        if (rehearsal.rehearsalType === 'A') {
            return ActingRehearsalColour;
        } else if (rehearsal.rehearsalType === 'S') {
            return SingingRehearsalColour;
        } else if (rehearsal.rehearsalType === 'D') {
            return DancingRehearsalColour;
        }
    }
    return ActingRehearsalColour;
}