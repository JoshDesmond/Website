"use strict";

const gulp = require('gulp');
const { src, dest, watch, task} = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
// const eslint = require('gulp-eslint');

//clean build directory
gulp.task('clean', function() {
    return gulp.src('build/*', {read: false}).pipe(clean());
});

gulp.task('concat', function() {
    return gulp.src('./www/js/**/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./build/'));
});

gulp.task('sourcemaps', function() {
    return gulp.src('www/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/'));
});