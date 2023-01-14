let num1 = "", num2 = "", operator = "", operatorDisplay = "";
const displayCalc = document.querySelector("#calculation");

function formNumber(buttonPressed) {
    operatorDisplay ? num2 += buttonPressed : num1 += buttonPressed;
    displayCalc.textContent = num1 + " " + operatorDisplay + " " + num2;
};

function formOperator(buttonText, buttonID) {
    if (!operator) {
        operator = buttonID
        operatorDisplay = buttonText;
        displayCalc.textContent = num1 + " " + operatorDisplay + " " + num2;
    };
};

function addition(num1, num2) {
    return +num1 + +num2;
};

function subtraction(num1, num2) {
    return +num1 - +num2;
};

function division(num1, num2) {
    return +num1 / +num2;
};

function multiplication(num1, num2) {
    return +num1 * +num2;
};

function operation(num1, num2, operator) {
    if (operator == "/") {displayCalc.textContent = division(num1, num2)} 
    else if (operator == "*") {displayCalc.textContent = multiplication(num1, num2)}
    else if (operator == "-") {displayCalc.textContent = subtraction(num1, num2)}
    else if (operator == "+") {displayCalc.textContent = addition(num1, num2)};
}

function clear() {
    num1 = "";
    num2 = "";
    operator = "";
    operatorDisplay = "";
    displayCalc.textContent = "0";
};



const numberButtons = Array.from(document.querySelectorAll(".num > button"));
numberButtons.forEach(button => button.addEventListener('click', () => formNumber(button.textContent)));

const operatorButtons = Array.from(document.querySelectorAll(".four > button"));
operatorButtons.forEach(button => button.addEventListener('click', () => formOperator(button.textContent, button.id)));

const equals = document.querySelector('#equals');
equals.addEventListener('click', () => operation(num1, num2, operator));

const ac = document.querySelector('#clear');
ac.addEventListener('click', () => clear());