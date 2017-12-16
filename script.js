const calc = (function() {
  const add = (a, b) => a + b;
  const sub = (a, b) => a - b;
  const mul = (a, b) => a * b;
  const div = (a, b) => a / b;

  const operate = (op, a, b) => {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (op) {
      case "+":
        return add(a, b);
      case "-":
        return sub(a, b);
      case "*":
        return mul(a, b);
      case "/":
        return div(a, b);
    }
  };
  return {
    operate
  };
})();

const stack = (function() {
  let stack = [];
  const push = val => stack.push(val);
  const getValue = () => {
    return stack.reduce((v, c) => `${v}${c}`, "");
  };
  const clear = () => (stack = []);
  return {
    push,
    getValue,
    clear
  };
})();

let operator;
let a = "";
let b = "";
let didOperate = false;
const processInput = input => {
  if (input == "clear") {
    stack.clear();
    a = "";
    b = "";
    populateDisplay("");
  } else if (/[0-9\.]/.test(input)) {
    stack.push(input);
    populateDisplay(stack.getValue());
  } else if (/[+-/*]/.test(input)) {
    if (a === "" || didOperate) {
      a = stack.getValue() || a;
      didOperate = false;
    } else {
      b = stack.getValue();
      if (b) {
        val = `${calc.operate(operator, a, b)}`;
        a = val;
        stack.clear();
      }
      populateDisplay(a);
    }
    operator = input;
    stack.clear();
  } else if (input == "=") {
    b = stack.getValue() || b;
    val = `${calc.operate(operator, a, b)}`;
    if (val != "NaN" && val != "undefined") {
      console.log(val);
      a = val;
      stack.clear();
      didOperate = true;
      populateDisplay(a);
    }
  }
  console.log({ a, b, operator, val: stack.getValue() });
};

const display = document.querySelector("#display");
const populateDisplay = num => {
  display.innerHTML = "";
  display.textContent = num.substring(0, 10);
};

const buttons = document.querySelectorAll("button");
buttons.forEach(b =>
  b.addEventListener("click", e => processInput(e.target.textContent))
);
