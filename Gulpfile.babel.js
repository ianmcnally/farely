/*eslint-disable no-console */

import App from './src/app.jsx'
import autoprefixer from 'autoprefixer'
import babelify from 'babelify'
import browserify from 'browserify'
import buffer from 'vinyl-buffer'
import chalk from 'chalk'
import csswring from 'csswring'
import confirm from 'gulp-confirm'
import connect from 'gulp-connect'
import eslint from 'gulp-eslint'
import fs from 'fs'
import gulp from 'gulp'
import gzip from 'gulp-gzip'
import jscs from 'gulp-jscs'
import { Server } from 'karma'
import { join } from 'path'
import precss from 'precss'
import postcss from 'gulp-postcss'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import rename from 'gulp-rename'
import replace from 'gulp-replace'
import source from 'vinyl-source-stream'
import s3 from 'gulp-s3'
import uglify from 'gulp-uglify'

const karmaConfig = join(__dirname, 'karma.conf.js')

gulp.task('compile', ['copy:icons', 'copy:normalize', 'index.html', 'copy:manifest', 'javascript', 'style'])

gulp.task('connect', () => {
  connect.server({
    root : 'dist',
    livereload : true
  })
})

gulp.task('copy:icons', () => {
  gulp.src('src/icons/*')
    .pipe(gulp.dest('dist/'))
})

gulp.task('copy:manifest', () => {
  gulp.src('src/manifest-template')
    .pipe(replace(/:revision-date/, new Date().getTime()))
    .pipe(rename('cache.manifest'))
    .pipe(gulp.dest('dist/'))
})

gulp.task('copy:normalize', () => {
  gulp.src('node_modules/normalize.css/normalize.css')
    .pipe(gulp.dest('dist/stylesheets/'))
})

gulp.task('index.html', () => {
  gulp.src('src/layout.html')
    .pipe(rename('index.html'))
    // replace the <!-- main --> comment in index.html with rendered App component
    .pipe(replace('<!-- main -->', renderToString(createElement(App))))
    .pipe(gulp.dest('dist'))
})

gulp.task('javascript', ['index.html'], () => {
  browserify('./src/app.jsx')
    .transform(babelify)
    .bundle()
    .on('error', (err) => {
      console.log(chalk.bold.red(err))
    })
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./dist/javascript'))
})

gulp.task('karma:single', (done) => {
  new Server({
    configFile : karmaConfig,
    singleRun : true
  }, done).start()
})

gulp.task('style', () => {
  const processors = [
    autoprefixer({ browsers : ['last 2 versions'], cascade : false }),
    precss,
    csswring()
  ]

  gulp.src('src/main.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('dist/stylesheets'))
})

gulp.task('watch', () => {
  gulp.watch(['src/**/*.js*'], ['compile', 'lint', 'test'])
  gulp.watch(['src/**/*.html*'], ['index.html', 'copy:manifest'])
  gulp.watch(['src/**/*.css'], ['style', 'copy:manifest'])
})

gulp.task('compress:js', () => {
  gulp.src('dist/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
})

gulp.task('deploy', ['compress:js'], () => {
  const configPath = 'farely-aws.json'
  if (!fs.existsSync(configPath)) {
    return console.log(chalk.bold.red(`${configPath} not found.`))
  }
  gulp.src('./dist/**')
    .pipe(confirm({
      question : 'You\'re sure you want to release? (y/n)',
      input : '_key:y' // Proceed only if 'y' is entered
    }))
    .pipe(gzip())
    .pipe(s3(JSON.parse(fs.readFileSync(configPath)), {
      uploadPath : '/',
      headers : {
        'x-amz-acl' : 'public-read'
      }
    }))
})

gulp.task('default', ['compile', 'connect', 'lint', 'test', 'watch'])

gulp.task('lint', () => {
  gulp.src(['src/**/*.{js,jsx}', '!node_modules/**'])
    .pipe(jscs())
    .pipe(jscs.reporter())
    .pipe(jscs.reporter('fail'))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('test', ['lint', 'karma:single'])

/*eslint-enable no-console */
