let fetchButton = document.getElementById("fetch");

fetchButton.onclick = function (element) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(
      null,
      { file: "jquery-3.5.1.min.js" },
      function () {
        chrome.tabs.executeScript(null, { file: "fetch-script.js" });
      }
    );
  });
};
