require('harmonize')();

var gulp = require('gulp');
var browserify = require('browserify');
var connect = require('gulp-connect');
var babelify = require('babelify');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var jest = require('gulp-jest');
var chalk = require('chalk');

gulp.task('compile', ['index.html'], function(){
  browserify('./src/app.jsx')
    .transform(babelify)
    .bundle()
    .on('error', function(err){
      console.log(chalk.bold.red(err));
    })
    .pipe(source('main.js'))
    .pipe(gulp.dest('./dist/javascript'));
});

gulp.task('connect', function(){
  connect.server({
    root : 'dist',
    livereload : true
  });
});

gulp.task('index.html', function(){
  gulp.src('src/layout.html')
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist'))
})

gulp.task('jest', function(){
  gulp.src('src/**/*-test.js')
    .pipe(jest({
      rootDir : 'src',
      scriptPreprocessor : '../node_modules/babel-jest',
      testFileExtensions : ['es6', 'js'],
      moduleFileExtensions : ['js', 'json', 'es6'],
      unmockedModulePathPatterns : ['./node_modules/react']
    }));
});

gulp.task('watch', function(){
  gulp.watch(['src/**/*.js*'], ['compile']);
  gulp.watch(['src/**/*.html*'], ['index.html']);
});

gulp.task('default', ['compile', 'connect', 'watch']);

gulp.task('test', ['jest']);