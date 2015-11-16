var gulpSass = require('gulp-sass');
var gulp = require('gulp');

gulp.task('sass', function() {
	return gulp.src('./css/sass/app.scss')
		.pipe(gulpSass({
        
      	}))
      	.pipe(gulp.dest('./build/css'));
});