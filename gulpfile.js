var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

gulp.task('browserSync', function() {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: ["**/*.*"],
        port: 8000
    });
});

gulp.task("css", function() {
    return gulp.src("app/css/**/*.css")
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task("html", function() {
    return gulp.src("app/**/*.html")
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task("watch", function() {
    gulp.watch("app/css/**/*.css", ["css"]);
    gulp.watch("app/**/*.html", ["html"]);
});

gulp.task("default", ["browserSync", "css", "watch"], function() {

});

gulp.task('hello', function() {
    console.log('Hello Zell');
});

// A real task takes in two additional gulp methods, gulp.src and gulp.dest
gulp.task('sass', function() {
    return gulp.src('app/scss/style.scss') // What files to use
    .pipe(sass()) // Sends file through plugin
    .pipe(gulp.dest('app/css')) // Where to output the files
});