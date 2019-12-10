// set a class to store all the information of the calculator
class Calculator {
	constructor(previousOperandTextElement, currentOperandTextElement) {
		// set the display text elements inside the Calculator class
		this.previousOperandTextElement = previousOperandTextElement
		this.currentOperandTextElement = currentOperandTextElement
		this.clear()
	}

	// function declarations 

	clear() {
		this.currentOperand = ''
		this.previousOperand = ''
		this.operation = undefined
	}

	delete() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1)
	}
	// function that add a number to the display every time a number is clicked.
	appendNumber(number) {

	// Makes sure that we use only one period (.) at a time, and that we can't 
	// add more then one period, if we already have one, it returns and the
	// function won't continue to its nexxt part.
		if (number === '.' && this.currentOperand.includes('.')) return
	// we use .toString so javascript won't think of the numbers as numbers in the display,
	// because then he would automaticly operate numbers by adding numbers together,
	// two click on 1 will display 2 instead of 11.
		this.currentOperand = this.currentOperand.toString() + number.toString()
	}
	// function that uses an opetator when an operation button is clicked
	chooseOperation(operation) {
		if (this.currentOperand === '') return
			// this one compute the operator and the numbers showen on display
			//when you click on operator and add the operator to the new number,
			//so you can chain calculate.
		if (this.previousOperand !== '') {
			this.compute()
		}
		this.operation = operation
		this.previousOperand = this.currentOperand
		this.currentOperand = ""
	}
	// function that compute all the numbers and the operators that works on them
	compute() {
		let computation
		const prev = parseFloat(this.previousOperand)
		const current = parseFloat(this.currentOperand)
		// if we have an empty display or incompleted the math,
		// then this will not let the compute button work.
		if (isNaN(prev) || isNaN(current)) return
			switch (this.operation) {
				case '+':
				computation = prev + current
				break
				case '-':
				computation = prev - current
				break
				case '*':
				computation = prev * current
				break
				case '/':
				computation = prev / current
				break
				default:
					return
			}
			this.currentOperand = computation
			this.operation = undefined
			this.previousOperand = ''
	}

	// used to add the commas on big numbers
	getDisplayNumber(number) {
		// split the display numbers to strings before (integer) and
		 // after (decimal) the period
		const stringNumber = number.toString()
		const integerDigits = parseFloat(stringNumber.split('.')[0])
		const decimalDigits = stringNumber.split('.')[1]
		const floatNumber = parseFloat(number)
		// set the finale display, if it's not a number, return empty string.
		let integerDisplay
		if (isNaN(integerDigits)) {
			integerDisplay = ''
		} else {
			integerDisplay = integerDigits.toLocaleString('en', {
				maximumFractionDigits: 0 })
		}
		if (decimalDigits != null) {
			return `${integerDisplay}.${decimalDigits}`
		} else {
			return integerDisplay
		}
	}

	updateDisplay() {
		this.currentOperandTextElement.innerText =
		this.getDisplayNumber(this.currentOperand)
		if (this.operation != null) {
		this.previousOperandTextElement.innerText = 
		`${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
		} else {
			this.previousOperandTextElement.innerText = ''
		}
		
	}
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

// define a variable that update new values from the constructor
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

// loop through all the buttons, and with every click, add the number to the display
numberButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.innerText)
		calculator.updateDisplay()
	})
})

operationButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.innerText)
		calculator.updateDisplay()
	})
})

equalsButton.addEventListener('click', button => {
	calculator.compute()
	calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
	calculator.clear()
	calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
	calculator.delete()
	calculator.updateDisplay()
})