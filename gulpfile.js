"use strict";

/******************************************
 ******** SERVER DEPENDENCIES **************
 *******************************************/
const { watch, parallel, series } = require('gulp');
var serveStatic = require('serve-static');
const proxy = require('proxy-middleware');
const url = require('url');
const browserSync = require('browser-sync');
const { setCompression, setHeaders, setHost, setBody } = require('./local.middlewares');


/******************************************
 ************** TASKS **********************
 *******************************************/
const { copyAll, css, commomScripts, scss, scssProd, commomScriptsProd, js, manifest } = require('./tasks');


/******************************************
 ************** CONFIG HOSTS ***************
 *******************************************/

const pkg = require('./package.json')
const $_HOST = `${pkg.accountName}.vtexcommercestable.com.br`;
const $_PROXY_CONFIG = url.parse(`https://${$_HOST}/`)
$_PROXY_CONFIG.preserveHost = true;
$_PROXY_CONFIG.cookieRewrite = `${pkg.accountName}.vtexlocal.com.br`;

/******************************************
 ************** SERVER INIT ****************
 *******************************************/
function watchFiles() {
    watch('./src/**/*.css', function(done) {
        copyAll();
        browserSync.reload()
        done();
    });

    watch('./src/**/*.js', function(done) {
        js();
        browserSync.reload()
        done();
    });

    watch(['./src/**/*.scss', '../commom/**/*.scss'], function(done) {
        scss();
        browserSync.reload()
        done();
    });

    watch(['./src/js/commomScripts/*.js'], function(done) {
        commomScripts();
        browserSync.reload()
        done();
    });
}
/******************************************
 *************** SERVER INIT ****************
 *******************************************/

function myServer() {
    browserSync.init({
        host: `${pkg.accountName}.vtexlocal.com.br`,
        port: 443,
        https: true,
        server: './src',
        watch: true,
        open: 'external',
        middleware: [
            setCompression,
            setHeaders,
            setHost,
            setBody,
            serveStatic('./build'),
            proxy($_PROXY_CONFIG),
        ],
    })
}

exports.default = parallel(
    manifest,
    copyAll,
    css,
    js,
    scss,
    commomScripts,
    watchFiles,
)

exports.build = series(
    manifest,
    css,
    js,
    scssProd,
    commomScriptsProd
)