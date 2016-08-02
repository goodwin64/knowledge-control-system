"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const fs = require('fs');
const path = require('path');
const sh = require('shelljs');

app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(require('connect-livereload')());

app.post('/upload', function (req, res) {
    var dataFromClient = JSON.stringify(req.body, null, 2);
    var pathToTestsDir = "fromDB/tests/";
    var pathPrefix = "test";
    var newFileIndex = countFiles(pathToTestsDir) + 1;
    var pathToTest = path.join(__dirname, "../" + pathToTestsDir + pathPrefix + newFileIndex + ".json");
    fs.writeFile(pathToTest, dataFromClient, "utf8", function(err) {
        if (err) {
            console.log(err);
        }
        res.setHeader('Content-Type', 'text/plain');
        res.end('{"Test uploaded":true}'); // FIXME: on client-side this data processed as JSON, not text/plain
    });
});

app.listen(8080, function () {
    console.log('App listening on port 8080');
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
