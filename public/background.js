/*global chrome*/
chrome.runtime.onInstalled.addListener(() => {
  console.log('Chrome extension successfully installed!');
  return;
});

chrome.action.onClicked.addListener((tab) => {
  chrome.windows.create(
    {
      // Just use the full URL if you need to open an external page
      url: chrome.runtime.getURL('index.html'),
      type: 'popup',
      left: 0,
      top: 0,
      width: 252,
      height: 574,
      focused: true,
    },
    function (win) {
      console.log('opened: ' + JSON.stringify(win));
      // win represents the Window object from windows API
      // Do something after opening
    },
  );
});
