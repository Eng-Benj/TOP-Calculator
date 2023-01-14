let nums = ["", ""], operator = "", operatorDisplay = "", eq = false;
const displayCalc = document.querySelector("#calculation");

function formNumber(buttonPressed) {
    if (eq === true) {clear()};
    displayCalc.textContent = ""
    operator === "" ? nums[0] += buttonPressed : nums[1]+= buttonPressed;
    displayCalc.textContent += nums[0]
    operatorDisplay != "" ? displayCalc.textContent += " " + operatorDisplay : displayCalc.textContent += "";
    nums[1] ? displayCalc.textContent += " " + nums[1] : displayCalc.textContent += "";
};

function formOperator(buttonText, buttonID) {
    if (nums[0] === "") {return false}
    if (operator !== "") {operation(nums, operator);}
    displayCalc.textContent = ""
    operator = buttonID;
    operatorDisplay = buttonText;
    displayCalc.textContent += nums[0] + " " + operatorDisplay
    nums[1] ? displayCalc.textContent += " " + nums[1] : displayCalc.textContent += "";
    eq = false
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

function operation(nums, operator) {
    if (nums[1] ==="") {return}
    let partialResult
    if (nums[1] === "0" && operator === "/") {
        clear()
        displayCalc.textContent = "..."
        return
    }
    if (operator == "/") {partialResult = division(nums[0], nums[1])} 
    else if (operator == "*") {partialResult = multiplication(nums[0], nums[1])}
    else if (operator == "-") {partialResult = subtraction(nums[0], nums[1])}
    else if (operator == "+") {partialResult = addition(nums[0], nums[1])}
    operator = "";
    operatorDisplay = "";
    nums[1] = "";
    let result
    if (partialResult.toString().split("").length > 12) {
        if (partialResult.toString().includes(".")) {
            result = partialResult.toFixed(10)
            let zeros = result.split("")
            for (let i = zeros.length-1; i >=0; i--) {
                if (zeros[i] === ".") {
                    zeros = zeros.slice(0, i);
                    break;
                } else if (zeros[i] === "0") {zeros = zeros.slice(0, i)}
            }
            result = zeros.toString().replace(",","")
        } else {
            displayCalc.textContent = "Too big!";
            return
        }
    } else {result = partialResult};
    nums[0] = result
    displayCalc.textContent = nums[0];
    operatorDisplay != "" ? displayCalc.textContent += " " + operatorDisplay : displayCalc.textContent += ""; 
    eq = true
}

function clear() {
    nums = ["", ""];
    operator = "";
    operatorDisplay = "";
    displayCalc.textContent = "0";
};

function del() {
    if (nums[1] && nums[1] !== "") {nums[1] = nums[1].substring(0,nums[1].length-1)}
    else if (operator !== "") {
        operator = "";
        operatorDisplay = "";}
    else if (nums[0] !== "") {nums[0] = nums[0].substring(0,nums[0].length-1)}
    else {return}
    displayCalc.textContent = ""
    displayCalc.textContent += nums[0]
    operatorDisplay != "" ? displayCalc.textContent += " " + operatorDisplay : displayCalc.textContent += "";
    nums[1] ? displayCalc.textContent += " " + nums[1] : displayCalc.textContent += "";
}

function decimal() {
    if (operator === "" && nums[0] === "") {nums[0] = "0."}
    else if (operator === "" && nums[0] !== "") {
        if (String(nums[0]).includes(".") === false) {
            nums[0] += "."}
    }
    else if (operator !== "" && nums[1] === ""){nums[1] = "0."} 
    else if (operator !=="" && nums[1] !== "") {
        if (String(nums[1]).includes(".") === false) {
            nums[1] += "."}
    }
    displayCalc.textContent = ""
    displayCalc.textContent += nums[0]
    operatorDisplay != "" ? displayCalc.textContent += " " + operatorDisplay : displayCalc.textContent += "";
    nums[1] ? displayCalc.textContent += " " + nums[1] : displayCalc.textContent += "";
}

const numberButtons = Array.from(document.querySelectorAll(".num > button")).slice(0, -1);
numberButtons.forEach(button => button.addEventListener('click', () => formNumber(button.textContent)));

const operatorButtons = Array.from(document.querySelectorAll(".four > button"));
operatorButtons.forEach(button => button.addEventListener('click', () => formOperator(button.textContent, button.id)));

const equals = document.querySelector('#equals');
equals.addEventListener('click', () => operation(nums, operator, operatorDisplay));

const ac = document.querySelector('#clear');
ac.addEventListener('click', () => clear());

const allButtons = Array.from(document.querySelectorAll('button'));
allButtons.forEach(button => button.addEventListener('click', () => button.classList.add("pressed")));
allButtons.forEach(button => button.addEventListener('transitionend', () => button.classList.remove("pressed")));

const delButton = document.querySelector('#del');
delButton.addEventListener('click', () => del());

const decButton = document.querySelector('#dec');
decButton.addEventListener('click', () => decimal());