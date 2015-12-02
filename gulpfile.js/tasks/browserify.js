var gulp = require('gulp');
var reactify = require('reactify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');

var argv = require('yargs').argv;
var mode = argv.mode;
var entry;
if (mode === "prod") {
	entry = "./src/js/prod.js";
} else {
	entry = "./src/js/dev.js";
}

gutil.log('entry : ' + entry);

gulp.task('browserify', function() {
	var bundler = browserify({
		entries: [entry],
		debug: true,
		cache: {}, packageCache: {}, fullPaths: true,
	});

	bundler.transform({
		//global : true,
	}, 'reactify');

	bundler.bundle()
			.pipe(source('app.js'))
			.pipe(gulp.dest('./build/js'));
});

