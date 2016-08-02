'use strict';

const gulp = require('gulp');
const pug = require('gulp-pug');

module.exports = function(options) {
    return function () {
        return gulp.src(options.src)
            .pipe(pug({
                pretty: true
            }))
            .pipe(gulp.dest(options.dst));
    };
};
