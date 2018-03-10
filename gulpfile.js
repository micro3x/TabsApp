// Less configuration
var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var plumber = require('gulp-plumber');

gulp.task('less', function() {
    gulp.src('css/*.less')
        .pipe(less())
        .pipe(gulp.dest(function(f) {
            return f.base;
        }))
});

gulp.task('default', ['less'], function() {
    gulp.watch('css/*.less', ['less']);
})


gulp.task('build', function() {
    return gulp.src(['js/**/app.js', 'js/**/*.module.js', 'js/**/*.js'])
	    .pipe(plumber())
			.pipe(concat('app.js', {newLine: ';'}))
			.pipe(ngAnnotate({add: true}))
	    .pipe(plumber.stop())
        .pipe(gulp.dest('src/'));
});