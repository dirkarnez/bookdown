'use strict';

(function() {
  function script() {
    const hostname = window.location.hostname;
    const button = createButton();

    if (hostname == "www.youtube.com" && RegExp('\/watch').test(window.location.pathname)) {
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
        const content = `- [${document.title}](${window.location.href})`;
        const button = document.createElement("button");
        button.innerText = "Bookmark as markdown!";
        button.style.position = "fixed";
        button.style.right = "23px";
        button.style.bottom = "23px";
        button.style.zIndex = "997";
        button.style.outline = "none";
        button.style.borderRadius = "0";
        button.style.color = "black";
        button.style.border = "none";
        button.style.padding = "1px 6px";
        button.style.backgroundColor = "white";
        button.style.backgroundImage = "unset";
        button.style.boxShadow = "0 3px 6px rgba(0, 0, 0, .16), 0 1px 2px rgba(0, 0, 0, .23)";
        button.addEventListener("click", function() {
            if (navigator.clipboard) {
                navigator.clipboard
                    .writeText(content)
                    .then(() => { alert("Copied!"); })
                    .catch(err => { alert(err); });
            } else {
                const textNode = document.createTextNode(content);
                document.body.appendChild(textNode);
                const range = document.createRange();
                range.selectNodeContents(textNode);

                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);

                try {
                    var successful = document.execCommand('copy');
                    if (successful) {
                        alert("Copied (fallback)!");
                        textNode.remove();
                    } else {
                        alert("Unsuccessful");
                    }
                } catch (err) {
                        alert("Unsuccessful");
                }
            }
        });
        return button;
    }
  }

  function inject(fn) {
    const script = document.createElement('script');
    script.text = `(${fn.toString()})();`;
    document.documentElement.appendChild(script);
  }

  inject(script);
})()
