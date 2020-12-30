// ==UserScript==
// @name         Bookmark as markdown
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://*.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    window.addEventListener('yt-page-data-updated', function() {
        const button = document.createElement("button");
        button.innerText = "Bookmark as markdown!";
        button.addEventListener("click", function() {
            navigator.clipboard
            .writeText(`- [${document.title}](${window.location.href})`)
            .then(() => {
                 alert("Copied!");
             })
            .catch(err => {
                 alert(err);
             });
        });
        document.querySelector("#container > h1").appendChild(button);
    });
})();
