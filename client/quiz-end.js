const questionCategory = document.getElementById("question-category");
const correctAnswers = document.getElementById("correct-answers");
const highScore = document.getElementById("high-score");
const exitButton = document.getElementById("exit-button");
const returnToMainMenuButton = document.getElementById("return-to-main-button");
const replayQuizButton = document.getElementById("replay-quiz");

const baseURL = await import.meta.env.VITE_ServerURL;

function displayQuizInfo() {
  // Set category label
  const categoryText = localStorage.getItem("categoryText");
  questionCategory.textContent = `Category: ${categoryText}`;

  // Get and show number of correct answers from local storage
  const numOfCorrectAnswers = localStorage.getItem("correctAnswers");
  correctAnswers.textContent = `Correct Answers: ${numOfCorrectAnswers}`;

  const userAccount = JSON.parse(localStorage.getItem("userAccount"));
  // Is user signed in?
  if (userAccount) {
    // Show high score for played quiz category and update if beaten
    switch (categoryText) {
      case "General Knowledge":
        updateHighScoreForQuiz(userAccount, "general", numOfCorrectAnswers);
        break;
      case "Film and TV":
        updateHighScoreForQuiz(userAccount, "film", numOfCorrectAnswers);
        break;
      case "Sport and Leisure":
        updateHighScoreForQuiz(userAccount, "sport", numOfCorrectAnswers);
        break;
      case "Music":
        updateHighScoreForQuiz(userAccount, "music", numOfCorrectAnswers);
        break;
      case "Geography":
        updateHighScoreForQuiz(userAccount, "geography", numOfCorrectAnswers);
        break;
      case "History":
        updateHighScoreForQuiz(userAccount, "history", numOfCorrectAnswers);
        break;
      default:
        highScore.textContent = "High Score: Error";
        break;
    }
  } else {
    highScore.textContent = "High Score: Not Logged In";
  }
}

// Update high score for current quiz if new score is higher
function updateHighScoreForQuiz(userAccount, category, correctAnswers) {
  if (correctAnswers > userAccount[`${category}HighScore`]) {
    // Update database
    updateHighScoreInDatabase(userAccount.username, `${category}HighScore`, correctAnswers);
    // Update local storage
    userAccount[`${category}HighScore`] = correctAnswers;
    localStorage.setItem("userAccount", JSON.stringify(userAccount));
  }
  // Display high score
  highScore.textContent = `High Score: ${userAccount[`${category}HighScore`]}`;
}

// Update user's high score for quiz in the database
async function updateHighScoreInDatabase(username, quizCategory, correctAnswers) {
  const data = {
    username: username,
    quizCategory: quizCategory,
    correctAnswers: correctAnswers,
  };
  const result = await fetch(`${baseURL}/users/${username}/${quizCategory}/${correctAnswers}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!result.ok) {
    console.error("Failed to update high score", response.status);
  }
}

// Make exit button return to main menu when clicked
function setupExitButtons() {
  exitButton.addEventListener("click", () => {
    window.location.href = "./index.html";
  });

  returnToMainMenuButton.addEventListener("click", () => {
    window.location.href = "./index.html";
  });
  replayQuizButton.addEventListener("click", () => {
    window.location.href = "./quiz.html";
  });
}

setupExitButtons();
displayQuizInfo();
