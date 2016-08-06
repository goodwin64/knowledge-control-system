function readTestData() {
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
        var questionAnswersSum = 0;

        for (var j = 0; j < questionOptionsWrappers.length; j++) {
            var option = questionOptionsWrappers[j].querySelector("input[type='text']").value;
            var isAnswer = questionOptionsWrappers[j].firstElementChild.checked;
            questionOptions.push(option);
            questionAnswersSum += (isAnswer ? Math.pow(2, j) : 0);
        }

        resultJSON.questions.push({
            title: questionTitle,
            type: questionType,
            options: questionOptions
        });
        resultJSON.answers.push(questionAnswersSum);
    }

    return resultJSON;
}

function collectTestData() {
    var resultJSON = {};
    resultJSON.testID = +document.getElementById("submit-test").getAttribute("data-test-id");
    resultJSON.answers = [];
    // it's possible to add more parameters, such as "time completed", "cheating"

    var allQuestions = document.getElementsByClassName("question-content");
    for (var i = 0; i < allQuestions.length; i++) {
        var questionContent = allQuestions[i];
        var questionOptionsWrappers = questionContent.getElementsByClassName("option-wrapper");
        var questionAnswersSum = 0;

        for (var j = 0; j < questionOptionsWrappers.length; j++) {
            var isAnswer = questionOptionsWrappers[j].firstElementChild.checked;
            questionAnswersSum += isAnswer * Math.pow(2, j);
        }
        resultJSON.answers.push(questionAnswersSum);
    }

    return resultJSON;
}

function sendTestData(url, isItCreating) {
    if (isItCreating) {
        var resultJSON = readTestData();
    } else {
        resultJSON = collectTestData();
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if (isItCreating) {
                // alert("Test uploaded");
                // document.innerHTML = xhr.responseText;
                document.write(xhr.responseText);
            } else {
                afterTest(JSON.parse(xhr.responseText));
            }
        }
    };
    xhr.send(JSON.stringify(resultJSON));
}

function afterTest(response) {
    var testResultArr = response.result;
    disableControls();
    markQuestions(testResultArr);

    function disableControls() {
        var disabledItems = document.getElementsByClassName("disabled-after-test");
        for (var i = 0; i < disabledItems.length; i++) {
            disabledItems[i].disabled = true;
        }
    }

    function markQuestions(testResultArr) {
        var questions = document.getElementById("test-content").children;
        for (var i = 0; i < questions.length; i++) {
            if (testResultArr[i]) {
                questions[i].querySelector(".question-content").className += " correct";
            } else {
                questions[i].querySelector(".question-content").className += " incorrect";
            }
        }
    }
}


