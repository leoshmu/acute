basePath = '../app/';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  // 'css/*.*',
  'lib/jquery-1.9.1.min.js',
  'lib/underscore-min.js',
  'lib/angular/angular.js',
  'lib/angular/angular-*.js',
  '../test/lib/angular/angular-mocks.js',
  'js/**/*.js',
  '../test/unit/**/*.js',
  'partials/*.html'
];

// add partials to templateCache
preprocessors = {
  'partials/*.html':'html2js'
}

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};
