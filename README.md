bookmark-as-markdown
====================
### Supported
- [x] YouTube
  - https://github.com/ImprovedTube/YouTube-Extension
- [x] Fallback to generic

### TODOs
- [ ] Chrome extension
- [ ] Fallback to `execCommand`
```
if (typeof(navigator.clipboard) == typeof (void 0)) {
    console.log('navigator.clipboard');
    var textArea = document.createElement("textarea");
    textArea.value = linkToGo;
    textArea.style.position="fixed";  //avoid scrolling to bottom
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        toastr.info(msg); 
    } catch (err) {
        toastr.warning('Was not possible to copy te text: ', err);
    }

    document.body.removeChild(textArea)            
    return;
}
navigator.clipboard.writeText(linkToGo).then(function() {
    toastr.info(`successful!`);         
}, function(err) {
    toastr.warning('unsuccessful!', err);
});
```
