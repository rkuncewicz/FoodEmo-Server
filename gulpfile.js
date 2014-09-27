// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	clean = require('gulp-clean'),
	browserify = require('gulp-browserify'),
	gutil = require('gulp-util'),
	debowerify = require('debowerify');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('public/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Browserify task
gulp.task('browserify', function() {
  // Single point of entry (make sure not to src ALL your files, browserify will figure it out for you)
  gulp.src(['public/app.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))
  // Bundle to a single file
  .pipe(concat('bundle.js'))
  // Output it to our dist folder
  .pipe(gulp.dest('dist/js'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('/dist/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('public/js/**/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('views', function() {
	gulp.src('public/index.html')
	.pipe(gulp.dest('dist/'));

	gulp.src('./public/views/**/*')
	.pipe(gulp.dest('dist/views/'));	
});

// Watch Files For Changes
gulp.task('watch', function() {
	gulp.watch(['public/index.html', 'public/views/**/*.html'], ['views']);
    gulp.watch('js/*.js', ['lint', 'browserify']);
    gulp.watch('scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'browserify', 'views', 'watch']);
