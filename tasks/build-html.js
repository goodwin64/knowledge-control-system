'use strict';

const gulp = require('gulp');
const pug = require('gulp-pug');

module.exports = function(options) {
	return function() {
		return gulp.src(options.src, {since: gulp.lastRun(options.taskName)})
			.pipe(pug({
				pretty: options.pretty
			}))
			.pipe(gulp.dest(options.dst));
	};
};
