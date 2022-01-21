# RPN Calculator CLI

RPN(Reverse Polish Notation) calculator for command line. Mathematical postfix notation in which operators follow their operands.

## Installation

```bash
npm install
```

## Run

```bash
node main.js
```

## Usage

```

user@ rpn-calculator-cli % node main.js
> 5 5 5 8 + + -
> -13

```

```

user@ rpn-calculator-cli % node main.js
> 5
5
> 3
3
> -
2
>

```

```

user@ rpn-calculator-cli % node main.js
> 5 +
Invalid input: Missing operant
>

```

## Commands

- help - Display program available commands.
- stack - Display current stack value.
- clear - Set stack value to empty.
- q - Exit the program.

```

user@ rpn-calculator-cli % node main.js
> 5 5
5
> stack
[ 5, 5 ]
> clear
> stack
> []
>

```

## Unit Testing

```bash
npm test
```
