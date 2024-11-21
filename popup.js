document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["timeSpent"], function (result) {
    document.getElementById("time").textContent = result.timeSpent || 0;
  });

  chrome.storage.onChanged.addListener(function (changes, areaName) {
    if (areaName === "local" && changes.timeSpent) {
      document.getElementById("time").textContent =
        changes.timeSpent.newValue || 0;
    }
  });
});
