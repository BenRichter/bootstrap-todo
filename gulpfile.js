/**
 * Created by Ben on 29.05.2016.
 */
"use strict";

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),  //
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    sourcemaps = require('gulp-sourcemaps'),
    less = require('gulp-less'),
    del = require('del');

gulp.task('styles', function () {
    gulp.src('app/less/**/*.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('app/build/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssnano())
        .pipe(gulp.dest('app/build/css'))
        .pipe(livereload());
});


gulp.task('scripts', function() {
    return gulp.src('app/js/**/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('app/build/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('app/build/js'));
});

gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('app/build/img'));
});

gulp.task('clean', function() {
    return del(['app/build']);
});


gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts'); // ,'images'  no images yet
});

// Watch
gulp.task('watch', function() {
    // Create LiveReload server
    livereload.listen();

    // Watch .less files
    gulp.watch('app/less/**/*.less', ['styles']);
    gulp.watch('app/js/**/*.js', ['scripts']);
    //gulp.watch('app/images/**/*', ['images']);

    // Watch any files in app/, reload on change
    gulp.watch(['app/build/**', 'app/*.html']).on('change', livereload.changed);
});