var gulp = require('gulp'),
    clean = require('gulp-clean'),
    less = require('gulp-less'),
    path = require('path'),
    watchify = require('gulp-watchify');

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

var stylesDir = deployDir + '/css';

gulp.task('clean-styles', function() {
  return gulp.src(stylesDir)
             .pipe(clean());
});

gulp.task('styles', ['clean-styles'], function() {
  return gulp.src('less/puzzles.less')
             .pipe(less({paths: [path.join(__dirname, 'less')]}))
             .pipe(gulp.dest(stylesDir));
});

var scriptsDir = deployDir + '/js';

gulp.task('clean-scripts', function() {
  return gulp.src(scriptsDir)
             .pipe(clean());
});

// Hack to enable configurable watchify watching
// From https://github.com/marcello3d/gulp-watchify/blob/master/examples/simple/gulpfile.js
var watching = false;
gulp.task('enable-watch-mode', function() {
  watching = true;
});

gulp.task('scripts', ['clean-scripts'], watchify(function(watchify) {
  return gulp.src('js/puzzles.js')
             .pipe(watchify({
                watch: watching
             }))
             .pipe(gulp.dest(scriptsDir));
}));

gulp.task('watch-scripts', ['enable-watch-mode', 'scripts']);

gulp.task('clean-html', function() {
  return gulp.src(deployDir + '/**/*.html')
             .pipe(clean());
});

gulp.task('html', function() {
  return gulp.src('html/**/*')
             .pipe(gulp.dest(deployDir));
});

gulp.task('build', ['html', 'data', 'images', 'styles', 'scripts']);

gulp.task('clean', ['clean-html', 'clean-data', 'clean-images', 'clean-styles', 'clean-scripts']);

gulp.task('watch', ['watch-scripts'], function() {
  gulp.watch('html/**/*', ['html']);
  gulp.watch('data/**/*', ['data']);
  gulp.watch('img/**/*', ['images']);
  gulp.watch('less/**/*', ['styles']);
});
