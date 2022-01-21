const readline = require("readline");
const helpers = require("./utils/helpers");
const calculations = require("./calculations");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let stack = [];
let re = new RegExp(/^[0-9\+\*\-\/ ]*$/);

var recursiveReadLine = function () {
  rl.question("> ", function (line) {
    line = line.trim().replace(/\s+/g, " ").toLowerCase();

    if (line == "exit" || line == "q" || line == "quick") {
      console.log("Goodbye!");
      return rl.close();
    } else if (line === "help") {
      console.log(`commands:\n  clear\n  stack\n  exit|quit|q`);
    } else if (line === "clear") {
      stack = [];
    } else if (line === "stack") {
      console.log(stack);
    } else if (!re.test(line)) {
      console.log("Invalid input: Unknown operator");
    } else if (line !== "") {
      let exp = line.split(" ");
      let tempStack = helpers.deepClone(stack);
      exp = exp.map((i) => {
        if (i !== "0") return Number(i) ? Number(i) : i;
        else return 0;
      });

      exp.forEach((op) => {
        stack.push(
          calculations[op] ? calculations[op](...stack.splice(-2)) : op
        );
      });

      if (stack.some((n) => n === Infinity)) {
        stack = tempStack;
        console.log("Invalid input: Division by zero");
      } else if (stack.some((n) => Number.isNaN(n))) {
        stack = tempStack;
        console.log("Invalid input: Missing operant");
      }
    }

    recursiveReadLine();
  });
};

recursiveReadLine();
