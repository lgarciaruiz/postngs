'use strict';

//include all the gulp plugins using require
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cleanCss = require('gulp-clean-css'),
    flatmap = require('gulp-flatmap'),
    htmlmin = require('gulp-htmlmin');

/**   DEV TASKS BELOW    **/

//compile sass files to css
gulp.task('sass', function(){
    return gulp.src('./css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

//wath scss files for changes and run sass compile task
gulp.task('watch:sass', function(){
    gulp.watch('css/*.scss',gulp.series('sass'));
});

//sync browser
gulp.task('browser-sync', function(){
    var files = [
        './*.html',
        './css/*.css',
        './js/*.js',
        './img/*.{png,jpg,gif}'
    ];

    browserSync.init(files, {
        server: {
            baseDir: './'
        }
    });
});

gulp.task('default', gulp.parallel('browser-sync','watch:sass'));


/**   BUILD TASKS BELOW    **/

//clean dist folder before build
gulp.task('clean', function(){
    return del(['dist']);
});