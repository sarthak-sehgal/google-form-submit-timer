(function () {
  clearInterval(window.secondsInterval);
  clearTimeout(window.secondsTimeout);
  window.secondsRemaining = parseInt(minutesInput) * 60;

  let divElem = null;

  if (document.getElementById("autosubmitGoogleForm") !== null) {
    divElem = document.getElementById("autosubmitGoogleForm");
  } else {
    divElem = document.createElement("div");
    divElem.id = "autosubmitGoogleForm";

    divElem.style.position = "absolute";
    divElem.style.display = "flex";
    divElem.style.flexDirection = "column";
    divElem.style.alignItems = "center";
    divElem.style.top = "10px";
    divElem.style.right = "10px";
    divElem.style.padding = "15px";
    divElem.style.backgroundColor = "#FF0000";
    divElem.style.color = "#FFFFFF";
    divElem.style.fontSize = "1.2em";

    divElemSpan = document.createElement("span");
    divElemSpan.style.textAlign = "center";
    divElemSpan.style.marginBottom = "10px";
    divElemSpan.innerHTML = getTimerText();
    divElem.appendChild(divElemSpan);

    stopBtn = document.createElement("button");
    stopBtn.innerHTML = "Stop Timer";
    stopBtn.style.fontSize = "0.8em";
    stopBtn.style.padding = "5px 15px";
    stopBtn.style.cursor = "pointer";
    stopBtn.style.borderRadius = "5px";
    stopBtn.style.color = "#ffffff";
    stopBtn.style.backgroundColor = "#6c757d";
    stopBtn.style.border = "none";
    stopBtn.style.outline = "none";

    stopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.secondsRemaining = 0;
      clearInterval(window.secondsInterval);
      clearTimeout(window.secondsTimeout);
      divElem.remove();
    });

    divElem.appendChild(stopBtn);
    document.body.appendChild(divElem);
  }

  window.secondsInterval = setInterval(() => {
    secondsRemaining -= 1;
    document.querySelector(
      "#autosubmitGoogleForm > span"
    ).innerHTML = getTimerText();
  }, 1000);

  if (isAutoSubmitChecked) {
    window.secondsTimeout = setTimeout(() => {
      clearInterval(window.secondsInterval);

      if (
        document.querySelector(
          "div.freebirdFormviewerViewNavigationNavControls > div > div > div"
        )
      ) {
        document
          .querySelector(
            "div.freebirdFormviewerViewNavigationNavControls > div > div > div"
          )
          .click();
      }
      window.secondsRemaining = 0;
    }, window.secondsRemaining * 1000);
  } else {
    window.secondsTimeout = setTimeout(() => {
      clearInterval(window.secondsInterval);
      window.secondsRemaining = 0;
    }, window.secondsRemaining * 1000);
  }

  function getTimerText() {
    let minutesRemaining = parseInt(window.secondsRemaining / 60).toString();
    let secondsRemaining = (window.secondsRemaining % 60).toString();

    if (minutesRemaining.length == 1) minutesRemaining = "0" + minutesRemaining;
    if (secondsRemaining.length == 1) secondsRemaining = "0" + secondsRemaining;

    return `${minutesRemaining}:${secondsRemaining}`;
  }
})();
