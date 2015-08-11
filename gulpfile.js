var gulp = require('gulp'),
    clean = require('gulp-clean');

var deployDir = 'public';

var imgDir = deployDir + '/img';
var imgExts = ['jpg', 'png'];
var imgDeploySrc = imgExts.map(function(ext) { return imgDir + '/**/*.' + ext; });
var imgDevSrc = imgExts.map(function(ext) { return 'img/**/*.' + ext; });

gulp.task('clean-images', function() {
  return gulp.src(imgDeploySrc)
             .pipe(clean());
});

gulp.task('images', ['clean-images'], function() {
  return gulp.src(imgDevSrc)
             .pipe(gulp.dest(imgDir));
});

var dataDir = deployDir + '/data';

gulp.task('clean-data', function() {
  return gulp.src(dataDir)
             .pipe(clean());
});

gulp.task('data', ['clean-data'], function() {
  return gulp.src('data/**/*')
             .pipe(gulp.dest(dataDir));
});
