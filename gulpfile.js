//Jekyll requirements
var gulp = require('gulp'),
    shell = require('gulp-shell');
//Html requirements    
var minifyHTML = require('gulp-minify-html');
//CSS requirements
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    importCss = require('gulp-import-css'),
    autoprefixer = require('gulp-autoprefixer'),
    uncss = require('gulp-uncss'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    glob = require('glob');
//SEO
var request = require('request');
//Additional
var gutil = require('gulp-util'),
    plumber = require('gulp-plumber'),
    //minifyCSS = require('gulp-clean-css'),
    prefixer = require('gulp-autoprefixer'),
    connect = require('gulp-connect');
    cp = require('child_process');
    replace = require('gulp-replace');
var fs = require('fs');
    download = require('gulp-download');
    runSequence = require('run-sequence');
    files = ['_site/**/*.html']

//JEKYLL
gulp.task('jekyll', function() {
  return gulp.src('_pages/index.html', { read: false })
    .pipe(shell([
      'bundle exec jekyll build'
  ]));
});

gulp.task('jekyll-serve', function() {
  return gulp.src('_pages/index.html', { read: false })
    .pipe(shell([
      'bundle exec jekyll build --incremental --config _config.yml,_config.dev.yml'
  ]));
});

//HTML
gulp.task('html', function() {
    return gulp.src('_site/index.html')
        .pipe(minifyHTML({
            quotes: true
        }))
        .pipe(gulp.dest('_site/'));
});

//CSS
gulp.task('css', function() {
   return gulp.src('_site/css/style.css')
       .pipe(autoprefixer('last 5 versions','> 5%','ie > 6', 'Edge'))
       .pipe(uncss({
           html: ['_site/*.html', '_site/**/**/*.html', '_site/**/**/**/*.html', '_site/archive/**/*.html', '_site/archive/**/**/*.html', '_site/archive/categories/**/*.html', '_site/archive/categories/tags/*.html'],
           ignore: [
               'label.active', 
               '.dark-mode', 
               'span.tweet-time',
               /(#|\.)(is-)/,
               /(#|\.)(has-)/,
               /(#|\.)(js-)/,
               /\.opaque/, 
               /\.affix/,
                /\.alert/,
                /\.alert-dismissable/,
                /\.alert-link/,
                /\.close/,
                /\.collapse/,
                /\.fade/,
                /\.modal/,
                /\.typed-cursor/,
          ]
       }))
       .pipe(minifyCss({keepBreaks:false}))
       .pipe(rename('un.style.css'))
       .pipe(gulp.dest('_site/css/'));
});

//Google Analytics
gulp.task('analytics', function() {
  return download('https://www.google-analytics.com/analytics.js')
    .pipe(gulp.dest('assets/'));
});

//Facebook Analytics
gulp.task('fb-analytics', function() {
  return download('https://connect.facebook.net/en_US/sdk.js')
    .pipe(gulp.dest('assets/'));
});

//jQuery
gulp.task('jquery', function() {
  return download('https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js')
    .pipe(gulp.dest('_assets/js'));
});

//Development Deploy
// Setup Server
gulp.task('server', () => {
  connect.server({
    root: ['_site'],
    port: 4000
  });
})

// Watch files
gulp.task('watch', () => {  
  gulp.watch('css');
  gulp.watch('jekyll-serve');
});

gulp.task('local', function(callback) {
    runSequence(
        'jekyll-serve',
        'css',
        'server',
        'watch',
        callback
    );
});

//Production Deploy
gulp.task('produce', function(callback) {
    runSequence(
        'jquery',
        'analytics',
        'fb-analytics',
        'jekyll',
        'css',
        callback
    );
});

gulp.task('seo', ['produce'], function(cb) {
    request('http://www.google.com/webmasters/tools/ping?sitemap=https://www.krvmedia.com/sitemap.xml');
    request('http://www.bing.com/webmaster/ping.aspx?siteMap=https://www.krvmedia.com/sitemap.xml');
    cb();
});


