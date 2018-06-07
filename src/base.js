// The progressive CSS loader. The page is interactive and styled with the "base"
// styles by the time this file is loaded. Here, we asynchronously load the remaining
// "full" styles.

// @todo Optimise further by caching with LocalStorage (or ServiceWorker).

'use strict';

import '../vendor/modernizr';

/**
 * @param {String} css CSS styles text.
 * @return {Element} A `<style>` element with the given styles inline.
 */
function inlineCSS(css) {
    let style = document.createElement('style');

    style.innerHTML = css;

    return style;
}

/**
 * @param {String} href A URL to a CSS stylesheet.
 * @return {Element} A `<link>` element with the given link as its `href`.
 */
function linkCSS(href) {
    let link = document.createElement('link');

    link.href = href;
    link.rel = 'stylesheet';

    return link;
}

/**
 * Attempts to asynchronously load the full styles from the given URL;
 * and either way inserts them before the given `next` element.
 *
 * @param {String} url A URL pointing to the full styles.
 * @param {Element} next The element before which the full styles element
 *                       should be inserted.
 */
function loadFullCSS(url, next) {
    // A flag to indicate whether the CSS was inserted.
    let insertedCSS = false;

    // Inserting a given CSS element into the right place in the DOM.
    function insertCSSEl(cssEl) {
        next.parentNode.insertBefore(cssEl, next);
        insertedCSS = true;
        document.documentElement.classList.add('fully-styled');
    }


    let xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);


    // Our sync fallback. If the async XHR times out or fails, load the full
    // styles with a <link> pointing to the given URL, and abort the XHR.
    function syncCSS() {
        if(!insertedCSS) {
            xhr.abort();
            insertCSSEl(linkCSS(url));
        }
    }


    const ready = 4;
    const statusOK = 200;

    // If the XHR responds, load the full styles accordingly.
    xhr.onreadystatechange = () => {
            if(xhr.readyState === ready && !insertedCSS) {
                if(xhr.status === statusOK) {
                    // Insert a new <style> with the response content
                    // if the XHR succeeded.
                    insertCSSEl(inlineCSS(xhr.responseText));
                }
                else {
                    // Otherwise, use our sync fallback.
                    syncCSS();
                }
            }
        };


    // If the XHR times out, use our sync fallback.

    let wait = 5000;

    if('timeout' in xhr && 'ontimeout' in xhr) {
        xhr.ontimeout = syncCSS;
        xhr.timeout = wait;
    }
    else {
        setTimeout(syncCSS, wait);
    }


    // Try to load the CSS asynchronously.
    xhr.send();
}

let el = document.getElementById('critical-styles').nextSibling;
let fullPath = '/dist/css/index.css';

 // We'll insert the full styles right after the critical styles.
loadFullCSS(fullPath, el);
