var gulp = require('gulp');
    concat = require('gulp-concat');
    sass = require('gulp-sass')(require('sass'))
    autoprefixer = require('gulp-autoprefixer');
    pug = require('gulp-pug');
    livereload = require('gulp-livereload');
    sourcemaps = require('gulp-sourcemaps');
    minify = require('gulp-minify');

    //html task
gulp.task('html', function () {
    return gulp.src('project/html/*.pug')
            .pipe(pug({
                pretty: true
            }))
            .pipe(gulp.dest('dist'))
            .pipe(livereload())
    
});

// css task
gulp.task('css', function () {
    return gulp.src(['project/css/**/*.css', 'project/css/**/*.scss'])
            .pipe(sourcemaps.init())
            .pipe(sass({outputstyle: 'compressed'}).on('error', sass.logError))
            .pipe(autoprefixer())
            .pipe(concat('main.css'))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('dist/css'))
            .pipe(livereload())
    
})

// JS task
gulp.task('js', function () {
    return gulp.src('project/js/*.js')       
            .pipe(concat('main.js'))
            .pipe(minify())
            .pipe(gulp.dest('dist/js'))
            .pipe(livereload())
    
})


// watch task
gulp.task('watch', function () {
    require('./server.js');
    livereload.listen();
    gulp.watch("project/html/**/*.pug",  gulp.series('html'));
    gulp.watch(["project/css/**/*.css", "project/css/**/*.scss"],  gulp.series('css'));
    gulp.watch("project/js/*.js",  gulp.series('js'));
});
