var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var watchify = require('watchify');

var src = "./code/";
var dst = "./_site/code/";
var name = "al";

gulp.task('jshint', function () {
	gulp.src([src + '**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'));
});

gulp.task('build', function() {
	return gulp.src(src + name + ".js")
		.pipe(browserify({
			//insertGlobals: true,
			debug:true,
		}))
		.pipe(gulp.dest(dst))
		.pipe(uglify())
		.pipe(rename(name + ".min.js"))
		.pipe(gulp.dest(dst));
});

gulp.task('default', ['jshint', 'build'], function() {
	// set up the watcher:
	//gulp.watch(src + '*.js', ['build']);
});
