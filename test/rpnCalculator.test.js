const rpnCalculator = require("../rpnCalculator");

const assert = require("assert");
describe("RPN Calculator Test", () => {
  it("should return -13.0", () => {
    let line = "5 5 5 8 + + -";
    let stack = [];
    assert.equal(rpnCalculator(line, stack), -13.0);
  });
  it("should return 0", () => {
    let line = "13 +";
    let stack = [-13];
    assert.equal(rpnCalculator(line, stack), 0);
  });
});
