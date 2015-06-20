/**
 *
 * @authors Your Name (you@example.org)
 * @date    2015-04-09 23:30:20
 * @version $Id$
 */
var distFileName = "dist";

var gulp = require('gulp');
var pngquant = require('imagemin-pngquant');
var imagemin = require('gulp-imagemin');
var minifyCSS = require('gulp-minify-css'); //css压缩
var jshint = require('gulp-jshint'); //js检查
var uglify = require('gulp-uglify'); //js压缩
var clean = require('gulp-clean');
var htmlmin = require('gulp-htmlmin');
//var rename = require('gulp-rename');
var cache = require('gulp-cache');
var browserSync = require('browser-sync');




gulp.task('live', function() {
    browserSync({
        files: "**",
        server: {
            baseDir: "./"
        }
    }); 
});


gulp.task('htmlMin', function() {
    return gulp.src(['src/*.html'], {
            base: 'src'
        })
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(distFileName));
});


gulp.task('imageMin', function() {
    return gulp.src(['src/img/**/*', 'webapp/wxshu/img/**/*'], {
            base: 'src'
        })
        .pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        })))
        .pipe(gulp.dest(distFileName));
});

gulp.task('cssMin', function() {
    return gulp.src(['src/css/*.css'], {
            base: 'src'
        })
        .pipe(minifyCSS({
            keepBreaks: true
        }))
        .pipe(gulp.dest(distFileName));
});


gulp.task('clean', function() {
    return gulp.src(distFileName, {
            read: false
        })
        .pipe(clean());
});

gulp.task('jsMin', function() {
    return gulp.src(['src/js/**/*.js'], {
            base: 'src'
        })
        .pipe(uglify())
        .pipe(gulp.dest(distFileName));
});

gulp.task('copy', function() {
    return gulp.src(['src/**/*'])
        .pipe(gulp.dest(distFileName));

});



gulp.task('default', ['clean'], function() {
    gulp.start('min');
});


gulp.task('min', ['copy'], function() {
    gulp.start('jsMin', 'cssMin', 'htmlMin', 'imageMin');
});