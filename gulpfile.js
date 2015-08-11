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
