let activeTabId = null;
let startTime = null;

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  if (activeTabId !== null) {
    calculateTimeSpent();
  }
  activeTabId = activeInfo.tabId;
  startTime = new Date();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tabId === activeTabId) {
    calculateTimeSpent();
    startTime = new Date();
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  if (tabId === activeTabId) {
    calculateTimeSpent();
    activeTabId = null;
    startTime = null;
  }
});

function calculateTimeSpent() {
  if (startTime) {
    const timeSpent = (new Date() - startTime) / 1000; // Time spent in seconds
    console.log(`Time spent on tab ${activeTabId}: ${timeSpent} seconds`);
    chrome.storage.local.get(["timeSpent"], function (result) {
      const totalTime = (result.timeSpent || 0) + timeSpent;
      chrome.storage.local.set({ timeSpent: totalTime }, function () {
        console.log(`Total time spent updated to: ${totalTime} seconds`);
      });
    });
  }
}
