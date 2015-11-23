var gulp = require('gulp'),
	clean = require('gulp-clean'),
	connect = require('gulp-connect'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream');


gulp.task('clean:js', function () {
	return gulp
		.src('./public/dist/js/*.js', {read: false})
		.pipe(clean());
});

gulp.task('browserify', function() {
	return browserify('./public/app/app.js')
		.bundle()
		.pipe(source('app.js'))
		.pipe(gulp.dest('./public/dist/js/'));
});

gulp.task('connect', function() {
	connect.server({
		root: 'public',
		livereload: true
	});
});

gulp.task('reload', function () {
	connect.reload();
});

gulp.task('reload:html', function () {
	gulp
		.src('./public/**/*.html')
		.pipe(connect.reload());
});

gulp.task('reload:js', function () {
	gulp
		.src('./public/dist/js/**/*.js')
		.pipe(connect.reload());
});
 
gulp.task('watch', function () {
	gulp.watch(['./public/**/*.html'], ['reload:html']);
	gulp.watch(['./public/app/**/*.js'], ['build:js', 'reload:js']);
});

gulp.task('build:js', ['clean:js', 'browserify']);
gulp.task('default', ['browserify', 'connect', 'watch']);