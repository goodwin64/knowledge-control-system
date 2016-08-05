"use strict";

(function() {
    var submitTestButton = document.getElementById("submit-test");
    submitTestButton.onclick = function() {
        if (confirm("Are you sure?")) {
            sendTestData();
        }
    };
    var startButton = document.getElementById("start-test");
    startButton.onclick = function() {
        this.hidden = true;
        submitTestButton.hidden = false;
        document.getElementsByClassName("test-pagination")[0].hidden = false;
        document.getElementsByClassName("test-pagination-elem")[0].click();
        var testDurationMs = +document.getElementById("test-duration").innerText * 1e3;
        setTimeout(function() {
            sendTestData();
        }, testDurationMs);
        var deadline = new Date(Date.parse(new Date()) + testDurationMs);
        var clockDiv = document.getElementById("clockdiv");
        clockDiv.hidden = false;
        initializeClock(clockDiv, deadline);
    };
    var paginationAnchors = document.getElementsByClassName("test-pagination-elem");
    for (var i = 0; i < paginationAnchors.length; i++) {
        paginationAnchors[i].onclick = function() {
            var testContent = document.getElementById("test-content");
            var indexToShow = this.getAttribute("data-question-index");
            onPaginationAnchorClick(testContent.children, indexToShow);
        };
    }
    var allOptions = document.getElementsByClassName("option-content");
    for (i = 0; i < allOptions.length; i++) {
        allOptions[i].onclick = function() {
            var optionSelector = this.previousSibling;
            optionSelector.checked = !optionSelector.checked;
        };
    }
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
            questionsWrappers[i].hidden = true;
            break;
        }
    }
    questionsWrappers[indexToShow].hidden = false;
}

function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor(t / 1e3 % 60);
    var minutes = Math.floor(t / 1e3 / 60 % 60);
    var hours = Math.floor(t / (1e3 * 60 * 60) % 24);
    return {
        total: t,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };
}

function initializeClock(clockDiv, endTime) {
    var hoursSpan = clockDiv.querySelector(".hours");
    var minutesSpan = clockDiv.querySelector(".minutes");
    var secondsSpan = clockDiv.querySelector(".seconds");
    function updateClock() {
        var t = getTimeRemaining(endTime);
        hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
        minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
        secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
    }
    updateClock();
    var timeInterval = setInterval(updateClock, 1e3);
}

function sendTestData() {
    console.log("Sending data");
}