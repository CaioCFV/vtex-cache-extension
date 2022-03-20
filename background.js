let AVAILABLE_TO_RUN_JS = true;
let AVAILABLE_TO_RUN_CSS = true;
let AVAILABLE_TO_RUN_IMAGENS = true;
let cache_javascript = false;
let cache_css = false;
let cache_imagens = false;

//RULES
const RULE_JAVASCRIPT = function() {
    if (AVAILABLE_TO_RUN_JS) {
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
        AVAILABLE_TO_RUN_JS = false;
        console.log('AVAILABLE_TO_RUN_JS');
    }
    setTimeout(function() {
        AVAILABLE_TO_RUN_JS = true;
    }, 5000);
};

const RULE_CSS = function() {
    if (AVAILABLE_TO_RUN_CSS) {
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
        AVAILABLE_TO_RUN_CSS = false;
        console.log('AVAILABLE_TO_RUN_CSS');
    }
    setTimeout(function() {
        AVAILABLE_TO_RUN_CSS = true;
    }, 5000);
};

const RULE_IMAGENS = function() {
    if (AVAILABLE_TO_RUN_IMAGENS) {
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
        AVAILABLE_TO_RUN_IMAGENS = false;
        console.log('AVAILABLE_TO_RUN_IMAGENS');
    }
    setTimeout(function() {
        AVAILABLE_TO_RUN_IMAGENS = true;
    }, 5000);
};

//INIT
const INIT = function() {
    chrome.storage.local.get("cache_javascript", (data) => {
        if (data.cache_javascript) {
            RULE_JAVASCRIPT();
        }
    });
    chrome.storage.local.get("cache_css", (data) => {
        if (data.cache_css) {
            RULE_CSS();
        }
    });
    chrome.storage.local.get("cache_imagens", (data) => {
        if (data.cache_imagens) {
            RULE_IMAGENS();
        }
    });
};

chrome.tabs.onUpdated.addListener(INIT);