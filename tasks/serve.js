'use strict';

const gulp = require('gulp');
const webserver = require('gulp-webserver');

module.exports = function(options) {

    return function () {
        gulp.src(options.src)
            .pipe(webserver({
                livereload: true,
                // directoryListing: true,
                open: true,
                fallback: options.fallback
            }));
    };
};

// app.get('/', function(req, res, next) {
//     res.send("Hello world");
// });
