/**
 * Created by Ben on 29.05.2016.
 */
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
    sourcemaps = require('gulp-sourcemaps'),
    less = require('gulp-less'),
    del = require('del');

gulp.task('styles', function () {
    gulp.src('app/less/**/*.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('build/assets/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssnano())
        .pipe(gulp.dest('build/assets/css'))
        .pipe(livereload());
});


gulp.task('scripts', function() {
    return gulp.src('app/js/**/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('build/assets/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('build/assets/js'));
});

gulp.task('html', function() {
    return gulp.src('app/*html')
        .pipe(gulp.dest('build'));
});

gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('build/assets/img'))
        .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('clean', function() {
    return del(['build']);
});


gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'html'); // ,'images'  no images yet
});

// Watch
gulp.task('watch', function() {
    // Create LiveReload server
    livereload.listen();

    // Watch .less files
    gulp.watch('app/less/**/*.less', ['styles']);
    gulp.watch('app/js/**/*.js', ['scripts']);
    //gulp.watch('app/images/**/*', ['images']);
    gulp.watch('app/*.html', ['html']);

    // Watch any files in build/, reload on change
    gulp.watch(['build/**']).on('change', livereload.changed);
});