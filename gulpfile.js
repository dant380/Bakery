
let project_folder="dist";
let source_folder="src";

let path={
    build: {
        html: project_folder+"/",
        css: project_folder+"/css/",
        js: project_folder+"/js/",
    },
    src: {
        html: [source_folder+"/*.html", "!" + source_folder + "/_*.html"],
        css: source_folder+"/scss/style.scss",
        js: source_folder+"/js/script.js",
    },
    watch: {
        html: source_folder+"/**/*.html",
        css: source_folder+"/scss/**/*.scss",
    },
    clean: "./" + project_folder + "/"
}

let { src, dest } = require('gulp'),
    gulp = require('gulp'),
    browsersync = require ("browser-sync").create();
    fileinclude = require("gulp-file-include");
    scss = require("gulp-sass");
    stylelint = require("stylelint")

    function browserSync(params) {
        browsersync.init({
            server: {
                baseDir: "./" + project_folder + "/"
            },
            port: 3000,
            notify: false
    })
}
function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function css() {
    return src(path.src.css)
    .pipe(
        scss({
            outputStyle: "expanded"
        })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}

function watchFiles(params) {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
}


let build = gulp.series(gulp.parallel(css, html));
let watch=gulp.parallel(build, watchFiles, browserSync);

exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;