;
(function() {
    const random = Math.floor(Math.random() * 100000);
    let cache_javascript = false;
    let cache_css = false;
    let cache_imagens = false;
    let lid = false;
    chrome.storage.local.get("cache_javascript", (data) => {
        if (data.cache_javascript) {
            cache_javascript = true;
        }
    });
    chrome.storage.local.get("cache_css", (data) => {
        if (data.cache_css) {
            cache_css = true;
        }
    });
    chrome.storage.local.get("cache_imagens", (data) => {
        if (data.cache_imagens) {
            cache_imagens = true;
        }
    });
    chrome.storage.local.get("lid", (data) => {
        if (data.lid) {
            lid = data.lid
        }
    });
    const CALLBACK = function(details) {

        const url = details.url;
        const isFile = url.indexOf('/arquivos') > 10;
        const alreadyChanged = url.indexOf('xv') > 10;
        const isJs = url.indexOf('.js') > 10;
        const isCss = url.indexOf('.css') > 10;
        const isImage = url.indexOf('.jpg') > 10 || url.indexOf('.svg') > 10 || url.indexOf('.png') > 10;
        const hasWid = url.indexOf('wid') > 1;
        console.log({
            url: url,
            wid: !hasWid
        });
        // if (lid.length && url.indexOf('universoenfim.com.br') > 5 && hasWid) {
        //     console.log(url, 'vapo')
        //     return { redirectUrl: url + "?wid=" + lid }
        // }
        if (isFile && cache_javascript && isJs && !alreadyChanged) {
            return { redirectUrl: url.split('?')[0] + "?v=" + random + "xv" }
        }
        if (isFile && cache_css && isCss && !alreadyChanged) {
            return { redirectUrl: url.split('?')[0] + "?v=" + random + "xv" }
        }
        if (isFile && cache_imagens && isImage && !alreadyChanged) {
            return { redirectUrl: url.split('?')[0] + "?v=" + random + "xv" }
        }
    };
    const URL_FILTER = { urls: ["<all_urls>"] };
    const OPT_EXTRAINFOESPEC = ["blocking"];
    chrome.webRequest.onBeforeRequest.addListener(CALLBACK, URL_FILTER, OPT_EXTRAINFOESPEC);
})();