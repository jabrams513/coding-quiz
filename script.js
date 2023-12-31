// Assign variables to DOM elements and attributes
let viewHighScoreBtnEl = document.getElementById("viewHighScoreBtn");
let timeRemainingEl = document.getElementById("clock");

let welcomeBlockEl = document.getElementById("welcomeBlock");
let startQuizBtnEl = document.getElementById("startQuizBtn");

let questionBlockEl = document.getElementById("questionBlock");
let questionTextEl = document.getElementById("questionText");
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
let addedList = JSON.parse(localStorage.getItem("ScoreList")) || [];

// FUNCTIONS
// When quiz starts, begin clock countdown, display a question, hide welcomeBlock, display questionBlock, start at the first question in the quizBank array
function startQuiz() {
    countdown();
    displayQuestion()
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
        else if (questionNum === quizBank.length) {
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
function displayQuestion() {
    var buttonBox = document.getElementById("button-box");
    buttonBox.innerHTML = ""
    questionTextEl.textContent = quizBank[questionNum].question;
    quizBank[questionNum].responses.forEach(function (response) {
        var li = document.createElement("li");
        var responseBtn = document.createElement("button");
        responseBtn.setAttribute("class", "button response");
        responseBtn.setAttribute("value", response);
        responseBtn.textContent = response;
        responseBtn.onclick = function (event) {
            evaluateResponse(event)
        };
        li.appendChild(responseBtn);
        buttonBox.appendChild(li);
    })
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
        totalScore += 1;
        // Deduct time for wrong answers
    } else {
        secondsRemaining -= 10;
        rightWrongEl.textContent = "Wrong! The correct answer is " + quizBank[questionNum].correctAnswer + " .";
    }
    questionNum++;
    //If there are more questions in the quizBank
    if (questionNum < quizBank.length) {
        // display the next question or end the game
        displayQuestion();
    } else {
        endGame();
    }
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
function addItem(scoreObject) {
    addedList.push(scoreObject);
    localStorage.setItem("ScoreList", JSON.stringify(addedList));
};

// Save score values to use when posting score to leaderboard
function saveScore() {
    let scoreVal = {
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
    addedList.sort(function (x, y) {
        return y.score - x.score;
    })
    // Slice the high scores array to show only the best in the list. 
    let topFive = addedList.slice(0, 5);
    for (let i = 0; i < topFive.length; i++) {
        let item = topFive[i];
        // Display the players and their scores on the score board
        let li = document.createElement("li");
        li.textContent = item.player + " ==> " + item.score;
        li.setAttribute("data-order", i);
        scoreRecordEl.appendChild(li);
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