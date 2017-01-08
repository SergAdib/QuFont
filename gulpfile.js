'use strict';

var gulp = require('gulp');
var gp = require('gulp-load-plugins')();

var browserify = require('browserify'),
		source = require('vinyl-source-stream'),
		buffer = require('vinyl-buffer'),
		del = require('del'),
		bowerDep = require('main-bower-files');

var browserSync = require('browser-sync'),
		reload = browserSync.reload;

var babel = function() {
	return gp.babel({
		presets: ['es2015']
	});
};

var wiredep = require('wiredep').stream;

// @Main serving section

gulp.task('serve', ['browser-sync'], function () {

	// watchdogs for development changes
	gulp.watch('dev/*.scss', ['sass']);
	gulp.watch('dev/*.css', ['css']);
	gulp.watch('dev/*.js', ['js']);
	gulp.watch('dev/*.html', ['html']);

});

gulp.task('browser-sync', function() {
	browserSync.init(null, {
		notify: true,
		server: {
            baseDir: "./app/"
        },
    files: ["app/**/*.*"],
    port: 9000,
		ui: {
    port: 9090
		}
	});
});

// @HTML parsers / helpers

gulp.task('html', ['htmlparse'], function() {
	return gulp.src('app/*.html')
	//.pipe(wiredep())
	.pipe(gp.useref({
		searchPath: 'app/'
	}))
	.pipe(gp.size({title: 'Production', showFiles: true}))
	.pipe(gulp.dest('app/'));
})

gulp.task('htmlparse', function() {
	return gulp.src('dev/*.html')
	.pipe(gp.htmlmin({collapseWhitespace: false}))
	.pipe(gulp.dest('app/'));
})

// @CSS parsers / helpers

gulp.task('sass', function() {
	return gulp.src('dev/**/*.scss')
	.pipe(gp.sass.sync({
		outputStyle: 'expanded',
		precision: 10,
		includePaths: ['.']
	}).on('error', gp.sass.logError))
	.pipe(gulp.dest('dev/'));
})

gulp.task('css', function() {
	return gulp.src('dev/**/*.css')
		.pipe(gp.plumber())
		.pipe(gp.concat('Main.css'))
		//.pipe(gp.sourcemaps.init())
		.pipe(gp.autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		//.pipe(gp.cssnano())
		//.pipe(gp.sourcemaps.write('.'))
		.pipe(gp.size({title: 'Production', showFiles: true, gzip: true}))
		.pipe(gulp.dest('app/styles'));
})

// @JavaScript parsers / helpers (ES2015 issues compiling)

gulp.task('jscompile', function() {
	var code =  gulp.src('dev/*.js')
		.pipe(babel())
		.pipe(gp.jshint())
		.pipe(gp.size())
		.pipe(gulp.dest('.temp'));
	return code;
})

gulp.task('js', ['jscompile'], function() {
	var bundled = browserify({ basedir : '.temp'});
	var code = bundled.add('./Main.js')
		.bundle()
		.on('error', function(err) { console.error(err); this.emit('end'); })
		.pipe(source('Build.js'))
		.pipe(buffer())
		.pipe(gp.jshint())
		//.pipe(gp.sourcemaps.init({loadMaps: true}))
		//.pipe(gp.uglify())
		//.pipe(gp.sourcemaps.write('.'))
		.pipe(gp.size({title: 'Production', showFiles: true, gzip: true}))
		.pipe(gulp.dest('app/scripts/'));
	return code;
})

// @End of gulpfile
