const readline = require("readline");
const helpers = require("./utils/helpers");
const calculations = require("./calculations");
const { COMMANDS, ERRORS } = require("./constants/enums");
const { GOODBYE, PROMPT, RPN_REGEX } = require("./constants/constants");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const regex = new RegExp(RPN_REGEX);

function rpnCalculator() {
  return new Promise(function (resolve, reject) {
    rl.setPrompt(PROMPT);
    rl.prompt();
    let stack = [];

    rl.on("line", function (line) {
      line = line.trim().replace(/\s+/g, " ").toLowerCase();
      switch (line) {
        case COMMANDS.EXIT.value:
          rl.close();
          return;
        case COMMANDS.HELP.value:
          console.log(`Commands:`);
          Object.values(COMMANDS).forEach((command) => {
            console.log(`  ${command.value}: ${command.description}`);
          });
          break;
        case COMMANDS.CLEAR.value:
          stack = [];
          break;
        case COMMANDS.STACK.value:
          console.log(stack);
          break;
        default:
          stack = rpnProcess(line, stack);
      }
      rl.prompt();
    }).on("close", function () {
      console.log(GOODBYE);
      resolve();
    });
  });
}

const rpnProcess = (line, stack) => {
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

async function run() {
  try {
    await rpnCalculator();
  } catch (e) {
    console.log(ERRORS.GENERAL, e);
  }
}

run();
