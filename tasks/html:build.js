'use strict';

const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const jade = require('gulp-jade');
const gulpif = require('gulp-if');

module.exports = function(options) {
    return function () {
        var test001 = require('../fromDB/tests/test001.json');

        return gulp.src(options.src)
            .pipe(gulpif('*.html',
                fileinclude({
                    prefix: options.prefix,
                    basepath: options.basepath
                }),
                jade({
                    locals: test001
                })))
            .pipe(gulp.dest(options.dst));
    };
};
