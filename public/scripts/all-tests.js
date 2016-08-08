(function() {
    jQuery.expr[":"].contains = function(a, i, m) {
        return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
    };
    document.getElementById("search-test").oninput = function() {
        var userInput = this.value;
        var testList = $(".list-group-item");
        testList.css("display", "none").filter(":contains(" + userInput + ")").css("display", "list-item");
    };
})();