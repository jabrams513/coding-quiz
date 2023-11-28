// Assign variables to DOM elements and attributes
var startQuizBtnEl = document.getElementById("startQuizBtn");
let timeRemainingEl = document.getElementById("clock");

let secondsRemaining = 120;

// EVENT LISTENERS
// Begin timer countdown on Start Button click
startQuizBtnEl.addEventListener("click", startQuiz);

// Create a bank for questions, responses, and correct answers
let quizBank = [
    {
        question: "Question 1: What is question 1?",
        responses: ["A", "B", "C", "D"],
        correctAnswer: "A",
    },
    {
        question: "Question 2: What is question 2?",
        responses: ["A", "B", "C", "D"],
        correctAnswer: "B",
    },
    {
        question: "Question 3: What is question 3?",
        responses: ["A", "B", "C", "D"],
        correctAnswer: "C",
    },
    {
        question: "Question 4: What is question 4?",
        responses: ["A", "B", "C", "D"],
        correctAnswer: "D",
    },
    {
        question: "Question 5: What is question 5?",
        responses: ["A", "B", "C", "D"],
        correctAnswer: "A",
    },
]

// FUNCTIONS
// Timer starts when you click on Start Quiz
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
            timeRemainingEl.textContent = '';
            // Use `clearInterval()` to stop the timeRemaining
            clearInterval(timeInterval);
            // // Call the `displayMessage()` function
            // displayMessage();
        }
    }, 1000);
}

function startQuiz() {
    countdown()
}