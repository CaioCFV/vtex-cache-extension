const { src, dest } = require('gulp')
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const include = require('gulp-include')
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-dart-sass');
const pkg = require('./package.json');

function css() {
    return src('**/*.css', { cwd: './src' })
        .pipe(cleanCSS())
        .pipe(autoprefixer({ cascade: false, grid: 'autoplace' }))
        .pipe(dest('build/'))
}

function js() {
    return src('**/*.js', { cwd: './src' })
        .pipe(include())
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())
        .pipe(dest('build/'))
}

function scss() {
    return src('**/*.scss', { cwd: './src' })
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(cleanCSS())
        .pipe(autoprefixer({ cascade: false, grid: 'autoplace' }))
        .pipe(dest('build/'))
}

function manifest() {
    return src('**/manifest.json', { cwd: './src' })
        .pipe(dest('build/'))
}

function copyAll() {
    return src(['**/*.*', '!**/*.scss', '!**/*.js'], { cwd: './src' })
        .pipe(dest('build/'))
}

function commomScripts() {
    return src('**/commomScripts/*.js', { cwd: './src' })
        .pipe(sourcemaps.init())
        .pipe(concat('ecn-' + pkg.accountName + '-scripts' + '.min.js'))
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(sourcemaps.write())
        .pipe(dest('build/'))
}

/**************************************************** 
 ********************* PRODDUCTION SCRIPTS *********** 
 *****************************************************/

function commomScriptsProd() {
    return src('**/commomScripts/*.js', { cwd: './src' })
        .pipe(concat('ecn-' + pkg.accountName + '-scripts' + '.min.js'))
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())
        .pipe(dest('build/'))
}

function scssProd() {
    return src('**/*.scss', { cwd: './src' })
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('build/'))
}

module.exports = {
    manifest,
    copyAll,
    css,
    js,
    scss,
    scssProd,
    commomScripts,
    commomScriptsProd
}