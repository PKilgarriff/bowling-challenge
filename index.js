const BowlingModel = require("./bowlingScore.js");
const ScorecardView = require("./scorecardView.js");

const model = new BowlingModel();
const view = new ScorecardView(model);

view.display();
