// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// Compile Sass & auto-inject into browsers
gulp.task('sass', function () {
	return gulp.src('lib/scss/**/*.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(gulp.dest('lib/css'))
		.pipe(reload({
			stream: true
		}));
});

// Lint Task
gulp.task('lint', function () {
	return gulp.src('lib/js/app/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// Concatenate, Minify JS & auto-inject into browsers
gulp.task('appscripts', function () {
	return gulp.src('lib/js/app/**/*.js')
		.pipe(concat('app.js'))
		.pipe(gulp.dest('lib/js'))
		.pipe(rename('app.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('lib/js'))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('vendorscripts', function () {
	return gulp.src('lib/js/vendor/**/*.js')
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest('lib/js'))
		.pipe(rename('vendor.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('lib/js'))
		.pipe(reload({
			stream: true
		}));
});

// Watch Files For Changes
gulp.task('watch', function () {
	gulp.watch('lib/js/app/**/*.js', ['lint', 'appscripts']);
	gulp.watch('lib/scss/**/*.scss', ['sass']);
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'appscripts'], function () {
	browserSync({
		server: "./"
	});
	gulp.watch("lib/js/app/**/*.js", ['appscripts']);
	gulp.watch("lib/scss/**/*.scss", ['sass']);
	gulp.watch("./*.html").on('change', reload);
});

// clean dist folder
gulp.task('clean', function () {
	return gulp.src('dist/**/*', {
			read: false,
			force: true
		})
		.pipe(clean());
});

// deploy app artifact
gulp.task('dist', ['clean'], function () {
	gulp.src('index.html').pipe(gulp.dest('dist'));
	gulp.src('lib/css/**/*.css').pipe(gulp.dest('dist/lib/css'));
	gulp.src('lib/js/*.min.js').pipe(gulp.dest('dist/lib/js'));
	gulp.src('lib/font/**/*').pipe(gulp.dest('dist/lib/font'));
	gulp.src('lib/icon/**/*').pipe(gulp.dest('dist/lib/icon'));
	gulp.src('lib/img/**/*').pipe(gulp.dest('dist/lib/img'));
});

// Dev Tasks
gulp.task('dev', ['sass', 'lint', 'appscripts', 'watch']);

// Build Tasks
gulp.task('build', ['sass', 'lint', 'appscripts', 'vendorscripts']);

// Default Task
gulp.task('default', ['serve']);
