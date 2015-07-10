'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    useref = require('gulp-useref'),
    minifyHtml = require('gulp-minify-html'),
    minifyCss = require('gulp-minify-css'),
    ngAnnotate = require('gulp-ng-annotate'),
    sourcemaps = require('gulp-sourcemaps'),
    rev = require('gulp-rev'),
    revReplace = require('gulp-rev-replace'),
    del = require('del'),
    noop = require('gulp-util').noop,
    ngHtml2Js = require("gulp-ng-html2js"),
    watch = require('gulp-watch');

var debug = true;

gulp.task('jshint', function () {
    return gulp.src(['src/app/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('clean', function (callback) {
    return del(['dist'], callback);
});

gulp.task("revision", ['css', 'js-app', 'js-libs', 'html-templates'], function () {
	return gulp.src(['dist/**/*.css', 'dist/**/*.js'])
        .pipe(rev())
        .pipe(gulp.dest('dist'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist'));
});

gulp.task("revreplace", ["revision"], function(){
    var manifest = gulp.src("./dist/rev-manifest.json");

    return gulp.src("dist/index.html")
        .pipe(revReplace({manifest: manifest}))
        .pipe(gulp.dest('dist'));
});

var path = {
    build: {
        html: 'dist/',
        js: 'dist/js/',
        css: 'dist/css/',
        img: 'dist/img/',
        fonts: 'dist/fonts/',
        config: 'dist/'
    },
    src: {
        html: ['src/app/**/*.html', '!src/app/index.html'],
        html_index:'src/app/index.html',
        js: ['src/app/**/*.module.js', 'src/app/**/*.js', 'src/scripts/**/*.js', '!src/app/configParams*.js'],
        config: ['src/app/configParams*.js'],
        style: 'src/content/less/main.less',
        img: 'src/content/img/**/*.*',
        fonts: 'src/content/fonts/**/*.*'
    },
    watch: {
        html: ['src/app/**/*.html', '!src/app/index.html'],
        js: ['src/app/**/*.js', 'src/scripts/**/*.js'],
        html_index:'src/app/index.html',
        style: 'src/content/less/**/*.less',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    }
};

gulp.task('libs', function () {
    var assets = useref.assets();
    return gulp.src(path.src.html_index)
        .pipe(assets)
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest(path.build.html));
});

gulp.task('js-app', ['copyConfigs'], function () {
    return gulp.src(path.src.js)
        .pipe(sourcemaps.init())
        .pipe(ngAnnotate())
        //.pipe(uglify())
        .pipe(concat('app-bundle.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js));
});

gulp.task('copyConfigs', function () {
    return gulp.src(path.src.config)
        .pipe(gulp.dest(path.build.config));
});

gulp.task('html-templates', function () {
    return gulp.src(path.src.html)
        .pipe(minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(ngHtml2Js({
            moduleName: "partials"
        }))
        .pipe(concat("partials.min.js"))
        //.pipe(uglify())
        .pipe(gulp.dest(path.build.js));
});

gulp.task('images', function () {
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img));
});
gulp.task('fonts', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});

gulp.task('watch',['build-dev'], function(){

    watch(path.watch.js, function(event, cb) {
        gulp.start('js-app');
    });
    watch([path.watch.html_index], function(event, cb) {
        gulp.start('libs');
    });
    watch([path.watch.html_index_test], function(event, cb) {
        gulp.start('move-index-test');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('images');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts');
    });
    watch(path.watch.html, function(event, cb) {
        gulp.start('html-templates');
    });
    //watch([path.watch.style], function(event, cb) {
        //gulp.start('less-build');
    //});
});

gulp.task('build-dev', ['libs', 'js-app', 'html-templates', 'images', 'fonts']);

gulp.task('default', ['build-dev']);