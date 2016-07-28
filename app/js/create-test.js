function onload() {
    var submitQuestionsNumber = document.getElementById("submit-questions-number");
    var inputQuestionsNumber = document.getElementById("questions-number");

    // on changing number of questions
    submitQuestionsNumber.addEventListener("click", onSubmitQuestionsNumber);
    inputQuestionsNumber.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode == 13) {
            document.getElementById("submit-questions-number").click();
        }
    });

    // test "footer" - action buttons after all questions
    fillTestFooter();
}


function generateQuestionsDiv(indexQuestion) {
    // question base (wrapper div)
    var questionDiv = document.createElement("div");
        questionDiv.className += " question-wrapper";

    // question header
    var questionHeader = document.createElement("h3");
        questionHeader.innerText = "Question №" + indexQuestion;
        questionDiv.appendChild(questionHeader);

    // question type select (list)
    var questionTypeSelect = generateQuestionTypeSelector(["one-option", "multi-option"]);
        questionDiv.appendChild(questionTypeSelect);

    // options (inside base)
    const TEST_OPTIONS_COUNT = 3; // on the development
    for (var indexOption = 1; indexOption <= TEST_OPTIONS_COUNT; indexOption++) {
        var optionWrapper = generateOptionsDiv(indexQuestion, indexOption);
        questionDiv.appendChild(optionWrapper);
    }

    return questionDiv;
}


function generateOptionsDiv(indexQuestion, indexOption) {
    // option radio-button
    var optionButton = document.createElement("input");
        optionButton.setAttribute("type", "radio");
        optionButton.name = "option-button-" + indexQuestion;
        optionButton.id = optionButton.name + "-" + indexOption;

    // option text
    var optionContent = document.createElement("input");
        optionContent.setAttribute("type", "text");
        optionContent.setAttribute("placeholder", "e.g. option " + indexOption);

    var optionWrapper = document.createElement("div");
        optionWrapper.className += " option-wrapper";
        optionWrapper.appendChild(optionButton);
        optionWrapper.appendChild(optionContent);

    return optionWrapper;
}


/**
 * Returns a HTML element which contains the list of question types.
 * There are the following types of questions:
 *      1. one-option
 *      2. multi-option
 *      TODO: add [text input], [matches]
 */
function generateQuestionTypeSelector(questionTypes) {
    var questionTypeSelect = document.createElement("select");
    for (var i = 0; i < questionTypes.length; i++) {
        var type = document.createElement("option");
        type.innerText = questionTypes[i];
        questionTypeSelect.appendChild(type);
    }
    questionTypeSelect.onchange = function () {
        switch (this.value) {
            case "one-option":
                setOptionsTo(this, "radio");
                break;
            case "multi-option":
                setOptionsTo(this, "checkbox");
                break;
        }
    };
    return questionTypeSelect;
}


/**
 * Sets some option to all "input" siblings (or to siblings' children).
 * @param selectNode            "select" node, which has siblings to change
 * @param childrenOptionsType   new type of "input" siblings (e.g. one-/multi-option/text/matches)
 */
function setOptionsTo(selectNode, childrenOptionsType) {
    var siblingOptions = selectNode.parentNode.childNodes;
    if (siblingOptions && siblingOptions[0].getAttribute("type") != childrenOptionsType) {
        for (var i = 0; i < siblingOptions.length; i++) {
            if (siblingOptions[i].className.indexOf("option-wrapper") != -1) {
                siblingOptions[i].querySelector("input").setAttribute("type", childrenOptionsType);
            }
        }
    }
}


/**
 * Performs the set of DOM-operations in test footer:
 * buttons
 * TODO: add sharing test in social media
 */
function fillTestFooter() {
    var allButtons = document.getElementById("all-buttons-wrapper");

    var testSubmit = document.createElement("button");
        testSubmit.innerText = "Submit";
        testSubmit.className += " action-button";
        testSubmit.id = "test-submit";
        testSubmit.addEventListener("click", function() {
            // "submit" test IMPL
        });

    var testCancel = document.createElement("button");
        testCancel.innerText = "Cancel";
        testCancel.className += " action-button";
        testCancel.id = "test-cancel";
        testSubmit.addEventListener("click", function() {
            // "cancel" test IMPL
        });

    var testSaveDraft = document.createElement("button");
        testSaveDraft.innerText = "Save as draft";
        testSaveDraft.className += " action-button";
        testSaveDraft.id = "test-save-draft";
        testSubmit.addEventListener("click", function() {
            // "save as draft" test IMPL
        });

    allButtons.appendChild(testSubmit);
    allButtons.appendChild(testCancel);
    allButtons.appendChild(testSaveDraft);
}


function onSubmitQuestionsNumber() {
    var testBody = document.getElementById("test-creation-body");
    var inputQuestionsNumber = document.getElementById("questions-number");
    var oldQuestionNumber = testBody.childElementCount;
    var newQuestionsNumber = +inputQuestionsNumber.value;

    if (newQuestionsNumber < +inputQuestionsNumber.min
        || newQuestionsNumber > +inputQuestionsNumber.max) {
        // this case means that user input value from keyboard, not by using increment buttons (HTML5 "bug")
        return;
    }

    // add / delete questions
    if (newQuestionsNumber > oldQuestionNumber) {
        for (var i = oldQuestionNumber + 1; i <= newQuestionsNumber; i++) {
            testBody.appendChild(generateQuestionsDiv(i));
        }
    } else {
        for (i = 0; i < oldQuestionNumber - newQuestionsNumber; i++) {
            testBody.removeChild(testBody.lastElementChild);
        }
    }

    // show buttons
    var toShow = document.getElementById("test-creation-after");
        toShow.removeAttribute("hidden");
}
