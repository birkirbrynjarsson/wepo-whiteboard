var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

/*
    GULP TASKS
*/

// BrowserSync settings
gulp.task('browserSync', function() {
    browserSync.init(null, {
        server: {
            baseDir: 'app'
        }
    });
});

// A real task takes in two additional gulp methods, gulp.src and gulp.dest
gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss') // What files to use
        .pipe(sass()) // Sends file through plugin // using gulp-sass
        .pipe(gulp.dest('app/css')); // Where to output the files
});

/*
    GULP WATCH
    Watches files, executes tasks on changes
*/

gulp.task('watch', function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/css/**/*.css', browserSync.reload);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload); 
});

/*
    SERVER TASK
    Default task to serve up a server and start watching files for changes
*/

gulp.task('serve', ['browserSync', 'sass', 'watch'], function() {

});