// Requis
const gulp = require("gulp");

const sass = require("gulp-sass");

const browserSync = require("browser-sync").create();

const babel = require("gulp-babel");

const minify = require("gulp-babel-minify");

// var sourceSCSS = "app/scss/styles.scss";
// var destinationCSS = "app/css";

//compile scss into css
function style() {
  return gulp
    .src("./app/scss/**/*.scss") // ** any folder *file with extension.scss
    .pipe(sass())
    .pipe(gulp.dest("./app/css"))
    .pipe(browserSync.stream());
}

gulp.task("scripts", done => {
  gulp
    .src("./app/js/*.js")
    .pipe(babel())
    .pipe(gulp.dest("./dist"));
  done();
});

gulp.task("minify", () =>
  gulp
    .src("./app/js/**/*.js")
    .pipe(
      minify({
        mangle: {
          keepClassName: true
        }
      })
    )
    .pipe(gulp.dest("./dist"))
);

function style() {
  return gulp
    .src("./app/myjs/**/*.js") // ** any folder *file with extension.scss
    .pipe(sass())
    .pipe(gulp.dest("./app/js"))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./app"
    }
  });
  gulp.watch("./app/scss/**/*.scss", style);
  gulp.watch("./app/*.html").on("change", browserSync.reload);
  gulp.watch("./app/js/**/*.js").on("change", browserSync.reload);
}

exports.style = style;
exports.watch = watch;
