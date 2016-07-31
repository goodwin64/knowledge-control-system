'use strict';

const gulp = require('gulp');
const webserver = require('gulp-webserver');

module.exports = function(options) {
    return function () {
        gulp.src(options.src)
            .pipe(webserver({
                livereload: options.livereload,
                directoryListing: options.directoryListing,
                open: options.open,
                fallback: options.fallback
            }));
    };
};
