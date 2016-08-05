var testModel = require("./test-model");
var path = require("path");
var router = require("express").Router();
var config = require("../../config");
var fs = require("fs");
var countFiles = require("../../scripts/count-files");

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json({ type: 'application/json'});

router.get("/tests", getTests);
router.get("/test:id", getSpecificTest);
router.post("/tests", jsonParser, createTest);

function getTests (req, res) {
    var testsObj = {tests: []};
    var pathToTestsDir = path.join(__dirname,
        config.express.pathToRootFromModels,
        config.express.pathToTestsDir
    );
    for (var i = 1; i <= countFiles(pathToTestsDir); i++) {
        testsObj.tests.push(require(path.join(
            __dirname, config.express.pathToRootFromModels,
            config.express.pathToTestsDir + "test" + i + ".json")
        ));
    }

    testModel.findAll(function(error, tests) {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        }
        res.render("all-tests", testsObj);
    });
}

function getSpecificTest(req, res) {
    var testPath = require(path.join(__dirname,
            config.express.pathToRootFromModels,
            config.express.pathToTestsDir
        ) + "test" + req.params.id + ".json");
    res.render("test", testPath);
}

function createTest (req, res) {
    if (!req.body) return res.sendStatus(400);
    var newFileIndex = countFiles(config.express.pathToTestsDir) + 1;
    req.body.id = newFileIndex; // add one more field on server
    var dataFromClient = JSON.stringify(req.body, null, 2);

    var pathToTest = path.join(__dirname,
        config.express.pathToRootFromModels, config.express.pathToTestsDir,
        config.express.testPathPrefix + newFileIndex + ".json"
    );

    fs.writeFile(pathToTest, dataFromClient, "utf8", function(err) {
        if (err) {
            // TODO: handling
            // console.log(err);
        }
        res.setHeader("Content-Type", "text/plain");
        res.status(201).send();
        res.end("{'Test uploaded':true}"); // FIXME: on client-side this data processed as JSON, not text/plain
    });
}

module.exports = router;
