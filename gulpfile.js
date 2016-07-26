'use strict';

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
    src: 'app/scss/*.scss'
});

lazyRequireTask('clean', './tasks/clean', {
    dst: 'dist'
});

gulp.task('build', gulp.series('clean', 'styles'));

gulp.task('watch', function() {
    gulp.watch('app/**/*.*', gulp.series('styles'));
});

lazyRequireTask('serve', './tasks/serve', {
    src: 'dist',
    fallback: '../app/index.html'
});


gulp.task('dev',
    gulp.series('build', gulp.parallel('watch', 'serve'))
);

lazyRequireTask('lint', './tasks/lint', {
    cacheFilePath: process.cwd() + '/tmp/lintCache.json',
    src: 'app/**/*.js'
});