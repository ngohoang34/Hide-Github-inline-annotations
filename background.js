// background.js

let isEnabled = false;

chrome.action.onClicked.addListener(async (tab) => {
    if (!tab.id) return;

    isEnabled = !isEnabled;

    if (isEnabled) {
        await chrome.scripting.insertCSS({
            target: { tabId: tab.id },
            css: `tr.js-inline-annotations { display: none !important; }`
        });
        chrome.action.setIcon({ path: "icons/icon-on.png", tabId: tab.id });
    } else {
        await chrome.scripting.removeCSS({
            target: { tabId: tab.id },
            css: `tr.js-inline-annotations { display: none !important; }`
        });
        chrome.action.setIcon({ path: "icons/icon-off.png", tabId: tab.id });
    }
});
