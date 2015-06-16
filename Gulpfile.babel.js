import harmonize from 'harmonize';
harmonize();

import App from './src/app.jsx';
import autoprefixer from 'gulp-autoprefixer';
import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import chalk from 'chalk';
import confirm from 'gulp-confirm';
import connect from 'gulp-connect';
import fs from 'fs';
import gulp from 'gulp';
import gzip from 'gulp-gzip';
import jest from 'gulp-jest';
import minifyCSS from 'gulp-minify-css';
import React from 'react';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import sass from 'gulp-sass';
import source from 'vinyl-source-stream';
import s3 from 'gulp-s3';
import uglify from 'gulp-uglify';


gulp.task('compile', ['copy:icons', 'copy:normalize', 'index.html', 'copy:manifest', 'javascript', 'style']);

gulp.task('connect', () => {
  connect.server({
    root : 'dist',
    livereload : true
  });
});

gulp.task('copy:icons', () => {
  gulp.src('src/icons/*')
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy:manifest', () => {
  gulp.src('src/manifest-template')
    .pipe(replace(/:revision-date/, new Date().getTime()))
    .pipe(rename('cache.manifest'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy:normalize', () => {
  gulp.src('node_modules/normalize.css/normalize.css')
    .pipe(gulp.dest('dist/stylesheets/'));
});

gulp.task('index.html', () => {
  gulp.src('src/layout.html')
    .pipe(rename('index.html'))
    // replace the <!-- main --> comment in index.html with rendered App component
    .pipe(replace('<!-- main -->', React.renderToString(React.createElement(App))))
    .pipe(gulp.dest('dist'));
});

gulp.task('javascript', ['index.html'], () => {
  browserify('./src/app.jsx')
    .transform(babelify)
    .bundle()
    .on('error', (err) => {
      console.log(chalk.bold.red(err));
    })
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./dist/javascript'));
});

gulp.task('jest', () => {
  gulp.src('') // bug in gulp-jest: https://github.com/Dakuan/gulp-jest/pull/5
    .pipe(jest({
      rootDir : './src',
      scriptPreprocessor : '../node_modules/babel-jest',
      testFileExtensions : ['es6', 'js'],
      moduleFileExtensions : ['js', 'json', 'es6'],
      unmockedModulePathPatterns : ['./node_modules/react']
    }));
});

gulp.task('style', () => {
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

gulp.task('watch', () => {
  gulp.watch(['src/**/*.js*'], ['compile']);
  gulp.watch(['src/**/*.html*'], ['index.html', 'copy:manifest']);
  gulp.watch(['src/**/*.scss'], ['style', 'copy:manifest']);
});

gulp.task('compress:js', () => {
  gulp.src('dist/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('compress:css', () => {
  gulp.src('dist/**/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist'));
});

gulp.task('deploy', ['compress:js', 'compress:css'], () => {
  let configPath = 'farely-aws.json';
  if (!fs.existsSync(configPath)) {
    return console.log(chalk.bold.red(configPath + ' not found.'));
  }
  gulp.src('./dist/**')
    .pipe(confirm({
      question: 'You\'re sure you want to release? (y/n)',
      input: '_key:y' // Proceed only if 'y' is entered
    }))
    .pipe(gzip())
    .pipe(s3(JSON.parse(fs.readFileSync(configPath)), {
      uploadPath: '/',
      headers : {
        'x-amz-acl': 'public-read'
      }
    }));
});

gulp.task('default', ['compile', 'connect', 'watch']);

gulp.task('test', ['jest']);