chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        css: `tr.js-inline-annotations { display: none !important; }`
    });
});
