var gulp = require('gulp'),
  concat = require('gulp-concat')
  groupConcat = require('gulp-group-concat'),
  nodemon = require('gulp-nodemon');

var dest = 'public'

gulp.task('html', function () {
  return gulp.src('app/index.html')
    .pipe(gulp.dest(dest));
});

gulp.task('scripts', function () {
  return gulp.src([
    'node_modules/lodash/dist/lodash.min.js',
    'node_modules/eventify/dist/eventify.min.js',
    'node_modules/socket.io-client/socket.io.js',
    'node_modules/bluebird/js/browser/bluebird.js',
    'app/js/*.js',
    'app/js/*/*.js'
  ]).pipe(groupConcat({
      'js/index.js': '**/*'
    }))
    .pipe(gulp.dest(dest));
});

gulp.task('watch', function () {

});

gulp.task('server', function () {

});

gulp.task('serve', ['watch', 'server']);

gulp.task('build', ['scripts', 'html']);

gulp.task('test', []);

gulp.task('default', ['test', 'build']);