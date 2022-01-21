const readline = require("readline");
const { COMMANDS, ERRORS } = require("./constants/enums");
const { GOODBYE, PROMPT } = require("./constants/constants");
const rpnCalculator = require("./rpnCalculator");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function recursiveReadLine() {
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
          stack = rpnCalculator(line, stack);
      }
      rl.prompt();
    }).on("close", function () {
      console.log(GOODBYE);
      resolve();
    });
  });
}

async function run() {
  try {
    await recursiveReadLine();
  } catch (e) {
    console.log(ERRORS.GENERAL, e);
  }
}

run();
