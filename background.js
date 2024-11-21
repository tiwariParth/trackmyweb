chrome.runtime.onInstalled.addListener(() => {
     console.log('Extension installed');
   });
   
   chrome.tabs.onActivated.addListener(activeInfo => {
     chrome.tabs.get(activeInfo.tabId, tab => {
       console.log('Active tab:', tab.url);
     });
   });
   
   chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
     if (changeInfo.status === 'complete') {
       console.log('Tab updated:', tab.url);
     }
   });