var gulp = require('gulp'),
	connect = require('gulp-connect'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream');

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
 
gulp.task('html', function () {
	gulp.src('./public/**/*.html').pipe(connect.reload());
});
gulp.task('js', function () {
	//gulp.src('./public/**/*.js').pipe(connect.reload());
	gulp.src('./public/**/*.js', ['browserify']);
});
 
gulp.task('watch', function () {
	gulp.watch(['./public/**/*.html'], ['html']);
	gulp.watch(['./public/**/*.js'], ['js']);
});
 
gulp.task('default', ['connect', 'watch']);