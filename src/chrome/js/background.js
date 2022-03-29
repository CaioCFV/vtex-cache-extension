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
                                "value": "vtexnocache" + (Math.floor(Math.random() * 100000)).toString()
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

//INIT
const INIT = function(tabid, changeInfo) {
    if (changeInfo.status == 'complete') {
        chrome.storage.local.get("is_active", (data) => {
            if (data.is_active) {
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
            } else {
                chrome.declarativeNetRequest.updateDynamicRules({
                    removeRuleIds: [1]
                });
                chrome.declarativeNetRequest.updateDynamicRules({
                    removeRuleIds: [2]
                });
                chrome.declarativeNetRequest.updateDynamicRules({
                    removeRuleIds: [3]
                });
            }
        });
    }
};

chrome.tabs.onUpdated.addListener(INIT);