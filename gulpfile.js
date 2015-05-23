var gulp = require('gulp');
var template = require('gulp-template');
var browserify = require('browserify');
var babelify = require('babelify');
var glob = require('glob');
var source = require('vinyl-source-stream');
var path = require('path');

gulp.task('default', function () {
  var thing_paths = glob.sync('./things/*/index.js');
  var things = thing_paths.map(path.dirname).map(path.basename);
  // ['bar', 'baz', 'foo']
  return browserify('./main.js')
    // I want to run index.js through gulp-template before browserifying
    // This obviously doesn't work, but I can't figure out how it should be done
    .transform(template({ things: things }))
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist'));
});
