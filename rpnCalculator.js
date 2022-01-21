const helpers = require("./utils/helpers");
const calculations = require("./utils/calculations");
const { RPN_REGEX } = require("./constants/constants");

const regex = new RegExp(RPN_REGEX);

const rpnCalculator = (line, stack) => {
  //line validation
  if (!regex.test(line)) {
    console.log(ERRORS.UNKNOWN_OPERATOR);
    return stack;
  } else if (line === "") return stack;

  //safe copy
  let tempStack = helpers.deepClone(stack);

  //proccess line
  let exp = line.split(" ");
  exp = exp.map((i) => {
    if (i !== "0") return Number(i) ? Number(i) : i;
    else return 0;
  });

  //process stack
  exp.forEach((op) => {
    stack.push(calculations[op] ? calculations[op](...stack.splice(-2)) : op);
  });

  //stack validations
  if (stack.some((n) => n === Infinity)) {
    stack = tempStack;
    console.log(ERRORS.INFINITY);
  } else if (stack.some((n) => Number.isNaN(n))) {
    stack = tempStack;
    console.log(ERRORS.MISSING_OPERANT);
  } else if (stack.some((n) => !Number(n) && n !== 0)) {
    stack = tempStack;
    console.log(ERRORS.SYNTAX);
  } else {
    !helpers.isEmptyArray(stack) && console.log(stack.slice(-1)[0]);
  }

  return stack;
};

module.exports = rpnCalculator;
