const gulp = require('gulp');
const uglify = require('gulp-uglify');
const pump = require('pump');

module.exports = function(options) {
    return function(cb) {
        return pump([
                gulp.src(options.src),
                uglify(),
                gulp.dest(options.dst)
            ], cb
        );
    };
};
