function onload() {
    var submitQuestionsNumber = document.getElementById("submit-questions-number");
    var inputQuestionsNumber = document.getElementById("questions-number");

    var changeQuestionsNumberButtons = document.getElementsByClassName("change-questions-number");
    for (var i = 0; i < changeQuestionsNumberButtons.length; i++) {
        changeQuestionsNumberButtons[i].onclick = function() {
            var newValue = +inputQuestionsNumber.value + +this.value;
            if (newValue >= +inputQuestionsNumber.getAttribute("min")
            && newValue <= +inputQuestionsNumber.getAttribute("max")) {
                inputQuestionsNumber.value = newValue;
            } else {
                alert("Questions count is a positive number l.t. 51!");
            }
        };
    }

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
    submitQuestionsNumber.click(); // TODO: remove on release
}


function onSubmitQuestionsNumber() {
    var testBodyForm = document.getElementById("test-creation-body");
    var inputQuestionsNumber = document.getElementById("questions-number");
    var oldQuestionNumber = testBodyForm.childElementCount;
    var newQuestionsNumber = +inputQuestionsNumber.value;

    if (newQuestionsNumber < +inputQuestionsNumber.min
        || newQuestionsNumber > +inputQuestionsNumber.max) {
        // this case means that user input value from keyboard, not by using increment buttons (HTML5 "bug")
        return;
    }

    // add / delete questions
    if (newQuestionsNumber > oldQuestionNumber) {
        for (var i = oldQuestionNumber + 1; i <= newQuestionsNumber; i++) {
            testBodyForm.appendChild(generateQuestionsDiv(i));
        }
    } else {
        for (i = 0; i < oldQuestionNumber - newQuestionsNumber; i++) {
            testBodyForm.removeChild(testBodyForm.lastElementChild);
        }
    }

    // show buttons
    var toShow = document.getElementById("test-creation-after");
    toShow.removeAttribute("hidden");
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
    const MAX_OPTIONS_COUNT = 10;
    for (var indexOption = 1; indexOption <= TEST_OPTIONS_COUNT; indexOption++) {
        var optionWrapper = generateOptionDiv(indexQuestion, indexOption);
        optionsWrapper.appendChild(optionWrapper);
    }
    questionContent.appendChild(optionsWrapper);

    // "add new option" button
    var optionAddWrapper = document.createElement("div");
        optionAddWrapper.className += " option-add-wrapper";
    var optionAdd = document.createElement("input");
        optionAdd.setAttribute("type", "button");
        optionAdd.value = "+";
        optionAdd.className += " option-add";
        optionAddWrapper.appendChild(optionAdd);
        questionContent.appendChild(optionAddWrapper);
        optionAdd.addEventListener('click', function() {
            if (optionsWrapper.childElementCount < MAX_OPTIONS_COUNT) {
                // find out current question index via pure JS (.index in jQuery)
                var nodeList = Array.prototype.slice.call(questionWrapper.parentNode.children);
                var indexQuestion = nodeList.indexOf(questionWrapper) + 1;
                var indexOption = optionAdd.parentNode.previousElementSibling.children.length + 1; // starts from 1, not 0
                optionsWrapper.appendChild(
                    generateOptionDiv(indexQuestion, indexOption, getInputTypeFromSelect(questionTypeSelect.value))
                );
            } else {
                alert("Too many options, max " + MAX_OPTIONS_COUNT);
            }
        });

    questionWrapper.appendChild(questionContent);
    return questionWrapper;
}


function generateOptionDiv(indexQuestion, indexOption, optionSelectType) {
    optionSelectType = optionSelectType || "radio";
    var optionWrapper = document.createElement("div");
        optionWrapper.className += " option-wrapper";

    // option radio-button
    var optionSelect = document.createElement("input");
        optionSelect.setAttribute("type", optionSelectType);
        optionSelect.name = "option-button-" + indexQuestion;
        optionSelect.className += " option-select";

    // option text
    var optionContent = document.createElement("input");
        optionContent.setAttribute("type", "text");
        optionContent.setAttribute("name", "option-" + indexQuestion + "-" + indexOption);
        optionContent.setAttribute("placeholder", "e.g. option " + indexOption);
        optionContent.className += " option-content";

    // "delete option" button
    var optionDelete = document.createElement("input");
        optionDelete.setAttribute("type", "button");
        optionDelete.value = "x";
        optionDelete.className += " option-delete";
        optionDelete.addEventListener('click', function() {
            var optionsWrapper = optionWrapper.parentNode;
            if (optionsWrapper.children.length > 1) {
                optionsWrapper.removeChild(optionWrapper);
                rewriteChildrenPlaceholders(optionsWrapper, "e.g. option ");
            } else {
                alert("At least 1 option");
            }
        });

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
        setOptionsTo(this, getInputTypeFromSelect(this.value));
    };
    return questionTypeSelect;
}


/**
 * Sets some option to all "input" siblings (or to siblings' children).
 * @param selectNode            "select" node, which has siblings to change
 * @param childrenOptionsType   new type of "input" siblings (e.g. one-/multi-option/text/matches)
 */
function setOptionsTo(selectNode, childrenOptionsType) {
    var siblingOptions = selectNode.parentNode.parentNode.querySelector(".options-wrapper").children;
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
        sendTestData("/tests", true); // from another module
        return false;
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


function generateQuestionTitle(placeholder) {
    var questionTitle = document.createElement("input");
        questionTitle.setAttribute("type", "text");
        questionTitle.setAttribute("placeholder", placeholder || "Question title");

    var questionTitleWrapper = document.createElement("div");
        questionTitleWrapper.className += " question-title-wrapper";
        questionTitleWrapper.appendChild(questionTitle);

    return questionTitleWrapper;
}


function rewriteChildrenPlaceholders(node, placeholderPrefix) {
    placeholderPrefix = placeholderPrefix || "e.g. option ";
    for (var i = 1; i <= node.children.length; i++) {
        var optionInput = node.children[i-1].querySelector("input[type='text']");
        optionInput.setAttribute("placeholder", placeholderPrefix + i);
    }
}


function getInputTypeFromSelect(inputValue) {
    switch (inputValue) {
        case "one-option":
            return "radio";
        case "multi-option":
            return "checkbox";
        default:
            return null;
    }
}


function getQuestionTypeForJSON(stringType) {
    switch (stringType) {
        case "one-option":
            return 1;
        case "multi-option":
            return 2;
        default:
            return null;
    }
}
