const COMMANDS = Object.freeze({
  HELP: "help",
  CLEAR: "clear",
  STACK: "stack",
  EXIT: ["exit", "quit", "q"],
});

const ERRORS = Object.freeze({
  UNKNOWN_OPERATOR: "Invalid input: Unknown operator",
  INFINITY: "Invalid input: Division by zero",
  MISSING_OPERANT: "Invalid input: Missing operant",
  SYNTAX: "Syntax error",
  GENERAL: "System failed, please contact an administrator",
});

module.exports = {
  COMMANDS,
  ERRORS,
};
