'use strict';

const gulp = require('gulp');
const jade = require('gulp-jade');

module.exports = function(options) {
    return function () {
        var test001 = require('../fromDB/tests/test1.json');

        return gulp.src(options.src)
            .pipe(jade({
                locals: test001
            }))
            .pipe(gulp.dest(options.dst));
    };
};
