const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;
    handleInput(value);
  });
});

document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (
    (key >= "0" && key <= "9") ||
    key === "+" ||
    key === "-" ||
    key === "*" ||
    key === "/" ||
    key === "." ||
    key === "%"
  ) {
    handleInput(key);
  } else if (key === "Enter") {
    event.preventDefault();
    handleInput("=");
  } else if (key === "Backspace") {
    handleInput("DEL");
  } else if (key === "Escape") {
    handleInput("C");
  }
});

function handleInput(value) {
  if (value === "C") {
    clearDisplay();
  } else if (value === "DEL") {
    deleteLast();
  } else if (value === "=") {
    calculateResult();
  } else {
    appendValue(value);
  }
}

function appendValue(value) {
  const operators = ["+", "-", "*", "/", "%"];
  const lastChar = currentInput.slice(-1);

  if (operators.includes(value) && currentInput === "") {
    return;
  }

  if (operators.includes(value) && operators.includes(lastChar)) {
    currentInput = currentInput.slice(0, -1) + value;
  } else {
    currentInput += value;
  }

  display.value = currentInput;
}

function clearDisplay() {
  currentInput = "";
  display.value = "";
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  display.value = currentInput;
}

function calculateResult() {
  try {
    if (currentInput === "") {
      return;
    }

    const result = Function('"use strict"; return (' + currentInput + ")")();

    if (!isFinite(result)) {
      display.value = "Error";
      currentInput = "";
      return;
    }

    display.value = result;
    currentInput = result.toString();
  } catch {
    display.value = "Error";
    currentInput = "";
  }
}