class ScorecardView {
  constructor(model) {
    this.model = model;
    this.buttons = document.querySelector("#roll-buttons");

    this.#addButtonsUpTo(10);

    let holdingMessage = document.querySelector("#loading-text");
    holdingMessage.innerHTML = "JavaScript Loaded";
  }

  #addButtonsUpTo(number) {
    for (let i = 0; i <= number; i++) {
      let htmlButton = document.createElement("button");
      Object.assign(htmlButton, {
        id: `add-${i}-btn`,
        className: "roll-button",
        innerHTML: `${i}`,
      });
      this.buttons.append(htmlButton);
      let button = document.querySelector(`#add-${i}-btn`);
      button.addEventListener("click", (event) => {
        console.log(`Target: ${event.target.innerText}`);
        this.model.addScore(i);
        let pinsAvailable = this.updateAllFrames();
        this.showButtons();
        this.hideButtons(pinsAvailable + 1);
        this.updateTotalScore();
      });
    }
  }

  showButtons() {
    for (let i = 0; i <= 10; i++) {
      let button = document.querySelector(`#add-${i}-btn`);
      button.style.display = "inline";
    }
  }

  hideButtons(from = 0, to = 10) {
    for (let i = from; i <= to; i++) {
      let button = document.querySelector(`#add-${i}-btn`);
      button.style.display = "none";
    }
  }

  updateAllFrames() {
    let pinsStanding = 10;
    for (let i = 0; i < 10; i++) {
      let returnValue = this.updateFrame(i + 1);
      if (returnValue === false) {
        break;
      } else {
        pinsStanding = returnValue;
      }
    }
    console.log(`Pins Standing [In updateAllFrames]: ${pinsStanding}`);
    if (pinsStanding == 0) {
      pinsStanding = 10;
    }
    return pinsStanding;
  }

  updateFrame(frameNumber) {
    let scoreObject = this.model.getFrameDetailedScore(frameNumber);
    if (scoreObject === undefined) return false;
    let frameFirst = document.querySelector(`#frame${frameNumber}-first`);
    let frameSecond = document.querySelector(`#frame${frameNumber}-second`);
    let frameTotal = document.querySelector(`#frame${frameNumber}-total`);
    if (scoreObject.strike) {
      frameFirst.innerHTML = "";
      frameSecond.innerHTML = "<b>X</b>";
    } else if (scoreObject.spare) {
      frameFirst.innerHTML = scoreObject.first;
      frameSecond.innerHTML = "<b>/</b>";
    } else {
      frameFirst.innerHTML = scoreObject.first;
      frameSecond.innerHTML = scoreObject.second;
    }
    frameTotal.innerHTML = scoreObject.total;
    let pinsStanding = 10;
    if (!scoreObject.complete) {
      pinsStanding = 10 - (scoreObject.first + scoreObject.second);
    }
    console.log(
      `Pins Standing [In updateFrame ${frameNumber}]: ${pinsStanding}`
    );
    return pinsStanding;
  }

  updateTotalScore() {
    document.querySelector("#total-score").innerText =
      this.model.getTotalScore();
  }
}

module.exports = ScorecardView;
