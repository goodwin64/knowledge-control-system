"use strict";
(function() {
    function sendTest() {
        var testID = document.getElementById("submit-test").getAttribute("data-test-id");
        sendTestData("/test" + testID, false); // from another module
    }

    // submit test
    var submitTestButton = document.getElementById("submit-test");
    submitTestButton.onclick = function() {
        if (confirm("Are you sure?")) {
            clearInterval(timeIntervalID);
            sendTest();
        }
    };

    // start test
    var startButton = document.getElementById("start-test");
    var timeIntervalID;
    startButton.onclick = function() {
        this.hidden = true;
        submitTestButton.hidden = false;
        document.getElementsByClassName("test-pagination")[0].hidden = false;
        document.getElementsByClassName("test-pagination-elem")[0].click();
        // start test (it's possible to send additional data on server to check time)
        var testDurationMs = +document.getElementsByClassName("test-duration")[0].innerText * 1000;
        setTimeout(function () {
            sendTest();
        }, testDurationMs);
        var deadline = new Date(Date.parse(new Date()) + testDurationMs);
        var clockDiv = document.getElementById("clockdiv");
        clockDiv.hidden = false;
        timeIntervalID = initializeClock(clockDiv, deadline);
    };

    // on pagination items
    var paginationAnchors = document.getElementsByClassName("test-pagination-elem");
    for (var i = 0; i < paginationAnchors.length; i++) {
        paginationAnchors[i].onclick = function() {
            var testContent = document.getElementById("test-content");
            var indexToShow = this.getAttribute("data-question-index");
            onPaginationAnchorClick(testContent.children, indexToShow); // pass "question wrapper" collection
        };
    }

    // on options content (span)
    var allOptions = document.getElementsByClassName("option-content");
    for (i = 0; i < allOptions.length; i++) {
        allOptions[i].onclick = function() {
            var optionSelector = this.previousSibling;
            optionSelector.checked = !optionSelector.checked;
        };
    }

    // clear all
    var allButtonsClearAll = document.getElementsByClassName("clear-all-options");
    for (i = 0; i < allButtonsClearAll.length; i++) {
        allButtonsClearAll[i].onclick = function() {
            var optionsInCurDiv = this.parentElement.parentElement.getElementsByClassName("option-select");
            for (var j = 0; j < optionsInCurDiv.length; j++) {
                optionsInCurDiv[j].checked = false;
            }
        };
    }
})();

function onPaginationAnchorClick(questionsWrappers, indexToShow) {
    for (var i = 0; i < questionsWrappers.length; i++) {
        if (!questionsWrappers[i].hidden) {
            questionsWrappers[i].hidden = true; // if shown - hide it
            break;
        }
    }
    questionsWrappers[indexToShow].hidden = false;
}

/**
 * Returns an object contains how much time units are remained
 * [src](https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/)
 */
function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    return {
        'total': t,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function initializeClock(clockDiv, endTime) {
    var hoursSpan = clockDiv.querySelector('.hours');
    var minutesSpan = clockDiv.querySelector('.minutes');
    var secondsSpan = clockDiv.querySelector('.seconds');

    function updateClock() {
        var t = getTimeRemaining(endTime);

        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
    }

    updateClock();
    var timeInterval = setInterval(updateClock, 1000);
    return timeInterval;
}
