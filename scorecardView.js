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
        this.display();
      });
    }
  }

  updateAllFrames() {
    for (let i = 0; i < 10; i++) {
      this.updateFrame(i + 1);
    }
  }

  updateFrame(frameNumber) {
    let frame = document.querySelector(`#frame${frameNumber}-total`);
    frame.innerHTML = this.model.getFrameScore(frameNumber);
  }

  display() {
    document.querySelector("#total-score").innerText =
      this.model.getTotalScore();
    this.updateAllFrames();
  }
}

module.exports = ScorecardView;
