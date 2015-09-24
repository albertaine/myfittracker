'use strict';

var gulp = require('gulp'),
	wiredep = require('wiredep').stream,
	useref = require('gulp-useref'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	minifyCss = require('gulp-minify-css'),
	concat = require('gulp-concat'),
	scss = require('gulp-sass'),
	ngAnnotate = require('gulp-ng-annotate'),
	webserver = require('gulp-webserver');

gulp.task('scss', function () {
	gulp.src('app/css/scss/**/*.scss')
	.pipe(scss())
	
	.pipe(concat('sass.css'))
	.pipe(gulp.dest('app/css'));
});

gulp.task('bower', function () {
	gulp.src('./app/index.html')
		.pipe(wiredep({
			directory : 'app/bower_components'
		}))
		.pipe(gulp.dest('./app'));
});

gulp.task('watch', function () {
	gulp.watch('app/css/scss/**/*.scss', ['scss']);
});

gulp.task('webserver', function () {
	gulp.src('app')
		.pipe(webserver({
			livereload: true,
			open: true
		}));
});

gulp.task('default', [
	'scss',
	'bower',
	'watch',
	'webserver'
]);

gulp.task('css-vendor', function () {
	gulp.src([
		'app/bower_components/bootstrap/dist/css/bootstrap.css',
		'app/bower_components/bootstrap/dist/css/bootstrap-theme.css',
		'app/bower_components/angular-bootstrap/ui-bootstrap-csp.css'
	])
		.pipe(concat('vendor.css'))
		.pipe(gulp.dest('build/css'));
});

gulp.task('build', ['scss', 'css-vendor', 'bower'], function () {
	var assets = useref.assets();

	return gulp.src('app/*.html')
		.pipe(assets)
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', minifyCss()))
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulp.dest('build'));
});

