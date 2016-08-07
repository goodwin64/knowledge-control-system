const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', require(path.join(__dirname, 'models/tests/router')));
app.get("/", function(req, res) {
    res.redirect("../index.html");
});
// app.use('/api', require(path.join(__dirname, 'models/questions/router')));
// Repeat the above line for additional model areas ("users", etc)

app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('connect-livereload')());

// FINALLY, use any error handlers
// TODO: impl
// app.use(require('app/errors/not-found'));

// It's possible to test the app instance via supertest
module.exports = app;
