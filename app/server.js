"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const fs = require('fs');
const path = require('path');
const sh = require('shelljs');
const pug = require('pug');

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(require('connect-livereload')());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/tests', function (req, res) {
    var testsPath = path.join(__dirname, "../fromDB/tests/");
    var testsObj = {tests: []};
    for (var i = 1; i <= countFiles(testsPath); i++) {
        testsObj.tests.push(require(testsPath + "test" + i + '.json'));
    }
    res.render('all-tests', testsObj);
});

app.get('/test:id', function (req, res) {
    var test = require('../fromDB/tests/test' + req.params.id + '.json');
    res.render('test', test);
});

app.post('/upload', function (req, res) {
    var dataFromClient = req.body;
    var pathToTestsDir = "fromDB/tests/";
    var pathPrefix = "test";
    var newFileIndex = countFiles(pathToTestsDir) + 1;
    dataFromClient.id = newFileIndex; // add one more field on server
    var pathToTest = path.join(__dirname, "../" + pathToTestsDir + pathPrefix + newFileIndex + ".json");

    fs.writeFile(pathToTest, JSON.stringify(dataFromClient, null, 2), "utf8", function(err) {
        if (err) {
            console.log(err);
        }
        res.setHeader('Content-Type', 'text/plain');
        res.end('{"Test uploaded":true}'); // FIXME: on client-side this data processed as JSON, not text/plain
    });
});

app.listen(PORT, function () {
    console.log('App listening on port ' + PORT);
});

/**
 * Counts the number of files in some directory.
 */
function countFiles(folderPath) {
    var count = 0;
    sh.cd(folderPath);
    var files = sh.ls() || [];

    for (var i = 0; i < files.length; i++) {
        if (files[i].match(/.*\..*/)) {
            count++;
        }
    }
    return count;
}
