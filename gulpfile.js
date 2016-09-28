require('babel-core/register');
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var babel = require('gulp-babel');

gulp.task('test', function() {
    return gulp.src(['tests/*/*.js'])
        .pipe(mocha());
});

gulp.task('default', ['test'], function() {
    gulp.watch(['tests/*/*.js', 'app.js', 'app/*/*.js'], ['test']);
});
