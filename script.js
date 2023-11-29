// Assign variables to DOM elements and attributes
let timeRemainingEl = document.getElementById("clock");
let startQuizBtnEl = document.getElementById("startQuizBtn");
let welcomeBlockEl = document.getElementById("welcomeBlock");
let questionBlockEl = document.getElementById("questionBlock");
let questionTextEl = document.getElementById("questionText");
let response1BtnEl = document.getElementById("response1Btn");
let response2BtnEl = document.getElementById("response2Btn");
let response3BtnEl = document.getElementById("response3Btn");
let response4BtnEl = document.getElementById("response4Btn");
let responseButtonsEl = document.querySelectorAll(".responses");
let rightWrongEl = document.getElementById("rightWrong");
let submitBlockEl = document.getElementById("submitBlock");
let finalScoreEl = document.getElementById("finalScore");
let initialsEl = document.getElementById("initials");
let submitBtnEl = document.getElementById("submitBtn");
let scoreBlockEl = document.getElementById("scoreBlock");
let scoreRecordEl = document.getElementById("scoreRecord");
let viewHighScoreBtnEl = document.getElementById("viewHighScoreBtn");
let completionEl = document.getElementById("completion");
let goBackBtnEl = document.getElementById("goBackBtn");
let clearHighScoresBtnEl = document.getElementById("clearHighScoresBtn");

// Variables for starting conditions
let secondsRemaining = 120;
let questionNum = 0;
let totalScore = 0;
let questionCount = 1;

// FUNCTIONS
// Countdown timer starts when you click on Start Quiz
function countdown() {
    let timeInterval = setInterval(function () {
        if (secondsRemaining > 1) {
            // Set the `textContent` of `timeRemainingEl` to show the remaining seconds
            timeRemainingEl.textContent = "Time Remaining: " + secondsRemaining + " seconds";
            // Decrement `secondsRemaining` by 1
            secondsRemaining--;
        } else if (secondsRemaining === 1) {
            // When `secondsRemaining` is equal to 1, rename to 'second' instead of 'seconds'
            timeRemainingEl.textContent = "Time Remaining: " + secondsRemaining + " second";
            secondsRemaining--;
        } else {
            // Once `secondsRemaining` gets to 0, set `timeRemainingEl` to an empty string
            timeRemainingEl.textContent = "You're out of time!";
            // Use `clearInterval()` to stop the timeRemaining
            clearInterval(timeInterval);
        }
    }, 1000);
}

// When quiz starts, begin clock countdown, display a question, hide welcomeBlock, display questionBlock, start at the first question in the quizBank array
function startQuiz() {
    countdown();
    welcomeBlockEl.style.display = "none";
    questionBlockEl.style.display = "block";
    questionNum = 0;
    displayQuestion(questionNum);
}

// Use the quizBank to display questions and responses to the appropriate element based on which number question is being asked
function displayQuestion(z) {
    questionTextEl.textContent = quizBank[z].question;
    response1BtnEl.textContent = quizBank[z].responses[0];
    response2BtnEl.textContent = quizBank[z].responses[1];
    response3BtnEl.textContent = quizBank[z].responses[2];
    response4BtnEl.textContent = quizBank[z].responses[3];
    questionNum = z;
}

//After pressing a response button evaluate the response and say if answer is right or wrong 
function evaluateResponse(event) {
    event.preventDefault();
    //Display the response evaluation because it is hidden in the CSS
    rightWrongEl.style.display = "block";
    setTimeout(function () {
        rightWrongEl.style.display = "none";
    }, 1000);
    // Compare the correctAnswer from the quizBank to the value associated with the Button clicked
    if (quizBank[questionNum].correctAnswer == event.target.value) {
        rightWrongEl.textContent = "Correct!";
        totalScore = totalScore + 1;

    } else {
        secondsRemaining = secondsRemaining - 10;
        rightWrongEl.textContent = "Wrong! The correct answer is " + quizBank[questionNum].correctAnswer + " .";
    }
    //If there are more questions in the quizBank
    if (questionNum < quizBank.length - 1) {
        // display the next question or end the game
        displayQuestion(questionNum + 1);
    } else {
        gameOver();
    }
    questionCount++;
}


// QUIZBANK
// Create a bank for questions, responses, and correct answers
let quizBank = [
    {
        question: "Question 1: What is question 1?",
        responses: ["A", "B", "C", "D"],
        correctAnswer: "A"
    },
    {
        question: "Question 2: What is question 2?",
        responses: ["A", "B", "C", "D"],
        correctAnswer: "B"
    },
    {
        question: "Question 3: What is question 3?",
        responses: ["A", "B", "C", "D"],
        correctAnswer: "C"
    },
    {
        question: "Question 4: What is question 4?",
        responses: ["A", "B", "C", "D"],
        correctAnswer: "D"
    },
    {
        question: "Question 5: What is question 5?",
        responses: ["A", "B", "C", "D"],
        correctAnswer: "A"
    },
]

// EVENT LISTENERS
// Begin timer countdown on Start Button click
startQuizBtnEl.addEventListener("click", startQuiz);

// Any clicked response button will evaluate the response and bring on the next question
responseButtonsEl.forEach(function (click) {

    click.addEventListener("click", evaluateResponse);
});