var shade = 'salmon';

var rules = '';
rules = rules + '.plonk * {color:' + shade + '!important; background:' + shade + '!important; border-color:' + shade + '!important;}';
rules = rules + '.plonk * img {opacity:0!important;}';
rules = rules + '.plonk * iframe {opacity:0!important;}';

rules = rules + '.plonk *:hover {color:inherit!important; background:inherit!important;}';
rules = rules + '.plonk * img:hover {opacity:1!important;}';
rules = rules + '.plonk * iframe:hover {opacity:1!important;}';

var css = document.createElement('STYLE');
css.type = 'text/css';
if (css.styleSheet) {
  css.styleSheet.cssText = rules;
} else {
  css.appendChild(document.createTextNode(rules));
}
document.head.appendChild(css);

var plonkList = {};

var getListItem = function (obj) {
  if (obj.parentNode.tagName === 'LI') {
    return obj.parentNode;
  }
  if (obj.parentNode !== document.body) {
    getListItem(obj.parentNode);
  } else {
    return false;
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.cmd) {
    if (request.cmd === 'contextMenu') {
      var findMe = request.data.srcUrl;
      // oh good golly do I really have to find this image by groveling for its src URL?
      var img = document.getElementsByTagName('IMG');
      var found = false;
      for (var i = 0; i < img.length; i = i + 1) {
        if (img[i].src === findMe) {
          var a = img[i].parentNode;
          if (a.tagName === 'A' && a.href) {
            var id = a.getAttribute('data-user-id');
            if (id) {
              var name = a.href.split('/').pop();
              if (plonkList[id] === true) {
                if (window.confirm('De-plonkify ' + name + '?')) {
                  plonkList[id] = false;
                  chrome.storage.local.set({'plonk': plonkList});
                  // this needs work
                  var things = document.querySelectorAll('[data-user-id]');
                  for (var i = 0, n = things.length; i < n; i = i + 1) {
                    if (things[i].getAttribute('data-user-id') === id) {
                      var li = getListItem(things[i]);
                      if (li && li.className && li.className.match(/plonk/)) {
                       li.className = li.className.replace(/plonk/, '');
                      }
                    }
                  }
                  updateScreen(true);
                }
              } else {
                if (window.confirm('Plonkify ' + name + '?')) {
                  plonkList[id] = true;
                  chrome.storage.local.set({'plonk': plonkList});
                  updateScreen();
                }
              }
              found = true;
              break;
            }
          }
        }
      }
      if (!found) {
        alert('Sorry, ID not found. Try one inside a tweet.');
      }
    }
  }
});

var updateScreen = function (unplonk) {
  

  var things = document.querySelectorAll('[data-user-id]');
  for (var j = 0, k = things.length; j < k; j = j + 1) {
    var id = things[j].getAttribute('data-user-id');
    if (plonkList[id] === true) {
      var li = getListItem(things[j]);
      if (li && !li.className.match(/ plonk/)) {
        li.className = li.className + ' plonk';
      }
    }
  }
}

chrome.storage.local.get('plonk', function(obj) {
  if (obj.plonk) {
    plonkList = obj.plonk;
    updateScreen();
  }
});

var getHeight = function () {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
}
var h = getHeight();

var check = function () {
  var th = getHeight();
  if (th !== h) {
    h = th;
    updateScreen();
  }
  window.setTimeout(check, 400);
};

check();
