var gulp = require('gulp');

var paths = {
  sass: ['./css/**/*.sass'],
  js: ['./js/**/*.js']
};

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['browserify']);
});