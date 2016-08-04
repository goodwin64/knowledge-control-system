'use strict';

const isDevelop = true; // false on "production"
const gulp = require('gulp');

function lazyRequireTask(taskName, path, options) {
    options = options || {};
    options.taskName = taskName;
    gulp.task(taskName, function(callback) {
        let task = require(path).call(this, options);
        return task(callback);
    });
}

lazyRequireTask('styles', './tasks/styles', {
    src: 'app/scss/*.scss',
    dst: 'public/css/',
    outputStyle: (isDevelop ? 'full' : 'compressed'),
    isDevelop: isDevelop
});

// delete "dst" dir (usually before building)
lazyRequireTask('clean', './tasks/clean', {
    dst: 'public'
});

// includes (header, footer)
lazyRequireTask('html:build', './tasks/html:build', {
    src: 'app/pages-static/*.pug',
    dst: 'public/',
});

lazyRequireTask('lint', './tasks/lint', {
    cacheFilePath: process.cwd() + '/tmp/lintCache.json',
    src: 'app/**/*.js'
});

// execute manually from terminal (doesn't work on NodeJS v0.10.25)
lazyRequireTask('compress:images', './tasks/compress:images', {
    src: 'app/images/*.*',
    dst: 'public/images/'
});

// uglify, for production
lazyRequireTask('compress:js', './tasks/compress:js', {
    src: 'app/js/*.js',
    dst: 'public/js/',
    mangle: !isDevelop,
    compress: !isDevelop,
    output: { beautify: isDevelop }
});

// webserver + live reload
lazyRequireTask('serve', './tasks/serve', {
    src: 'public/',
    livereload: true,
    directoryListing: false,
    open: false,
});

gulp.task('build', gulp.series('styles', 'html:build', 'compress:js'));

gulp.task('watch', function() {
    gulp.watch('app/**/*.*', gulp.series('styles', 'html:build', 'compress:js'));
});

gulp.task('dev',
    gulp.series('build', gulp.parallel('watch', 'serve'))
);