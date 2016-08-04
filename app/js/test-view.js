"use strict";
(function() {
    var paginationAnchors = document.getElementsByClassName("test-pagination-elem");
    for (var i = 0; i < paginationAnchors.length; i++) {
        paginationAnchors[i].addEventListener("click", function() {
            var testContent = this.parentElement.nextSibling;
            var indexToShow = this.getAttribute("data-question-index");
            onPaginationAnchorClick(testContent.children, indexToShow); // pass "question wrapper" collection
        });
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
