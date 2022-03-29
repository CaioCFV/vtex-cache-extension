(function() {
    const cache_javascript = document.querySelector("#cache_javascript");
    const cache_css = document.querySelector("#cache_css");
    const cache_imagens = document.querySelector("#cache_imagens");
    const is_active = document.querySelector("#is_active");
    const UPDATE_STYLE = function(value) {
        console.log('is_active', value);
        if (value) {
            setTimeout(function() {
                is_active.setAttribute('checked', true);
            }, 500)
            document.querySelector('body').classList.remove('disabled');
            const canvas = new OffscreenCanvas(16, 16);
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, 16, 16);
            context.fillStyle = '#24d324';
            context.fillRect(0, 0, 16, 16);
            const imageData = context.getImageData(0, 0, 16, 16);
            chrome.action.setIcon({ imageData: imageData }, () => { /* ... */ });
        } else {
            setTimeout(function() {
                is_active.removeAttribute('checked');
            }, 500)
            document.querySelector('body').classList.add('disabled');
            const canvas = new OffscreenCanvas(16, 16);
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, 16, 16);
            context.fillStyle = '#999';
            context.fillRect(0, 0, 16, 16);
            const imageData = context.getImageData(0, 0, 16, 16);
            chrome.action.setIcon({ imageData: imageData }, () => { /* ... */ });
        }
    };

    //GET VALUES
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
    chrome.storage.local.get("is_active", (data) => {
        UPDATE_STYLE(data.is_active);
    });

    //ON CHANGE
    cache_javascript.addEventListener("change", async() => {
        chrome.storage.local.set({ 'cache_javascript': cache_javascript.checked });
    });
    cache_css.addEventListener("change", async() => {
        chrome.storage.local.set({ 'cache_css': cache_css.checked });
    });
    cache_imagens.addEventListener("change", async() => {
        chrome.storage.local.set({ 'cache_imagens': cache_imagens.checked });
    });
    is_active.addEventListener("change", async() => {
        UPDATE_STYLE(is_active.checked);
        chrome.storage.local.set({ 'is_active': is_active.checked });
    });
})();