"use strict";

(function() {
    var paginationAnchors = document.getElementsByClassName("test-pagination-elem");
    for (var i = 0; i < paginationAnchors.length; i++) {
        paginationAnchors[i].addEventListener("click", function() {
            var testContent = this.parentElement.nextSibling;
            var indexToShow = this.getAttribute("data-question-index");
            onPaginationAnchorClick(testContent.children, indexToShow);
        });
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