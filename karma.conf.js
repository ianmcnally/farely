// Karma configuration
// Generated on Fri Jul 24 2015 15:22:26 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({

  // base path that will be used to resolve all patterns (eg. files, exclude)
  basePath: './',


  // frameworks to use
  // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
  frameworks: ['jasmine', 'browserify'],


  // list of files / patterns to load in the browser
  files: [
    'node_modules/karma-babel-preprocessor/node_modules/babel-core/browser-polyfill.min.js',
    'node_modules/react/dist/react-with-addons.min.js',
    'src/**/*.js',
    'src/**/*.jsx'
  ],


  // list of files to exclude
  exclude: [],


  // preprocess matching files before serving them to the browser
  // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
  preprocessors: {
    'src/**/*.js': ['browserify'],
    'src/**/*.jsx': ['browserify']
  },

  // test results reporter to use
  // possible values: 'dots', 'progress'
  // available reporters: https://npmjs.org/browse/keyword/karma-reporter
  reporters: ['progress'],

  // web server port
  port: 9876,


  // enable / disable colors in the output (reporters and logs)
  colors: true,


  // level of logging
  // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
  logLevel: config.LOG_INFO,


  // enable / disable watching file and executing tests whenever any file changes
  autoWatch: true,


  // start these browsers
  // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
  browsers: ['PhantomJS'],


  // Continuous Integration mode
  // if true, Karma captures browsers, runs the tests and exits
  singleRun: false,

  browserify: {
    transform: [
      'babelify'
    ]
  }
  })
}
