var app = require('express')();
var http = require('http').Server(app);
var mysql = require('mysql');
var bodyParser = require("body-parser");
var connection = mysql.createConnection({
		host			:	'localhost',
		user			:	'max',
		password	:	'maxp',
		database	:	'testsdb',
	});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// -------------------------------------------------- GLOBAL VARIABLES
var defaultRequest = function(req, res){
	res.send("Please use /restapi/tests or /restapi/questions");
};

questionInfoExceptAnswers = "`id_test`, `title`, `options_content`, `options_concat`";
// -------------------------------------------------- END OF GLOBAL VARIABLES

app.get('/', defaultRequest);
app.get('/restapi', defaultRequest);

/* Get all tests */
app.get('/restapi/tests', function(req, res) {
	var data = {
		"error":1,
		"Tests":""
	};
	
	connection.query("SELECT * FROM `tests`", function(err, rows) {
		if (rows.length != 0) {
			data["error"] = 0;
			data["Tests"] = rows;
			res.json(data);
		} else {
			data["Tests"] = 'No tests found..';
			res.json(data);
		}
	});
});

/* Get all questions */
app.get('/restapi/questions', function(req, res) {
	var data = {
		"error":1,
		"Questions":""
	};
	
	connection.query("SELECT " + questionInfoExceptAnswers + " FROM `questions`", function(err, rows) {
		if (rows.length != 0) {
			data["error"] = 0;
			data["Questions"] = rows;
			res.json(data);
		} else {
			data["Questions"] = 'No questions found..';
			res.json(data);
		}
	});
});

/* Get specific test (by ID) */
app.get('/restapi/tests/:id', function(req, res) {
	var testId = req.params.id;
	var data = {
		"error":1,
		"Info":""
	};
	if (!!testId) {
		var queryStringT = "SELECT * FROM tests WHERE `id`=?"; // TODO: JOIN ?
		var queryStringQ = "SELECT " + questionInfoExceptAnswers + " FROM questions WHERE `id_test`=?";
		var queryKeys = [testId];

		connection.query(queryStringQ, queryKeys, function(err, rows, fields) {
			if (!!err) {
				data["Info"] = "Error occured while reading data";
			} else {
				data["error"] = 0;
				data["Info"] = rows;
			}
			res.json(data);
		});
	} else {
		data["Info"] = "Please provide all required data (i.e : id)";
		res.json(data);
	}
});

/* Get specific question (by ID) */
app.get('/restapi/questions/:id', function(req, res) {
	var questionId = req.params.id;
	var data = {
		"error":1,
		"Info":""
	};
	if (!!questionId) {
		var queryString = "SELECT " + questionInfoExceptAnswers + " FROM questions WHERE `id`=?";
		var queryKeys = [questionId];
		connection.query(queryString, queryKeys, function(err, rows, fields) {
			if (!!err) {
				data["Info"] = "Error occured while reading data";
			} else {
				data["error"] = 0;
				data["Info"] = rows;
			}
			res.json(data);
		});
	} else {
		data["Info"] = "Please provide all required data (i.e : id)";
		res.json(data);
	}
});

// TODO: add POST, PUT, DELETE

http.listen(8080, function() {
	console.log("Connected & Listen to port 8080");
});