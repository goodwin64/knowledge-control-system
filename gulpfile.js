'use strict';

const isDevelop = false; // false on "production"
const gulp = require('gulp');

const lr = require('tiny-lr');
const server = lr();

function lazyRequireTask(taskName, path, options) {
    options = options || {};
    options.taskName = taskName;
    gulp.task(taskName, function(callback) {
        let task = require(path).call(this, options);
        return task(callback);
    });
}

// delete "dst" dir (usually before building)
lazyRequireTask('clean', './tasks/clean', {
    dst: 'public/'
});

lazyRequireTask('build-styles', './tasks/build-styles', {
    src: 'app/styles/*.{scss,sass,css}',
    dst: 'public/css/',
    outputStyle: (isDevelop ? 'full' : 'compressed'),
    isDevelop: isDevelop,
    includePaths: ''
});

lazyRequireTask('build-html', './tasks/build-html', {
    src: 'app/assets/pages-static/*.pug',
    dst: 'public/',
	pretty: isDevelop,
    taskName: "build-html"
});

// execute manually from terminal (doesn't work on NodeJS v0.10.25)
lazyRequireTask('build-images', './tasks/build-images', {
    src: 'app/assets/images/**/*.{jpg,png,ico}',
    dst: 'public/images/',
    taskName: "build-images"
});

// uglify, for production
lazyRequireTask('build-scripts', './tasks/build-scripts', {
    src: 'app/scripts/*.js',
    dst: 'public/scripts/',
    mangle: !isDevelop,
    compress: !isDevelop,
    output: { beautify: isDevelop },
    taskName: "build-scripts"
});

lazyRequireTask('lint', './tasks/lint', {
    cacheFilePath: process.cwd() + '/tmp/lintCache.json',
    src: 'app/**/*.scripts'
});

// webserver + live reload
lazyRequireTask('serve', './tasks/serve', {
    src: 'public/',
    livereload: true,
    directoryListing: false,
    open: false,
});

gulp.task('build',
    gulp.series('build-styles', 'build-html', 'build-scripts', 'build-images')
);

gulp.task('lr-server', function() {
	server.listen(35729, function(err) {
		if (err) console.log(err);
	});
});

// gulp.task('watch', function() {
// 	gulp.watch('app/**/*.*', gulp.series('build'));
// });

gulp.task('watch', function() {
	gulp.series('lr-server', 'build-scripts', 'build-styles');

	gulp.watch('app/**/*.js', function() {
		gulp.series('build-scripts');
	});

	gulp.watch('app/**/*.{css,scss}', function() {
		gulp.series('build-styles');
	});

	gulp.watch('app/**/*.{html,pug}', function() {
		gulp.series('build-html');
	});
});

gulp.task('dev',
    gulp.series('clean', 'build', gulp.parallel('watch', 'serve'))
);
