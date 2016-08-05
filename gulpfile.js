var gulp = require("gulp")
var babel = require("gulp-babel")
var continuous_concat = require("gulp-continuous-concat")
var concat = require("gulp-concat")
var watch = require("gulp-watch")
var uglify = require('gulp-uglify');
//var imagemin = require('gulp-imagemin');
//var pngquant = require('imagemin-pngquant');
var gzip = require('gulp-gzip');
//var shell = require('gulp-shell')

var paths = {
  //libs: ['bower_components/**/*!(.min).js'],
	libs: ['bower_components/promise-js/promise.js',
	'bower_components/threejs/build/three.js',
	'bower_components/threejs/examples/js/loaders/ColladaLoader.js',
	'bower_components/threejs/examples/js/loaders/collada/Animation.js',
	'bower_components/threejs/examples/js/loaders/collada/AnimationHandler.js',
	'bower_components/threejs/examples/js/loaders/OBJLoader.js',
	'bower_components/threejs/examples/js/loaders/MTLLoader.js',
	'bower_components/threejs/examples/js/Detector.js',
	'bower_components/threejs/examples/js/Mirror.js',
	'bower_components/threejs/examples/js/controls/OrbitControls.js',
	'bower_components/threejs/examples/js/controls/VRControls.js',
	'bower_components/threejs/examples/js/effects/VREffect.js',
	'bower_components/dat-gui/build/dat.gui.min.js',
	'bower_components/webvr-polyfill/build/webvr-polyfill.js',
	'bower_components/webvr-boilerplate/build/webvr-manager.js',
	'bower_components/js-cookie/src/js.cookie.js'],
	scripts_dev: ['src/itsme.js', 'src/core/**/!(main)*.js', 'src/!(all)*.js'],
	scripts: ['lib/promise.js', 
		'lib/three.js', 
		'lib/webvr-polyfill.js',
		'lib/*.js'],
	images: ['assets/environments/*.{jpeg,jpg,png}'],
	chrome: ['assets/images/*.png'],
	animations: ['assets/animations/*.json'],
	models: ['assets/environments/*.dae']
};

gulp.task('libs', function () {
  return gulp.src(paths.libs)
     // .pipe(babel())
    //.pipe(gzip({ append: false, gzipOptions: { level: 9 } }))
    .pipe(gulp.dest("lib"))
});

gulp.task('dist', function () {
  return gulp.src(paths.scripts)
    .pipe(concat("itsme.js"))
 //   .pipe(gulp.dest("lib"))
    //.pipe(uglify({mangle: false}))
    .pipe(gulp.dest("dist"))


});

gulp.task('gzip-dist', function () {
  return gulp.src(paths.scripts)
    .pipe(concat("itsme.js"))
 //   .pipe(gulp.dest("lib"))
    .pipe(gzip({ append: false, gzipOptions: { level: 9 } }))
    .pipe(gulp.dest("dist"))
});

gulp.task('scripts-watch', function () {
  return gulp.src(paths.scripts_dev)
    .pipe(watch("src/**/*.js"))
    .pipe(continuous_concat("all.js"))
    .pipe(babel())
    .pipe(gulp.dest("lib"))
});

gulp.task('scripts', function () {
  return gulp.src(paths.scripts_dev)
    .pipe(concat("all.js"))
    .pipe(babel())
    .pipe(gulp.dest("lib"))
});


gulp.task('animations', function() {
  return gulp.src(paths.animations)
    .pipe(gzip({ append: false, gzipOptions: { level: 9 } }))
    .pipe(gulp.dest('dist/animations'));
});

gulp.task('models', function() {
  return gulp.src(paths.models)
    .pipe(gzip({ append: false, gzipOptions: { level: 9 } }))
    .pipe(gulp.dest('dist/environment'));
});

/*gulp.task('images', function() {
  return gulp.src(paths.images)
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('dist/environment'));
});*/

gulp.task('chrome', function() {
  return gulp.src(paths.chrome)
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts);
  gulp.watch(paths.images);
});

/*gulp.task('aws', shell.task([
  '/Users/pete/viewer-webgl/aws'
]))*/

gulp.task('watch', ['scripts-watch', 'libs']);
gulp.task('default', ['scripts', 'libs', 'dist']);
gulp.task('gzip', ['libs', 'gzip-dist']);
/*gulp.task('upload', ['scripts', 'libs', 'chrome', 'animations', 'models', 
'aws']);*/
