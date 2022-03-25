let vtex_cache_active = false;
//RULES
const RULE_JAVASCRIPT = function() {
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1],
        addRules: [{
            "id": 1,
            "priority": 1,
            "action": {
                "type": "redirect",
                "redirect": {
                    "transform": {
                        "queryTransform": {
                            "addOrReplaceParams": [{
                                "key": "v",
                                "value": "fazOPix" + (Math.floor(Math.random() * 100000)).toString()
                            }]
                        }
                    }
                }
            },
            "condition": {
                "urlFilter": "/arquivos",
                "resourceTypes": ["script"]
            }
        }]
    });
    chrome.declarativeNetRequest.updateSessionRules({
        removeRuleIds: [1]
    });
    console.log('RUN_JS');
};

const RULE_CSS = function() {
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [2],
        addRules: [{
            "id": 2,
            "priority": 2,
            "action": {
                "type": "redirect",
                "redirect": {
                    "transform": {
                        "queryTransform": {
                            "addOrReplaceParams": [{
                                "key": "v",
                                "value": "fazOPix" + (Math.floor(Math.random() * 100000)).toString()
                            }]
                        }
                    }
                }
            },
            "condition": {
                "urlFilter": "/arquivos",
                "resourceTypes": ["stylesheet"]
            }
        }]
    });
    chrome.declarativeNetRequest.updateSessionRules({
        removeRuleIds: [2]
    });
    console.log('RUN_CSS');
};

const RULE_IMAGENS = function() {
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [3],
        addRules: [{
            "id": 3,
            "priority": 3,
            "action": {
                "type": "redirect",
                "redirect": {
                    "transform": {
                        "queryTransform": {
                            "addOrReplaceParams": [{
                                "key": "v",
                                "value": "fazOPix" + (Math.floor(Math.random() * 100000)).toString()
                            }]
                        }
                    }
                }
            },
            "condition": {
                "urlFilter": "/arquivos",
                "resourceTypes": ["image"]
            }
        }]
    });
    chrome.declarativeNetRequest.updateSessionRules({
        removeRuleIds: [3]
    });
    console.log('RUN_IMAGENS');
};

//CONTEXT MENU
const UPDATE_STYLE = function() {
    chrome.storage.local.get("vtexcache_active", (status) => {
        if (status.vtexcache_active) {
            const canvas = new OffscreenCanvas(16, 16);
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, 16, 16);
            context.fillStyle = '#00FF00';
            context.fillRect(0, 0, 16, 16);
            const imageData = context.getImageData(0, 0, 16, 16);
            chrome.action.setIcon({ imageData: imageData }, () => { /* ... */ });
        } else {
            const canvas = new OffscreenCanvas(16, 16);
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, 16, 16);
            context.fillStyle = '#e31c58';
            context.fillRect(0, 0, 16, 16);
            const imageData = context.getImageData(0, 0, 16, 16);
            chrome.action.setIcon({ imageData: imageData }, () => { /* ... */ });
        }
    });
};

const TOGGLE_EXTENSION = function() {
    chrome.storage.local.get("vtexcache_active", (status) => {
        vtex_cache_active = !status.vtexcache_active;
        chrome.storage.local.set({ 'vtexcache_active': !status.vtexcache_active });
        UPDATE_STYLE();
    });
};

chrome.contextMenus.create({
    id: 'toggle',
    title: "Ativar / Desativar",
    contexts: ['all'],
    type: "normal"
});

chrome.contextMenus.onClicked.addListener((data) => {
    if (data.menuItemId === 'toggle') {
        TOGGLE_EXTENSION();
    }
});

//INIT
const INIT = function(tabid, changeInfo) {
    if (changeInfo.status == 'complete') {
        chrome.storage.local.get("cache_javascript", (data) => {
            if (data.cache_javascript && vtex_cache_active) {
                RULE_JAVASCRIPT();
            }
        });
        chrome.storage.local.get("cache_css", (data) => {
            if (data.cache_css && vtex_cache_active) {
                RULE_CSS();
            }
        });
        chrome.storage.local.get("cache_imagens", (data) => {
            if (data.cache_imagens && vtex_cache_active) {
                RULE_IMAGENS();
            }
        });
    }
};

chrome.tabs.onUpdated.addListener(INIT);