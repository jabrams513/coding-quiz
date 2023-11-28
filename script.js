// Assign variables to DOM elements and attributes
let timeRemainingEl = document.getElementById("clock");
let startQuizBtnEl = document.getElementById("startQuizBtn");
let welcomeBlockEl = document.getElementById("welcomeBlock");
let questionBlockEl = document.getElementById("questionBlock")

// Variables for starting conditions
let secondsRemaining = 60;
let questionNum = 0;
let score = 0;
let questionCount =0;

// EVENT LISTENERS
// Begin timer countdown on Start Button click
startQuizBtnEl.addEventListener("click", startQuiz);

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