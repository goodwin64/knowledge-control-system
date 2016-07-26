function onload() {
    var testBody = document.getElementById("test-creation-body");
    var inputQuestionsNumber = document.getElementById("questions-number");
    var submitQuestionsNumber = document.getElementById("submit-questions-number");
    submitQuestionsNumber.addEventListener("click", function () {
        var oldQuestionNumber = testBody.childElementCount;
        var newQuestionsNumber = +inputQuestionsNumber.value;
        if (newQuestionsNumber > oldQuestionNumber) {
            for (let i = oldQuestionNumber + 1; i <= newQuestionsNumber; i++) {
                testBody.appendChild(generateQuestionDiv(i));
            }
        } else {
            for (let i = 0; i < oldQuestionNumber - newQuestionsNumber; i++) {
                testBody.removeChild(testBody.lastElementChild);
            }
        }
    }, false)
}


function generateQuestionDiv(indexQuestion) {
    // question header
    var questionHeader = document.createElement("h3");
    questionHeader.innerText = "Question №" + indexQuestion;

    // question type select (list)
    var questionTypeSelect = generateQuestionTypeSelector(["one-option", "multi-option"]);

    // question base (wrapper div)
    var questionDiv = document.createElement("div");
        questionDiv.className += " question-wrapper";
        questionDiv.appendChild(questionHeader);
        questionDiv.appendChild(questionTypeSelect);

    for (let indexOption = 1; indexOption <= 3; indexOption++) {
        var optionWrapper = generateOptionDiv(indexQuestion, indexOption);
        questionDiv.appendChild(optionWrapper);
    }

    return questionDiv;
}


function generateOptionDiv(indexQuestion, indexOption) {
    // option radio-button
    var optionButton = document.createElement("input");
        optionButton.setAttribute("type", "radio");
        optionButton.name = "option-button-" + indexQuestion;
        optionButton.id = optionButton.name + "-" + indexOption;
        // option text
    var optionContent = document.createElement("input");/*"label");
         optionContent.setAttribute("for", optionButton.getAttribute("id"));
         optionContent.innerText = "option " + indexOption;
         optionContent.contentEditable = true;*/
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
    for (let i = 0; i < questionTypes.length; i++) {
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
        for (let i = 0; i < siblingOptions.length; i++) {
            if (siblingOptions[i].className.indexOf("option-wrapper") != -1) {
                siblingOptions[i].querySelector("input").setAttribute("type", childrenOptionsType);
            }
        }
    }
}
