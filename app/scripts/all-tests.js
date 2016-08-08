var jqCount = 0; // TODO: remove on production

(function() {
    // jQuery "contains" case ignore
    jQuery.expr[':'].contains = function(a, i, m) {
        return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
    };

    // on filter (test search)
    document.getElementById("test-search").oninput = function() {
        var userInput = this.value;
        // var testList = document.getElementsByClassName("test-params");
        var testList = $(".list-group-item");
        jqCount++;
        testList
            .css("display", "none")
            .filter(":contains("+userInput+")")
            .css("display", "list-item");
    };

    // on sort
    document.getElementById("test-sort").onchange = sortTestItems;
    document.getElementById("by-increasing").onchange = sortTestItems;
})();

function sortTestItems() {
    var criteria = $("#test-sort").val();
    jqCount++;

    var mylist = $('.list-group');
    var listitems = mylist.children('li').get();
    listitems.sort(function(a, b) {
        var compA = $(a).find(".test-" + criteria).text().toUpperCase();
        var compB = $(b).find(".test-" + criteria).text().toUpperCase();
        jqCount += 2;
        if (criteria == "duration" || criteria == "complexity") {
            compA = +compA;
            compB = +compB;
        }
        var result = (compA < compB) ? -1 : (compA > compB) ? 1 : 0;

        if (!$("#by-increasing").prop("checked")) {
            result *= -1;
        }

        return result;
    });
    $.each(listitems, function(idx, itm) { mylist.append(itm); });
    console.log("jQuery calls: ", jqCount);
}
