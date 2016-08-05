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

// delete "dst" dir (usually before building)
lazyRequireTask('clean', './tasks/clean', {
    dst: 'public/'
});

lazyRequireTask('build:styles', './tasks/build:styles', {
    src: 'app/styles/*.{scss,sass,css}',
    dst: 'public/css/',
    outputStyle: (isDevelop ? 'full' : 'compressed'),
    isDevelop: isDevelop,
    includePaths: ''
});

// includes (header, footer)
lazyRequireTask('build:html', './tasks/build:html', {
    src: 'app/assets/pages-static/*.pug',
    dst: 'public/',
    taskName: "build:html"
});

// execute manually from terminal (doesn't work on NodeJS v0.10.25)
lazyRequireTask('build:images', './tasks/build:images', {
    src: 'app/assets/images/**/*.{jpg,png,ico}',
    dst: 'public/images/',
    taskName: "build:images"
});

// uglify, for production
lazyRequireTask('build:scripts', './tasks/build:scripts', {
    src: 'app/scripts/*.js',
    dst: 'public/scripts/',
    mangle: !isDevelop,
    compress: !isDevelop,
    output: { beautify: isDevelop },
    taskName: "build:scripts"
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
    gulp.series('build:styles', 'build:html', 'build:scripts', 'build:images')
);

gulp.task('watch', function() {
    gulp.watch('app/**/*.*', gulp.series('build'));
});

gulp.task('dev',
    gulp.series('build', gulp.parallel('watch', 'serve'))
);
