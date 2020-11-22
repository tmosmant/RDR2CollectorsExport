let exportButton = document.getElementById("export");

exportButton.onclick = function (element) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(null, { file: "export-script.js" });
  });
};
