# FeedlyReadLaterLinkExtractor
4 little lines to extract your "Read later" link list from feedly to your clipboard.

For some reason, you may want to export your **Read later** list from Feedly.

1) Go on your ["Read later" page](https://feedly.com/i/saved)
2) Scroll down until you load all your article list
3) Copy the following in your console and press enter :-)

```javascript
var regex = /data-alternate-link="(.*)" data-entry/g;
const elements = document.getElementsByClassName("list-entries");
const matches = [...elements.item(0).outerHTML.matchAll(regex)];
copy(matches.map(match => match[1]));
```

The list containing all your links is now in your clipboard and you can paste it wherever you want 🥳
