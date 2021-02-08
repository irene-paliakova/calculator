class Calculator {
    constructor(previousTextElem, currentTextElem) {
        this.previousTextElem = previousTextElem;
        this.currentTextElem = currentTextElem;
        this.readyToReset = false;
        this.clear();

    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;

    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)

    }

    appendNumber(number) {
        if  (number === "." && this.currentOperand.includes(".")) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();

    }

    chooseOperation(operation) {
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "") {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
        
    }

    compute(){
        let computation;
        let prev = parseFloat(this.previousOperand);
        let curr = parseFloat(this.currentOperand);
        if (this.operation === "√") {
            curr = 1;
            if (prev < 0) {
                this.clear();
                alert("Нельзя извлечь корень из отрицательного числа");
                return;
            }
        }
        if (isNaN(prev) || isNaN(curr)) return;
        switch (this.operation) {
            case "+" :
                computation = prev + curr;
                break;
            case "-" :
                computation = prev - curr;
                break;
            case "*" :
                computation = prev * curr;
                break;
            case "÷" :
                if (curr === 0) {
                    this.clear();
                    alert("Нельзя делить на ноль");
                return;
                }
                computation = prev / curr;
                break;
            case "^" :
                computation = Math.pow(prev, curr);
                break;
            case "√" :
                computation = Math.sqrt(prev);;
                break; 
            default:
                return;     
            
        }
        
        if (computation) {
            computation = +computation.toFixed(15);   
        }

        this.readyToReset = true;
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = "";
    }

    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigits.toLocaleString("en", {maximumFractionDigits: 0});
        }
        if (decimalDigits != null ) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay(){
        this.currentTextElem.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousTextElem.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousTextElem.innerText = "";
        }
    }

    displayError() {
        this.currentOperand.innerHTML = "Error";
    }

    negative() {
        this.currentOperand = -this.currentOperand;
    }
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const previousTextElem = document.querySelector('[data-previous-operand]');
const currentTextElem = document.querySelector('[data-current-operand]');
const negativeButton = document.querySelector('[data-plus-minus]');

const calculator = new Calculator(previousTextElem, currentTextElem);



numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (calculator.readyToReset == true) {
            calculator.currentOperand = "";
            calculator.readyToReset = false;
        }
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })

})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        if (calculator.operation == "√") {
            calculator.compute();
        }
        calculator.updateDisplay();
    })

})

equalButton.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
})

negativeButton.addEventListener("click", () => {
    calculator.negative();
    calculator.updateDisplay();
})


if(document.getElementById) {
    window.alert = function(txt) {
        CustomAlert(txt);
    }
}

function CustomAlert(txt) {
    document.getElementById("alert-message").innerHTML = txt;
    document.getElementById('alerts').classList.add('active');
}

document.getElementById('close-button').onclick = function() {
    document.getElementById('alerts').classList.remove('active');
}




