'use strict';

var gulp = require('gulp'),
    gutil = require("gulp-util"),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    del = require('rimraf'),   // for clean task
    WebpackDevServer = require("webpack-dev-server"),
    webpack = require('webpack'),
    webpackConfig = require("./webpack.config.js");



gulp.task("webpack:build", function(callback) {
    var myConfig = Object.create(webpackConfig);
    myConfig.plugins = myConfig.plugins.concat(
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );

    // run webpack
    webpack(myConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:build]", stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task("webpack:build-dev", function (callback) {
    webpackConfig.devtool = "sourcemap";
    webpackConfig.debug = true;
    var devCompiler = webpack(webpackConfig);
    devCompiler.run(function (err, stats) {
        if (err) throw new gutil.PluginError("webpack:build-dev", err);
        gutil.log("[webpack:build-dev]", stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task("webpack-dev-server", function (callback) {
    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = "eval";
    myConfig.debug = true;

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
        publicPath: "/target",
        stats: {
            colors: true
        }
    }).listen(9000, "localhost", function (err) {
            if (err) throw new gutil.PluginError("webpack-dev-server", err);
            gutil.log("[webpack-dev-server]", "http://localhost:9000/webpack-dev-server/target");
        });
});

gulp.task('clean', function (cb) {
    del(app.clean, cb);

});

gulp.task('html:build', function () {
    gulp.src(app.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(app.dist.html));
});

gulp.task('style:build', function () {
    gulp.src(app.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(app.dist.css));
});

gulp.task('js:build', function () {
    gulp.src(app.src.js)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(app.dist.js));
});

gulp.task('image:build', function () {
    gulp.src(app.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(app.dist.img));
});

gulp.task('fonts:build', function () {
    gulp.src(app.src.fonts)
        .pipe(gulp.dest(app.dist.fonts))
});

gulp.task('build', ['html:build']);

gulp.task('default', ['build', 'webpack:build-dev', 'webpack-dev-server']);


var app = {
    dist: {
        html: 'target/',
        js: 'target/js/',
        css: 'target/css/',
        img: 'target/img/',
        fonts: 'target/fonts/'
    },
    src: {
        html: 'src/main/webapp/app/pages/*.html',
        js: 'src/main/webapp/app/js/main.js',
        style: 'src/main/webapp/app/styles/main.scss',
        img: 'src/main/webapp/app/img/**/*.*',
        fonts: 'src/main/webapp/app/fonts/**/*.*'
    },
    watch: {
        html: 'app/**/*.html',
        js: 'app/**/*.js',
        style: 'app/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './target'
};
