require('harmonize')();

var autoprefixer = require('gulp-autoprefixer');
var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var chalk = require('chalk');
var connect = require('gulp-connect');
var gulp = require('gulp');
var jest = require('gulp-jest');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');

gulp.task('compile', ['copy:icons', 'copy:normalize', 'index.html', 'copy:manifest', 'javascript', 'style']);

gulp.task('connect', function(){
  connect.server({
    root : 'dist',
    livereload : true
  });
});

gulp.task('copy:icons', function(){
  gulp.src('src/icons/*')
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy:manifest', function(){
  gulp.src('src/manifest-template')
    .pipe(replace(/:revision-date/, new Date().getTime()))
    .pipe(rename('cache.manifest'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy:normalize', function(){
  gulp.src('node_modules/normalize.css/normalize.css')
    .pipe(gulp.dest('dist/stylesheets/'));
});

gulp.task('index.html', function(){
  gulp.src('src/layout.html')
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist'));
});

gulp.task('javascript', ['index.html'], function(){
  browserify('./src/app.jsx')
    .transform(babelify)
    .bundle()
    .on('error', function(err){
      console.log(chalk.bold.red(err));
    })
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/javascript'));
});

gulp.task('jest', function(){
  gulp.src('') // bug in gulp-jest: https://github.com/Dakuan/gulp-jest/pull/5
    .pipe(jest({
      rootDir : './src',
      scriptPreprocessor : '../node_modules/babel-jest',
      testFileExtensions : ['es6', 'js'],
      moduleFileExtensions : ['js', 'json', 'es6'],
      unmockedModulePathPatterns : ['./node_modules/react']
    }));
});

gulp.task('style', function(){
  gulp.src('src/main.scss')
    .pipe(sass({
      errLogToConsole : true
    }))
    .pipe(autoprefixer({
      browsers : ['last 2 versions'],
      cascade : false
    }))
    .pipe(gulp.dest('dist/stylesheets'));
});

gulp.task('watch', function(){
  gulp.watch(['src/**/*.js*'], ['compile']);
  gulp.watch(['src/**/*.html*'], ['index.html', 'copy:manifest']);
  gulp.watch(['src/**/*.scss'], ['style', 'copy:manifest']);
});

gulp.task('default', ['compile', 'connect', 'watch']);

gulp.task('test', ['jest']);