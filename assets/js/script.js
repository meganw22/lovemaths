// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {       //event listeners changed from alerting when button is clicked to calling the check answer function
            if (this.getAttribute("data-type") === "submit") {          //only if the datatype of submit (i.e submit button) is clicked
                checkAnswer();      //call check answer function block
            }
            else {
                let gameType = this.getAttribute("data-type");    //gametype is generated through, if a button that is not submit is clicked.  //the data type returns depending on which button is clicked.
                runGame(gameType) // the game type is generated as the data type and requested to run that data type in the game.
            }

        })
    }

    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();        //  keydown is the event listener for a keyboard button press, when enter is pressed, run check answer
        }
    })

    runGame("addition");
})
/**
 * the main game "loop", called when the script is first loaded and the users answer
 * has been processed.
 */
function runGame(gameType) {        //the game type trigger, calls this run game function, 

    document.getElementById("answer-box").value = "";       //sets the answer box value to empty string to clear the answer box after each q.
    document.getElementById("answer-box").focus();      // focusses the cursor to the answer box each time the page loads.

    // creates two random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1
    let num2 = Math.floor(Math.random() * 25) + 1

    //an if statement is run to decide which game needs playing
    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);    //if addition, call the function here and insert the two random numbers, jump down to the function
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
    } else {
        alert(`unknown game type: ${gameType}`);
        throw `unknown game type: ${gameType}. Aborting!`;
    }
}

/**
 * check answer against the first element in the returned calculatedCorrectAnswer array.
 */
function checkAnswer() {
    let userAnswer = parseInt(document.getElementById("answer-box").value);     // the user answer is taken from the dom and input as "userAnswer"
    let calculatedAnswer = calculateCorrectAnswer();                            // calculated answer of the same sum is called and assigned, calculatedAnswer
    let isCorrect = userAnswer === calculatedAnswer[0];             //the two answers are compared and true or false is displayed.

    if (isCorrect){     //if true is displayed
        alert("Congrats, you are correct!")
        incrementScore();
    } else {            //if false is displayed
        alert(`Sorry, thats incorrect, you answered ${userAnswer}, the correct answer was ${calculatedAnswer[0]}! `);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);  //takes the 2nd element from calculatedAnswer array, "addition" and runs a new game of this same type.

}

/**
 * Gets the operands and the operator symbol directly from the DOM and returns the correct answer.
 * This returns as an array because of the [] in the if statement. 
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById('operand1').innerText);     //collect a integer from id = operand1 within the html parseint returns a string as an integer 
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}.Aborting!`;
    }
}

/**
 * get current score from the dom and increment it by one
 */
function incrementScore() {
    let oldScore = parseInt(document.getElementById("score").innerText);        //assign the inner text of the current score to here
    document.getElementById("score").innerText = ++oldScore                     //call the score integer and ++ to increment the score, +1 could also be used here.
}
/**
 * get current incorrect score from the dom and increment it by one
 */
function incrementWrongAnswer() {
    let oldScore  = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;        //finds the operand1 in the html
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";             //inserts and overwrites the html + to the display

}

function displaySubtractQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1:operand2; //if operand1 is bigger than operand 2, insert this (the larger value) into the operand1 value.
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2:operand1   // if o1 is bigger than o2, dont insert larger value to o2
    document.getElementById('operator').textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x";

}