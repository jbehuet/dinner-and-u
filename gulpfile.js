var source = require('vinyl-source-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var browserify = require('browserify');
var watchify = require('watchify');
var notify = require("gulp-notify");
var uglify = require("gulp-uglify");
var livereload = require('gulp-livereload');
var babelify = require('babelify');
var vueify = require('vueify');
var nodemon = require('gulp-nodemon');
var CC = gutil.colors;

var PATHS = gulp.adminfacilPaths = {
    dist: 'app/',
    dist: 'public/',
    static: 'client/static/'
};

function handleErrors() {
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: "Compile Error",
        message: "<%= error.message %>"
    }).apply(this, args);
    this.emit('end'); // Keep gulp from hanging on this task
}

gulp.task('frontend-js-app', function () {
    var b = browserify('./client/js/app.js', {
        debug: true, // sourcemaps
        extensions: ['.js', '.vue'],
        cache: {}, // required by watchify
        packageCache: {}, // ditto
        fullPaths: true // ditto
    }).transform(vueify).transform(babelify, {
        presets: ["es2015"]
    });

    // Well, we can build our fantastically complete watchify pipeline now
    var bundler = watchify(b);
    bundler.on('update', function () {
        gutil.log(CC.cyan.bold("*** file change triggers app bundling"));
        rebundle(); //.pipe(livereload());
    });

    bundler.on('time', function (time) {
        gutil.log(CC.cyan.bold("*** app bundling done in ") + CC.magenta(time + " ms"));
    });

    bundler.on('bytes', function (bytes) {
        var kb = Math.round(bytes / 1024);
        if (bytes >= 1049000) { // 1 Mebibyte
            gutil.log(
                CC.cyan.bold("*** app bundle size is ") +
                CC.red.inverse(kb + " kb") +
                CC.red(" . Please check you didn't include something fat by mistake.")
            );
        } else {
            gutil.log(CC.cyan.bold("*** app bundle size: ") + CC.magenta(kb + "kb"));
        }
    });

    function rebundle() {
        return bundler.bundle()
            .on('error', handleErrors)
            .pipe(source('js/app.bundle.js'))
            .pipe(gulp.dest(PATHS['dist']));
    }

    return rebundle();
});


gulp.task('minify', ['frontend-js-app'], function () {
    return gulp.src(PATHS['dist'] + '/js/app.bundle.js')
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest(PATHS['dist'] + '/js/'));
})

gulp.task('minify-only', function () {
    return gulp.src(PATHS['dist'] + '/js/app.bundle.js')
        //.pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest(PATHS['dist'] + '/js/'))
        .pipe(livereload());
})

gulp.task('dev', ['frontend-static-all', 'minify'], function (next) {

    livereload.listen();

    nodemon({
        // the script to run the app
        script: 'server.js',
        ext: 'js'
    }).on('restart', function () {
        // when the app has restarted, run livereload.
        gulp.src(PATHS['app'])
            .pipe(livereload())
            .pipe(notify('Reloading page, please wait...'));
    });

    gutil.log(CC.yellow.bold("*** WATCHING FILES ***"));
    // Watch for static frontend changes
    gulp.watch(PATHS['static'] + '**/*', ['frontend-static-all']);
    gulp.watch(PATHS['dist'] + '/js/app.bundle.js', ['minify-only']);
});


gulp.task('frontend-static-all', function () {
    // Pipe anything that is not HTML directly
    return gulp.src(PATHS['static'] + "**/*")
        .pipe(gulp.dest(PATHS['dist']))
        .pipe(livereload());
});

gulp.task('clean', function (cb) {
    require('del')([PATHS['dist'] + '/**/*'], {
        force: true
    }, cb);
});


gulp.task('build', ['clean', 'frontend-static-all', 'frontend-js-app', 'minify']);
