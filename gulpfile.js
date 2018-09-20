var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    watch('./dist/index.html', ()=>{ 
        browserSync.reload();
     });

    watch('./dist/css/style.css',()=>{
        browserSync.reload();
     });
});