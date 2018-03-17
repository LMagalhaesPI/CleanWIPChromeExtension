'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({act: 0}, function() {
  });
});

function updateIcon() {
  var current = 0;

  chrome.storage.sync.get('act', function(data) {
    current = data.act == 1? 0 : 1;

    var path = `icon${current}.png`;
    chrome.browserAction.setIcon({path: path});    
    chrome.storage.sync.set({act: current});  
    
    var listAction = `var mrList=document.getElementsByClassName('mr-list')[0].children;
    for(var key in mrList {var title = mrList[key].getElementsByClassName(merge-request-title-text)[0].innerText;
    if(title.indexOf('WIP')>=0){mrList[key].style.display='${current == 0 ? 'none':'block' }';}})`;
    
    chrome.tabs.executeScript(null,
      {code: listAction});  
  });
};

chrome.browserAction.onClicked.addListener(updateIcon);
updateIcon();
