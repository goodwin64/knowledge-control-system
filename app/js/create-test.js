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
    // question wrapper, for aligning
    var questionWrapper = document.createElement("div");
        questionWrapper.className += " question-wrapper";

    // question wrapper, for margin-padding
    var questionContent = document.createElement("div");
        questionContent.className += " question-content";

    // question head (header + select)
    var questionHeadWrapper = document.createElement("div");
        questionHeadWrapper.className += " question-head-wrapper";

    // question header
    var questionHeader = document.createElement("h3");
        questionHeader.innerText = "Question №" + indexQuestion;
        questionHeadWrapper.appendChild(questionHeader);

    // question type list (select)
    var questionTypeSelect = generateQuestionTypeSelector(["one-option", "multi-option"]);
        questionHeadWrapper.appendChild(questionTypeSelect);

    questionContent.appendChild(questionHeadWrapper);

    // question title
    var questionTitleWrapper = generateQuestionTitle("Question title");
        questionContent.appendChild(questionTitleWrapper);

    // options wrapper
    var optionsWrapper = document.createElement("div");
        optionsWrapper.className += " options-wrapper";

    // options (inside base)
    const TEST_OPTIONS_COUNT = 3; // on the development
    for (var indexOption = 1; indexOption <= TEST_OPTIONS_COUNT; indexOption++) {
        var optionWrapper = generateOptionsDiv(indexQuestion, indexOption);
        optionsWrapper.appendChild(optionWrapper);
    }
    questionContent.appendChild(optionsWrapper);

    // "add new option" button
    var optionAddWrapper = document.createElement("div");
        optionAddWrapper.className += " option-add-wrapper";
    var optionAdd = document.createElement("button");
        optionAdd.innerText = "+";
        optionAdd.className += " option-add";
        optionAddWrapper.appendChild(optionAdd);
        questionContent.appendChild(optionAddWrapper);

    questionWrapper.appendChild(questionContent);
    return questionWrapper;
}


function generateOptionsDiv(indexQuestion, indexOption) {
    // option radio-button
    var optionSelect = document.createElement("input");
        optionSelect.setAttribute("type", "radio");
        optionSelect.name = "option-button-" + indexQuestion;
        optionSelect.id = optionSelect.name + "-" + indexOption;
        optionSelect.className += " option-select";

    // option text
    var optionContent = document.createElement("input");
        optionContent.setAttribute("type", "text");
        optionContent.setAttribute("placeholder", "e.g. option " + indexOption);
        optionContent.className += " option-content";

    // "delete option" button
    var optionDelete = document.createElement("button");
        optionDelete.innerText = "x";
        optionDelete.className += " option-delete";

    var optionWrapper = document.createElement("div");
        optionWrapper.className += " option-wrapper";
        optionWrapper.appendChild(optionSelect);
        optionWrapper.appendChild(optionContent);
        optionWrapper.appendChild(optionDelete);

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
                setOptionsTo(this, "checkbox"); // FIXME: change listener after last wrapping actions
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
    var testSubmit = document.getElementById("test-submit");
    testSubmit.addEventListener("click", function() {
        // "submit" test IMPL
    });

    var testCancel = document.getElementById("test-cancel");
    testCancel.addEventListener("click", function() {
        // "cancel" test IMPL
    });

    var testSaveDraft = document.getElementById("test-save-draft");
    testSaveDraft.addEventListener("click", function() {
        // "save as draft" test IMPL
    });
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


function generateQuestionTitle(placeholder) {
    var questionTitle = document.createElement("input");
        questionTitle.setAttribute("type", "text");
        questionTitle.setAttribute("placeholder", placeholder || "Question title");

    var questionTitleWrapper = document.createElement("div");
        questionTitleWrapper.className += " question-title-wrapper";
        questionTitleWrapper.appendChild(questionTitle);

    return questionTitleWrapper;
}
