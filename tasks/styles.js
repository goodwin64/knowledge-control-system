'use strict';

const gulp = require('gulp');
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');

// const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = function(options) {
    return function() {
        return gulp.src(options.src)
            .pipe(gulpif(options.isDevelop, sourcemaps.init()))
            .pipe(sass({outputStyle: options.outputStyle}))
            .pipe(gulpif(options.isDevelop, sourcemaps.write()))
            .pipe(gulp.dest(options.dst));
    };
};
