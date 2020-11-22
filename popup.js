let fetchButton = document.getElementById("fetch");

fetchButton.onclick = function (element) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(null, { file: "fetch-script.js" });
  });
};
