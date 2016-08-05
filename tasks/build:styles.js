'use strict';

const gulp = require('gulp');
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');

module.exports = function(options) {
    return function() {
        return gulp.src(options.src)
            .pipe(gulpif(options.isDevelop, sourcemaps.init()))
            .pipe(gulpif("**/*.{scss,sass}", sass({
                outputStyle: options.outputStyle,
                includePaths: options.includePaths
            })))
            .pipe(gulpif(options.isDevelop, sourcemaps.write()))
            .pipe(gulp.dest(options.dst));
    };
};
