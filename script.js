// Assign variables to DOM elements and attributes
let viewHighScoreBtnEl = document.getElementById("viewHighScoreBtn");
let timeRemainingEl = document.getElementById("clock");

let welcomeBlockEl = document.getElementById("welcomeBlock");
let startQuizBtnEl = document.getElementById("startQuizBtn");

let questionBlockEl = document.getElementById("questionBlock");
let questionTextEl = document.getElementById("questionText");
let response1BtnEl = document.getElementById("response1Btn");
let response2BtnEl = document.getElementById("response2Btn");
let response3BtnEl = document.getElementById("response3Btn");
let response4BtnEl = document.getElementById("response4Btn");
let responseButtonsEl = document.querySelectorAll(".responses");
let rightWrongEl = document.getElementById("rightWrong");

let submitBlockEl = document.getElementById("submitBlock");
let completionEl = document.getElementById("completion");
let finalScoreEl = document.getElementById("finalScore");
let initialsEl = document.getElementById("initials");
let submitBtnEl = document.getElementById("submitBtn");

let scoreBlockEl = document.getElementById("scoreBlock");
let scoreRecordEl = document.getElementById("scoreRecord");
let goBackBtnEl = document.getElementById("goBackBtn");
let clearHighScoresBtnEl = document.getElementById("clearHighScoresBtn");

// Variables for starting conditions
let secondsRemaining = 60;
let questionNum = 0;
let totalScore = 0;
let questionCount = 1;

// FUNCTIONS
// When quiz starts, begin clock countdown, display a question, hide welcomeBlock, display questionBlock, start at the first question in the quizBank array
function startQuiz() {
    countdown();
    displayQuestion(questionNum);
    questionNum = 0;
    welcomeBlockEl.style.display = "none";
    questionBlockEl.style.display = "block";
}

// Countdown timer starts when you click on Start Quiz
function countdown() {
    let timeInterval = setInterval(function () {
        if (secondsRemaining > 1) {
            // Set the `textContent` of `timeRemainingEl` to show the remaining seconds
            timeRemainingEl.textContent = "Time Remaining: " + secondsRemaining + " seconds";
            // Decrement `secondsRemaining` by 1
            secondsRemaining--;
        }
        else if (secondsRemaining === 1) {
            // When `secondsRemaining` is equal to 1, rename to 'second' instead of 'seconds'
            timeRemainingEl.textContent = "Time Remaining: " + secondsRemaining + " second";
            secondsRemaining--;
        }
        else if (secondsRemaining <= 0) {
            clearInterval(timeInterval);
            timeRemainingEl.textContent = "You're out of time!";
            // If no time  remains present a message at CompletionEl
            completionEl.textContent = "You're out of time!";
            endGame();
        }
        else if (questionCount >= quizBank.length + 1) {
            // End quiz if there are no more questions left in quizBank
            clearInterval(timeInterval);
            endGame();
        }
        else {
            // Once `secondsRemaining` gets to 0, set `timeRemainingEl` to an empty string
            timeRemainingEl.textContent = "You're out of time!";
            // Use `clearInterval()` to stop the timeRemaining
            clearInterval(timeInterval);
            endGame()
        }
    }, 1000);
}

// Use the quizBank to display questions and responses to the appropriate element based on which number question is being asked
function displayQuestion(z) {
    questionNum = z;
    questionTextEl.textContent = quizBank[z].question;
    response1BtnEl.textContent = quizBank[z].responses[0];
    response2BtnEl.textContent = quizBank[z].responses[1];
    response3BtnEl.textContent = quizBank[z].responses[2];
    response4BtnEl.textContent = quizBank[z].responses[3];
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
        // Deduct time for wrong answers
    } else {
        secondsRemaining = secondsRemaining - 10;
        rightWrongEl.textContent = "Wrong! The correct answer is " + quizBank[questionNum].correctAnswer + " .";
    }
    //If there are more questions in the quizBank
    if (questionNum < quizBank.length - 1) {
        // display the next question or end the game
        displayQuestion(questionNum + 1);
    } else {
        endGame();
    }
    questionCount++;
}

// When the game ends hide some parts of the page and display the game score
function endGame() {
    // Hide game clock and question and submit blocks after game ends 
    timeRemainingEl.style.display = "none";
    questionBlockEl.style.display = "none";
    submitBlockEl.style.display = "block";
    // Display your score after the game
    finalScoreEl.textContent = "Congratulations! Your final score is: " + totalScore + " .";
};

// Set player scores and initials to the local storage
function addItem(z) {
    var addedList = recordScore();
    addedList.push(z);
    localStorage.setItem("ScoreList", JSON.stringify(addedList));
};

// Get player scores and initials from local storage
function recordScore() {
    var currentList = localStorage.getItem("ScoreList");
    if (currentList !== null) {
        newList = JSON.parse(currentList);
        return newList;
    } else {
        newList = [];
    }
    return newList;
};

// Save score values to use when posting score to leaderboard
function saveScore() {
    var scoreVal = {
        player: initialsEl.value,
        score: totalScore
    }
    addItem(scoreVal);
    postScore();
}

// Post scores to the score board for the top 5 finishes
function postScore() {
    scoreRecordEl.innerHTML = "";
    scoreRecordEl.style.display = "block";
    var highScores = sort();
    // Slice the high scores array to show only the best in the list. 
    var topFive = highScores.slice(0, 5);
    for (var i = 0; i < topFive.length; i++) {
        var item = topFive[i];
        // Display the players and their scores on the score board
        var li = document.createElement("li");
        li.textContent = item.player + " ==> " + item.score;
        li.setAttribute("data-order", i);
        scoreRecordEl.appendChild(li);
    }
};

// Sorting scores so they appear high to low in the high score ranking list
function sort() {
    var primaryList = recordScore();
    if (recordScore == null) {
        return;
    } else {
        primaryList.sort(function (x, y) {
            return y.score - x.score;
        })
        return primaryList;
    }
};

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

// After clicking on the submit button execute saveScore function
submitBtnEl.addEventListener("click", function (event) {
    event.preventDefault();
    welcomeBlockEl.style.display = "none";
    submitBlockEl.style.display = "none";
    questionBlockEl.style.display = "none";
    scoreBlockEl.style.display = "block";
    saveScore();
});

// Clicking the viewHighScores button will take users to the leaderboard
viewHighScoreBtnEl.addEventListener("click", function (event) {
    event.preventDefault();
    welcomeBlockEl.style.display = "none";
    submitBlockEl.style.display = "none";
    questionBlockEl.style.display = "none";
    scoreBlockEl.style.display = "block";
    postScore();
});

//Clicking the goBack button will return users to the main landing page
goBackBtn.addEventListener("click", function (event) {
    event.preventDefault();
    welcomeBlockEl.style.display = "none";
    submitBlockEl.style.display = "none";
    questionBlockEl.style.display = "none";
    scoreBlockEl.style.display = "block";
    location.reload();
});

//Clicking clearHighScores button clears the local storage and eliminates entries from the leaderboard
clearHighScoresBtnEl.addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.clear();
    postScore();
});