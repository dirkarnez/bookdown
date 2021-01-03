// ==UserScript==
// @name         Bookmark as markdown
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const hostname = window.location.hostname;
    const button = createButton();

    if (hostname == "www.youtube.com") {
        window.addEventListener('yt-page-data-updated', function() {
            document.body.appendChild(button);
        });
    } else {
        if (document.readyState == "complete" || document.readyState == "loaded" || document.readyState == "interactive") {
            document.body.appendChild(button);
        } else {
            document.addEventListener("DOMContentLoaded", function(event) {
                document.body.appendChild(button);
            });
        }
    }

    function createButton() {
        const button = document.createElement("button");
        button.innerText = "Bookmark as markdown!";
        button.style.position = "fixed";
        button.style.right = "23px";
        button.style.bottom = "23px";
        button.style.zIndex = "997";
        button.style.border = "none";
        button.style.backgroundColor = "white";
        button.style.boxShadow = "0 3px 6px rgba(0, 0, 0, .16), 0 1px 2px rgba(0, 0, 0, .23)";
        button.addEventListener("click", function() {
            if (!navigator.clipboard) {
                alert("navigator.clipboard is null");
            }
            navigator.clipboard
                .writeText(`- [${document.title}](${window.location.href})`)
                .then(() => {
                alert("Copied!");
            }).catch(err => {
                alert(err);
            });
        });
        return button;
    }
})();
