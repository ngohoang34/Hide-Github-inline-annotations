function replaceGitHubLogo(enable) {
    const logoAnchor = document.querySelector('a.AppHeader-logo');
    const svgLogo = logoAnchor?.querySelector('svg.octicon-mark-github');

    if (!logoAnchor) return;

    if (enable) {
        // If already replaced, do nothing
        if (logoAnchor.querySelector('img')) return;

        // Save original SVG HTML if not already saved
        if (svgLogo && !logoAnchor.dataset.originalSvg) {
            logoAnchor.dataset.originalSvg = svgLogo.outerHTML;

            // Create replacement image
            const img = document.createElement("img");
            img.src = chrome.runtime.getURL("icons/icon-on.png");
            img.style.height = "32px";
            img.style.width = "32px";

            // Replace SVG with the image
            svgLogo.replaceWith(img);
        }
    } else {
        // Restore the original SVG if stored
        if (logoAnchor.dataset.originalSvg) {
            logoAnchor.innerHTML = logoAnchor.dataset.originalSvg;
            delete logoAnchor.dataset.originalSvg;
        }
    }
}

// Listen for toggle message from background.js
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "toggleLogo") {
        replaceGitHubLogo(msg.enabled);
    }
});
