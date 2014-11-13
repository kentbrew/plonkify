// Show and save changes to browser extension settings.


document.getElementById('optionTitle').innerHTML = chrome.i18n.getMessage('optionTitle');


var listUrl = document.getElementById('listUrl');
var listArea = document.getElementById('listArea');

listUrl.value = chrome.i18n.getMessage('listUrlDefault');

// Saves options to chrome.storage 

function save() {
  chrome.storage.local.set({'listUrl': listUrl.value}, function() {
    chrome.storage.local.get('listUrl', function(obj) {
      listUrl.value = obj.listUrl || chrome.i18n.getMessage('listUrlDefault');
      chrome.runtime.sendMessage('refresh', function() {});
    });
  });
}

// Restores select box state to saved value from chrome.storage on load

function refreshList() {
  chrome.storage.local.get('plonk', function(obj) {
    for (var k in obj.plonk) {
      if (k) {
        listArea.value = listArea.value + k + '\n';
      }
    }
  });
}

function load() {
  document.getElementById('listUrlLabel').innerHTML = chrome.i18n.getMessage('listUrlLabel');
  document.getElementById('listAreaLabel').innerHTML = chrome.i18n.getMessage('listAreaLabel');
  chrome.storage.local.get('listUrl', function(obj) {
    listUrl.value = obj.listUrl || chrome.i18n.getMessage('listUrlDefault');
    document.getElementsByTagName('BUTTON')[0].addEventListener('click', save);
    refreshList();
  });
}

document.addEventListener('DOMContentLoaded', load);
