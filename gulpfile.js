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

//task to delete dist folder
gulp.task('clean', function(){
    return del(['dist']);
});

gulp.task('copyfonts', function(){
    //select src files to copy and pipe them to their destination
    gulp.src('./node_modules/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
    .pipe(gulp.dest('./dist/fonts'));
});

//minification task; takes html files looks up css and js and minifies/uglifies, concatenates and replaces them by using the concatenated files in the dist folder
gulp.task('usemin', function(){
    //take all .html files and feed them through the pipe
    return gulp.src('./*.html')
    //use flatmap to feed all files at the same time
    .pipe(flatmap(function(stream,file){
        //pipe all three files through usemin
        return stream
        .pipe(usemin({
            //makes css go through rev to get hash
            css: [rev()],
            //for html run it through htmlmin and remove whitespace
            html: [function() {
                return htmlmin({
                    collapseWhitespace:true
                })}],
            //uglify js and add revision hash
            js: [uglify(), rev()],
            //ugflify any inline js
            inlinejs: [uglify()],
            inlinecss: [cleanCss(), 'concat']
        }))
    }))
    .pipe(gulp.dest('dist/'));
});

//specify the build task; make sure the clean task is completed first by giving it as the second param in an array
gulp.task('build', gulp.series('clean', 'copyfonts', 'usemin'));