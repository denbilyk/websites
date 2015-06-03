'use strict';

require('harmonize')();
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
    replace = require('gulp-replace'),
    pngquant = require('imagemin-pngquant'),
    del = require('rimraf'),   // for clean task
    eslint = require('gulp-eslint'),
    jest = require('jest-cli'),
    WebpackDevServer = require("webpack-dev-server"),
    webpack = require('webpack'),
    webpackConfigFunc = require("./webpack.config.js"),
    karma = require('karma').server;

gulp.task("webpack:build", function (callback) {
    var myConfig = Object.create(webpackConfigFunc(prodProps));
    myConfig.plugins = myConfig.plugins.concat(
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin()
        //new webpack.optimize.UglifyJsPlugin()
    );
    webpack(myConfig, function (err, stats) {
        processHtml(err, stats, "webpack:build");
        callback();
    });
});

gulp.task("webpack:build-dev", function (callback) {
    var webpackConfig = Object.create(webpackConfigFunc(devProps));
    webpackConfig.devtool = "source-map";
    webpackConfig.debug = true;
    var devCompiler = webpack(webpackConfig);
    devCompiler.run(function (err, stats) {
        processHtml(err, stats, "webpack:build-dev");
        callback();
    });
})
;
function processHtml(err, stats, processName) {
    if (err) throw new gutil.PluginError(processName, err);
    gutil.log("[" + processName + "]", stats.toString({
        colors: true
    }));
    if (err) throw new gutil.PluginError(processName, err);
    var json = stats.toJson();
    if (json.errors.length > 0)
        throw new gutil.PluginError(processName, json.errors);
    if (json.warnings.length > 0)
        throw new gutil.PluginError(processName, json.warnings);
    gulp.src(app.src.path + '/pages/index.html')
        .pipe(rigger())
        .pipe(replace(/css\/style\.css/g, chunkName(json, 'app', '.css')))
        .pipe(replace(/js\/app\.js/g, chunkName(json, 'app', '.js')))
        .pipe(gulp.dest(app.dist.html));
}

var chunkName = function (json, name, ext) {
    var chunk = json.assetsByChunkName[name];
    if (Array.isArray(chunk)) {
        chunk = chunk.filter(function (filename) {
            return app.extname(filename).toLowerCase() === ext
        }).shift();
    }
    return chunk;
};


gulp.task("webpack-dev-server", function (callback) {
    var myConfig = Object.create(webpackConfigFunc(devProps));
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

gulp.task("lint", function () {
    return gulp.src([app.src.path + '/**/*.jsx'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});
gulp.task('test', function () {
    jest.runCLI({config: jestConfig}, ".", function () {
        console.log('done');
    });
});


gulp.task('test:karma', function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
});

gulp.task('tdd', function (done) {
    gulp.watch([jestConfig.rootDir + "/**/*.js"], ['test']);
});

gulp.task('webpack', ['webpack:build-dev', 'webpack-dev-server']);

gulp.task('default', ["test"]);


var devProps = {
    cache: true,
    context_path: "./src/main/webapp/app",
    target_dir: "target",
    bundle_filename: "app.js",
    chunk_filename: "[chunkname].js",
    extract_text_name: "style.css"

};

var prodProps = {
    cache: false,
    context_path: "./src/main/webapp/app",
    target_dir: "target",
    bundle_filename: "[hash].js",
    chunk_filename: "[chunkhash].js",
    extract_text_name: "[contenthash].css"

};

var jestConfig = {
    rootDir: 'src/main/webapp',
    "scriptPreprocessor": "preprocessor.js",
    "unmockedModulePathPatterns": ["node_modules/react"]
};

var app = {
    dist: {
        html: 'target/',
        js: 'target/js/',
        css: 'target/css/',
        img: 'target/img/',
        fonts: 'target/fonts/'
    },
    src: {
        path: 'src/main/webapp/app',
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
    clean: './target',

    extname: function (filename) {
        return "." + filename.split('.')[1];
    }
};
