const readline = require("readline");
const helpers = require("./utils/helpers");
const calculations = require("./calculations");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function rpnCalculator() {
  return new Promise(function (resolve, reject) {
    rl.setPrompt("> ");
    rl.prompt();

    let stack = [];
    let re = new RegExp(/^[0-9\+\-\*\-\/ ]*$/);

    rl.on("line", function (line) {
      line = line.trim().replace(/\s+/g, " ").toLowerCase();

      if (line == "exit" || line == "quit" || line == "q") {
        rl.close();
        return;
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

        //validations
        if (stack.some((n) => n === Infinity)) {
          stack = tempStack;
          console.log("Invalid input: Division by zero");
        } else if (stack.some((n) => Number.isNaN(n))) {
          stack = tempStack;
          console.log("Invalid input: Missing operant");
        } else if (stack.some((n) => !Number(n) && n !== 0)) {
          console.log(stack);
          stack = tempStack;
          console.log("Syntax error");
        } else {
          !helpers.isEmptyArray(stack) && console.log(stack.slice(-1)[0]);
        }
      }

      rl.prompt();
    }).on("close", function () {
      console.log("Goodbye!");
      resolve();
    });
  });
}

async function run() {
  try {
    await rpnCalculator();
  } catch (e) {
    console.log("failed:", e);
  }
}

run();
