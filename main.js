const readline = require("readline");
const helpers = require("./utils/helpers");
const calculations = require("./calculations");
const { COMMANDS, ERRORS } = require("./constants/enums");
const { GOODBYE, PROMPT, RPN_REGEX } = require("./constants/constants");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function rpnCalculator() {
  return new Promise(function (resolve, reject) {
    rl.setPrompt(PROMPT);
    rl.prompt();

    let stack = [];
    let re = new RegExp(RPN_REGEX);

    rl.on("line", function (line) {
      line = line.trim().replace(/\s+/g, " ").toLowerCase();

      if (COMMANDS.EXIT.includes(line)) {
        rl.close();
        return;
      } else if (line === COMMANDS.HELP) {
        console.log(`commands:\n  clear\n  stack\n  exit|quit|q`);
      } else if (line === COMMANDS.CLEAR) {
        stack = [];
      } else if (line === COMMANDS.STACK) {
        console.log(stack);
      } else if (!re.test(line)) {
        console.log(ERRORS.UNKNOWN_OPERATOR);
      } else if (line !== "") {
        //rpnProcess(line);
      }

      rl.prompt();
    }).on("close", function () {
      console.log(GOODBYE);
      resolve();
    });
  });
}

const rpnProcess = (line) => {
  let exp = line.split(" ");
  //safe copy
  let tempStack = helpers.deepClone(stack);
  exp = exp.map((i) => {
    if (i !== "0") return Number(i) ? Number(i) : i;
    else return 0;
  });

  //process stack
  exp.forEach((op) => {
    stack.push(calculations[op] ? calculations[op](...stack.splice(-2)) : op);
  });

  //validations
  if (stack.some((n) => n === Infinity)) {
    stack = tempStack;
    console.log(ERRORS.INFINITY);
  } else if (stack.some((n) => Number.isNaN(n))) {
    stack = tempStack;
    console.log(ERRORS.MISSING_OPERANT);
  } else if (stack.some((n) => !Number(n) && n !== 0)) {
    console.log(stack);
    stack = tempStack;
    console.log(ERRORS.SYNTAX);
  } else {
    !helpers.isEmptyArray(stack) && console.log(stack.slice(-1)[0]);
  }
};

async function run() {
  try {
    await rpnCalculator();
  } catch (e) {
    console.log(ERRORS.GENERAL, e);
  }
}

run();
