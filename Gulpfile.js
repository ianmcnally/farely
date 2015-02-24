var gulp = require('gulp');
var browserify = require('browserify');
var connect = require('gulp-connect');
var babelify = require('babelify');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');

gulp.task('compile', ['index.html'], function(){
  browserify('./src/app.jsx')
    .transform(babelify)
    .bundle()
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

gulp.task('watch', function(){
  gulp.watch(['src/**/*.js*'], ['compile']);
  gulp.watch(['src/**/*.html*'], ['index.html']);
});

gulp.task('default', ['compile', 'connect', 'watch']);