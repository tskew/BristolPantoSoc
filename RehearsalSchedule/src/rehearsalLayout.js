"use strict";

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
    return dates;
}