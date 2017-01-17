var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: ["**/*.*"],
        port: 8000
    });
});

gulp.task("css", function(){
    return gulp.src("app/css/**/*.css")
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task("html", function(){
    return gulp.src("app/**/*.html")
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task("watch", function(){
    gulp.watch("app/css/**/*.css", ["css"]);
    gulp.watch("app/**/*.html", ["html"]);
});

gulp.task("default", ["browserSync", "css", "watch"], function() {
    
});