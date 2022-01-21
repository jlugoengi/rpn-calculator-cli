const readline = require("readline");
const { COMMANDS } = require("./constants/enums");
const { GOODBYE } = require("./constants/constants");
const rpnCalculator = require("./rpnCalculator");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let stack = [];

var recursiveReadLine = function () {
  rl.question("> ", function (line) {
    line = line.trim().replace(/\s+/g, " ").toLowerCase();
    switch (line) {
      case COMMANDS.EXIT.value:
        console.log(GOODBYE);
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
    recursiveReadLine();
  });
};

recursiveReadLine();
