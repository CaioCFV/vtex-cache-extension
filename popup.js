const cache_javascript = document.querySelector("#cache_javascript");
const cache_css = document.querySelector("#cache_css");
const cache_imagens = document.querySelector("#cache_imagens");
const lid = document.querySelector("#lid");

chrome.storage.local.get("cache_javascript", (data) => {
    if (data.cache_javascript) {
        cache_javascript.setAttribute('checked', true);
    }
});
chrome.storage.local.get("cache_css", (data) => {
    if (data.cache_css) {
        cache_css.setAttribute('checked', true);
    }
});
chrome.storage.local.get("cache_imagens", (data) => {
    if (data.cache_imagens) {
        cache_imagens.setAttribute('checked', true);
    }
});
chrome.storage.local.get("lid", (data) => {
    if (data.lid) {
        lid.setAttribute('value', data.lid);
    }
});
cache_javascript.addEventListener("change", async() => {
    chrome.storage.local.set({ 'cache_javascript': cache_javascript.checked });
    console.log(cache_javascript.checked, 'ui')
});
cache_css.addEventListener("change", async() => {
    chrome.storage.local.set({ 'cache_css': cache_css.checked });
});
cache_imagens.addEventListener("change", async() => {
    chrome.storage.local.set({ 'cache_imagens': cache_imagens.checked });
});
lid.addEventListener("keyup", async() => {
    chrome.storage.local.set({ 'lid': lid.value });
});