const COMMANDS = Object.freeze({
  HELP: { value: "help", description: "Display program available commands." },
  CLEAR: { value: "clear", description: "Set stack value to empty." },
  STACK: { value: "stack", description: "Display current stack value." },
  EXIT: { value: "q", description: "Exit the program." },
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
