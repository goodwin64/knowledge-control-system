'use strict';

const gulp = require('gulp');
const fileinclude = require('gulp-file-include');

module.exports = function(options) {
    return function () {
        return gulp.src(options.src)
            .pipe(fileinclude({
                prefix: options.prefix,
                basepath: options.basepath
            }))
            .pipe(gulp.dest(options.dst));
    };
};
