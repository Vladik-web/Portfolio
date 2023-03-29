/*  eslint-disable */
const project_folder = 'build';
const source_folder = 'src';

const path = {
  build: {
    html: project_folder + '/',
    css: project_folder + '/css/',
    js: project_folder + '/js/',
    img: project_folder + '/img/',
    fonts: project_folder + '/fonts/'
  },
  src: {
    html: [source_folder + '/*.html', '!' + source_folder + '/components/*.html'],
    css: source_folder + '/scss/style.scss',
    js: source_folder + '/js/main.js',
    img: source_folder + '/img/**/*.*',
    fonts: source_folder + '/fonts/**/*.*',
    xml: '*.xml',
    json: ['*.json', '!' + './package.json', '!' + './package-lock.json']
  },
  watch: {
    html: source_folder + '/**/*.html',
    css: source_folder + '/scss/**/*.scss',
    js: source_folder + '/js/**/*.js',
    img: source_folder + '/img/**/*.*',
    fonts: source_folder + '/fonts/**/*.*',
    xml: '*.xml',
    json: '*.json'
  },
  clean: './' + project_folder + '/'
};

const { src, dest } = require('gulp'),
  gulp = require('gulp'),
  browsersync = require('browser-sync').create(),
  fileInclude = require('gulp-file-include'),
  del = require('del'),
  sass = require('gulp-sass')(require('sass')),
  autoprefixer = require('gulp-autoprefixer'),
  media_queries = require('gulp-group-css-media-queries'),
  clean_css = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  webpack = require('webpack-stream');

function browserSync() {
  browsersync.init({
    server: {
      baseDir: './' + project_folder + '/'
    },
    port: 3000,
    notify: false
  });
}

function xml() {
  return src(path.src.xml).pipe(dest(path.build.html));
}
function json() {
  return src(path.src.json).pipe(dest(path.build.html));
}

function html() {
  return src(path.src.html).pipe(fileInclude()).pipe(dest(path.build.html)).pipe(browsersync.stream());
}
function css() {
  return src(path.src.css)
    .pipe(
      sass({
        outputStyle: 'expanded'
      })
    )
    .pipe(media_queries())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 5 versions'],
        cascade: true
      })
    )

    .pipe(dest(path.build.css))
    .pipe(clean_css())
    .pipe(
      rename({
        extname: '.min.css'
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream());
}
function js() {
  return src(path.src.js)
    .pipe(
      webpack({
        mode: 'development',
        output: {
          filename: 'script.js'
        },
        watch: false,
        devtool: 'source-map',
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [
                    [
                      '@babel/preset-env',
                      {
                        debug: true,
                        corejs: 3,
                        useBuiltIns: 'usage'
                      }
                    ]
                  ]
                }
              }
            }
          ]
        }
      })
    )
    .pipe(gulp.dest(path.build.js))
    .on('end', browsersync.reload);
}
function images() {
  return src(path.src.img).pipe(dest(path.build.img)).pipe(browsersync.stream());
}

function fonts() {
  return src(path.src.fonts).pipe(dest(path.build.fonts));
}
function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
  gulp.watch([path.watch.fonts], fonts);

  gulp.watch([path.watch.xml], xml);
  gulp.watch([path.watch.json], json);
}
function clean() {
  return del(path.clean);
}
const build = gulp.series(clean, gulp.parallel(css, html, js, images, fonts, json, xml));
const watch = gulp.parallel(build, watchFiles, browserSync);

exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.json = json;
exports.xml = xml;
exports.build = build;
exports.watch = watch;
exports.default = watch;
