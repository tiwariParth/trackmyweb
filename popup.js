document.addEventListener("DOMContentLoaded", () => {
  function updateTable() {
    chrome.storage.local.get(["timeSpentPerSite"], function (result) {
      const timeSpentPerSite = result.timeSpentPerSite || {};
      const tableBody = document.getElementById("time-spent-table-body");
      tableBody.innerHTML = "";

      for (const [site, timeSpent] of Object.entries(timeSpentPerSite)) {
        const row = document.createElement("tr");
        row.innerHTML = `<td class="border px-4 py-2">${site}</td><td class="border px-4 py-2">${timeSpent.toFixed(
          2
        )}</td>`;
        tableBody.appendChild(row);
      }
    });
  }

  updateTable();

  chrome.storage.onChanged.addListener(function (changes, areaName) {
    if (areaName === "local" && changes.timeSpentPerSite) {
      updateTable();
    }
  });
});
