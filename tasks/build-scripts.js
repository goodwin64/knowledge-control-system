const gulp = require('gulp');
const uglify = require('gulp-uglify');
const pump = require('pump');

module.exports = function(options) {
	return function(cb) {
		return pump([
				gulp.src(options.src, {since: gulp.lastRun(options.taskName)}),
				uglify({
					mangle: options.mangle,
					compress: options.compress,
					output: options.output
				}),
				gulp.dest(options.dst)
			], cb
		);
	};
};
