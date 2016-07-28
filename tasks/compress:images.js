'use strict';

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

module.exports = function(options) {
    return function() {
        return gulp.src(options.src)
            .pipe(imagemin({
                optimizationLevel: 3,
                progressive: true,
                interlaced: false,
                svgoPlugins: [{
                    removeViewBox: false
                }]
            }))
            .pipe(gulp.dest(options.dst));
    };
};
