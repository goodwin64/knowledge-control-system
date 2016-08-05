function onload() {
    var submitQuestionsNumber = document.getElementById("submit-questions-number");
    var inputQuestionsNumber = document.getElementById("questions-number");
    submitQuestionsNumber.addEventListener("click", onSubmitQuestionsNumber);
    inputQuestionsNumber.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode == 13) {
            document.getElementById("submit-questions-number").click();
        }
    });
    fillTestFooter();
    submitQuestionsNumber.click();
}

function onSubmitQuestionsNumber() {
    var testBodyForm = document.getElementById("test-creation-body");
    var inputQuestionsNumber = document.getElementById("questions-number");
    var oldQuestionNumber = testBodyForm.childElementCount;
    var newQuestionsNumber = +inputQuestionsNumber.value;
    if (newQuestionsNumber < +inputQuestionsNumber.min || newQuestionsNumber > +inputQuestionsNumber.max) {
        return;
    }
    if (newQuestionsNumber > oldQuestionNumber) {
        for (var i = oldQuestionNumber + 1; i <= newQuestionsNumber; i++) {
            testBodyForm.appendChild(generateQuestionsDiv(i));
        }
    } else {
        for (i = 0; i < oldQuestionNumber - newQuestionsNumber; i++) {
            testBodyForm.removeChild(testBodyForm.lastElementChild);
        }
    }
    var toShow = document.getElementById("test-creation-after");
    toShow.removeAttribute("hidden");
}

function generateQuestionsDiv(indexQuestion) {
    var questionWrapper = document.createElement("div");
    questionWrapper.className += " question-wrapper";
    var questionContent = document.createElement("div");
    questionContent.className += " question-content";
    var questionHeadWrapper = document.createElement("div");
    questionHeadWrapper.className += " question-head-wrapper";
    var questionHeader = document.createElement("h3");
    questionHeader.innerText = "Question №" + indexQuestion;
    questionHeadWrapper.appendChild(questionHeader);
    var questionTypeSelect = generateQuestionTypeSelector([ "one-option", "multi-option" ]);
    questionHeadWrapper.appendChild(questionTypeSelect);
    questionContent.appendChild(questionHeadWrapper);
    var questionTitleWrapper = generateQuestionTitle("Question title");
    questionContent.appendChild(questionTitleWrapper);
    var optionsWrapper = document.createElement("div");
    optionsWrapper.className += " options-wrapper";
    const TEST_OPTIONS_COUNT = 3;
    const MAX_OPTIONS_COUNT = 10;
    for (var indexOption = 1; indexOption <= TEST_OPTIONS_COUNT; indexOption++) {
        var optionWrapper = generateOptionDiv(indexQuestion, indexOption);
        optionsWrapper.appendChild(optionWrapper);
    }
    questionContent.appendChild(optionsWrapper);
    var optionAddWrapper = document.createElement("div");
    optionAddWrapper.className += " option-add-wrapper";
    var optionAdd = document.createElement("input");
    optionAdd.setAttribute("type", "button");
    optionAdd.value = "+";
    optionAdd.className += " option-add";
    optionAddWrapper.appendChild(optionAdd);
    questionContent.appendChild(optionAddWrapper);
    optionAdd.addEventListener("click", function() {
        if (optionsWrapper.childElementCount < MAX_OPTIONS_COUNT) {
            var nodeList = Array.prototype.slice.call(questionWrapper.parentNode.children);
            var indexQuestion = nodeList.indexOf(questionWrapper) + 1;
            var indexOption = optionAdd.parentNode.previousElementSibling.children.length + 1;
            optionsWrapper.appendChild(generateOptionDiv(indexQuestion, indexOption, getInputTypeFromSelect(questionTypeSelect.value)));
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
    var optionSelect = document.createElement("input");
    optionSelect.setAttribute("type", optionSelectType);
    optionSelect.name = "option-button-" + indexQuestion;
    optionSelect.className += " option-select";
    var optionContent = document.createElement("input");
    optionContent.setAttribute("type", "text");
    optionContent.setAttribute("name", "option-" + indexQuestion + "-" + indexOption);
    optionContent.setAttribute("placeholder", "e.g. option " + indexOption);
    optionContent.className += " option-content";
    var optionDelete = document.createElement("input");
    optionDelete.setAttribute("type", "button");
    optionDelete.value = "x";
    optionDelete.className += " option-delete";
    optionDelete.addEventListener("click", function() {
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

function generateQuestionTypeSelector(questionTypes) {
    var questionTypeSelect = document.createElement("select");
    for (var i = 0; i < questionTypes.length; i++) {
        var type = document.createElement("option");
        type.innerText = questionTypes[i];
        questionTypeSelect.appendChild(type);
    }
    questionTypeSelect.onchange = function() {
        setOptionsTo(this, getInputTypeFromSelect(this.value));
    };
    return questionTypeSelect;
}

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

function fillTestFooter() {
    var testSubmit = document.getElementById("test-submit");
    testSubmit.addEventListener("click", function() {
        sendTestData();
        return false;
    });
    var testCancel = document.getElementById("test-cancel");
    testCancel.addEventListener("click", function() {});
    var testSaveDraft = document.getElementById("test-save-draft");
    testSaveDraft.addEventListener("click", function() {});
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
        var optionInput = node.children[i - 1].querySelector("input[type='text']");
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

function fillWithRandomText() {
    var textInputs = document.querySelectorAll("#test-creation-body input[type=text]");
    for (var i = 0; i < textInputs.length; i++) {
        textInputs[i].value = Math.random();
    }
    var optionSelectors = document.getElementsByClassName("options-wrapper");
    for (i = 0; i < optionSelectors.length; i++) {
        optionSelectors[i].children[i].querySelector("input[type='radio']").checked = true;
    }
}

function sendTestData() {
    var resultJSON = {};
    resultJSON.title = document.getElementById("test-title").value;
    resultJSON.subject = document.getElementById("test-subject").value;
    resultJSON.duration = +document.getElementById("test-duration").value;
    resultJSON.complexity = +document.getElementById("test-complexity").value;
    resultJSON.description = document.getElementById("test-description").value;
    resultJSON.questions = [];
    resultJSON.answers = [];
    var allQuestions = document.getElementsByClassName("question-content");
    for (var i = 0; i < allQuestions.length; i++) {
        var questionContent = allQuestions[i];
        var questionTitle = questionContent.querySelector(".question-title-wrapper input").value;
        var questionType = getQuestionTypeForJSON(questionContent.querySelector(".question-head-wrapper select").value);
        var questionOptionsWrappers = questionContent.getElementsByClassName("option-wrapper");
        var questionOptions = [];
        var questionAnswers = 0;
        for (var j = 0; j < questionOptionsWrappers.length; j++) {
            var option = questionOptionsWrappers[j].querySelector("input[type='text']").value;
            var isAnswer = questionOptionsWrappers[j].firstElementChild.checked;
            questionOptions.push(option);
            questionAnswers += isAnswer ? Math.pow(2, j) : 0;
        }
        resultJSON.questions.push({
            title: questionTitle,
            type: questionType,
            options: questionOptions
        });
        resultJSON.answers.push(questionAnswers);
    }
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/tests", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert("Test uploaded");
        }
    };
    xhr.send(JSON.stringify(resultJSON));
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