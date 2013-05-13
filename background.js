var interval = 60000;
var refresh = function() {
    var url = localStorage["url"] || "http://www.commafeed.com";
	if (url.lastIndexOf('/') != url.length - 1) {
	  url += '/';
	}
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url + "rest/category/unreadCount", true);
	xhr.onreadystatechange = function() {
	  if (xhr.readyState == 4) {
		var resp = JSON.parse(xhr.responseText);
		var count = 0;
		for(var i=0;i<resp.length;i++){
		  count += resp[i].unreadCount;
		}
		if (count === 0) count = '';
		chrome.browserAction.setBadgeText({ text: '' + count });
	  } else {
	    chrome.browserAction.setBadgeText({ text: '?' });
	  }
	}
	xhr.send();
	setTimeout(refresh, interval);
}

chrome.browserAction.onClicked.addListener(function(tab) {
  var url = localStorage["url"] || "http://www.commafeed.com";
  chrome.tabs.create({'url': url}, function(tab) {
    // do nothing
  });
});

refresh();

