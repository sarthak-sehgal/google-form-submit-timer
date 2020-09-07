document.addEventListener(
  "DOMContentLoaded",
  function () {
    const startBtn = document.getElementById("startBtn");
    const minutesInput = document.getElementById("minutesInput");
    const autoSubmitInput = document.getElementById("autoSubmitInput");

    autoSubmitInput.checked = true;

    startBtn.addEventListener(
      "click",
      function (e) {
        e.preventDefault();
        if (parseInt(minutesInput) <= 0) return;

        chrome.tabs.query({ active: true, currentWindow: true }, function (
          tabs
        ) {
          // query the active tab, which will be only one tab
          //and inject the script in it
          chrome.tabs.executeScript(
            tabs[0].id,
            {
              code: `var minutesInput=${minutesInput.value}, isAutoSubmitChecked=${autoSubmitInput.checked}`,
            },
            function () {
              chrome.tabs.executeScript(tabs[0].id, {
                file: "content_script.js",
              });
            }
          );
        });
      },
      false
    );
  },
  false
);
