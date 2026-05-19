const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;
    handleInput(value);
  });
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
  currentInput += value;
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