// Load Gulp and your plugins
var gulp        = require('gulp'),
    connect     = require('gulp-connect'),
    stylus      = require('gulp-stylus'),
    path        = require('path'),
    fs          = require('fs'),
    args        = require('yargs').argv,
    template    = require('gulp-template'),
    rename      = require('gulp-rename'),
    doc      = require('./doc'),
    concat      = require('gulp-concat'),
    plumber     = require('gulp-plumber');

// Define paths
var paths = {
    hbs:    ['src/*.hbs', 'src/data/*.json'],
    js:     'src/assets/javascripts/**/*',
    stylus:     'src/assets/css/**/*',
    doc:     'src/data/**/*',
    images:     'src/assets/images/**/*',
};

// Connect task
gulp.task('connect', connect.server({
    root: __dirname + '/dist',
    port: 5000,
    livereload: true,
    open: true
}));

// HTML task
gulp.task('html', function () {
    gulp.src('./dist/*.html')
        .pipe(connect.reload());
});

// HTML task
gulp.task('images', function () {
    return gulp.src('./src/assets/images/**/*')
                .pipe(gulp.dest('./dist/assets/images/'));
});

// Generate static html from json
gulp.task('template', function () {

    
    var apidoc  = doc('./src/data');
    //console.log(apidoc);

    gulp.src('./src/index.hbs')
        .pipe(template({
            apidoc: apidoc
        }, {
            evaluate:    /\{\{(.+?)\}\}/g,
            interpolate: /\{\{=(.+?)\}\}/g,
            escape:      /\{\{-(.+?)\}\}/g
        }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./dist'));
});


// Concat JS
gulp.task('scripts', function() {
    gulp.src([
            './src/javascripts/jquery-1.10.2.min-21daab25.js',
            './src/javascripts/scrollspy.min-2f1c4f84.js'
        ])
        .pipe(concat('all.js', {newLine: ';'}))
        .pipe(gulp.dest('./dist/assets/js/'))
});

gulp.task('stylus', function() {
    gulp.src([
            './src/assets/css/style-api-v2-1d1c9364.css'
            
        ])
        .pipe(concat('stylus.css'))
        .pipe(gulp.dest('./dist/assets/css/'))
});

// Deploy to gh-pages
gulp.task('deploy', function () {

    var version = null;

    if (args.t != undefined) {
        version = args.t;
    }

    ghpages.publish(path.join(__dirname, '/dist/'), {
        add:     true,
        message: 'Deploy website',
        tag: version
    });
});

// Watch task
gulp.task('watch', function () {
    gulp.watch(paths.stylus, ['stylus']);
    gulp.watch(paths.hbs,    ['template', 'html']);
    gulp.watch(paths.doc,    ['template', 'html']);
    gulp.watch(paths.js,     ['scripts']);
    gulp.watch(paths.images,     ['images']);
});

// Set 'gulp server' for development
gulp.task('server', ['connect', 'stylus', 'watch']);