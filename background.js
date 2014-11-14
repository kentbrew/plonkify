// send a string to whoever is listening on the current tab
var sendToContent = function (str) {
  var send = str;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, send, function() {});
  });
};

// listen for list refresh message from options page
chrome.extension.onMessage.addListener(function(msg) {
  if (msg === 'refresh') {
    getListUrl();
  }
});

// create a context menu
chrome.contextMenus.create({
  title: chrome.i18n.getMessage("extAction"),
  documentUrlPatterns: ["*://twitter.com/*"],
  contexts: ["image"],
  onclick: function(data) {
    sendToContent({'cmd': 'contextMenu', 'data': data});
  }
});

// got a list
var gotList = function (text) {
  var list = text.split('\n');
  var plonk = {};
  for (var i = 0; i < list.length; i = i + 1) {
    if (list[i]) {
      plonk[list[i].split(' ')[0]] = true;
    }
  }
  console.log('setting local list');
  console.log(plonk);
  chrome.storage.local.set({'plonk': plonk});
};

// get a list from an URL
var getList = function (url) {
  var list = new XMLHttpRequest();
  list.open('GET', url, true);
  list.onreadystatechange = function() {
    if (list.readyState == 4 && list.status == 200) {
      console.log('got list');
      gotList(list.responseText);
    }
  };
  list.send();
};

// get the list URL from localstorage or messages
var getListUrl = function () {
  chrome.storage.local.get('listUrl', function(obj) {
    var url = obj.listUrl || chrome.i18n.getMessage('listUrlDefault');
    console.log('getting list from ' + url);
    getList(url);
  });
};

// init local storage if we don't have anything
chrome.storage.local.get('plonk', function(obj) {
  if (!obj.plonk) {
    console.log('got nothing, initing list');
    chrome.storage.local.set({'plonk': {}});
    getListUrl();
  } else {
    console.log('got plonk list');
    console.log(obj.plonk);
  }
});
