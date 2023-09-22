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
                runGame("gameType") // the game type is generated as the data type and requested to run that data type in the game.
            }

        })
    }

    runGame("addition");
})
/**
 * the main game "loop", called when the script is first loaded and the users answer
 * has been processed.
 */
function runGame(gameType) {        //the game type trigger, calls this run game function, 
    // creates two random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1
    let num2 = Math.floor(Math.random() * 25) + 1

    //an if statement is run to decide which game needs playing
    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);    //if addition, call the function here and insert the two random numbers, jump down to the function
    } else {
        alert(`unknown game type: ${gameType}`);
        throw `unknown game type: ${gameType}. Aborting!;`
    }
}

function checkAnswer() {


}

/**
 * Gets the operands and the operator symbol directly from the DOM and returns the correct answer.
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById('operand1').innerText);     //collect a integer from id = operand1 within the html parseint returns a string as an integer 
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === ("+") {
        return [operand1 + operand2, "addition"];
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}.Aborting!`;
    }
}


function incrementScore() {


}

function incrementWrongAnswer() {


}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;        //finds the operand1 in the html
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";             //inserts and overwrites the html + to the display

}

function displaySubtractQuestion() {


}

function displayMultiplyQuestion() {


}