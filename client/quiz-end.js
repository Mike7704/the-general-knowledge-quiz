const questionCategory = document.getElementById("question-category");
const correctAnswers = document.getElementById("correct-answers");
const highScore = document.getElementById("high-score");
const exitButton = document.getElementById("exit-button");
const returnToMainMenuButton = document.getElementById("return-to-main-button");
const replayQuizButton = document.getElementById("replay-quiz");

const baseURL = import.meta.env.VITE_ServerURL;

function displayQuizInfo() {
  // Set category label
  const categoryText = localStorage.getItem("categoryText");
  questionCategory.textContent = `Category: ${categoryText}`;

  const numOfCorrectAnswers = localStorage.getItem("correctAnswers");

  // Show number of correct answers
  correctAnswers.textContent = `Correct Answers: ${numOfCorrectAnswers}`;

  const userAccount = JSON.parse(localStorage.getItem("userAccount"));
  // Is user signed in?
  if (userAccount) {
    // Show high score for played quiz category and update if beaten
    switch (categoryText) {
      case "General Knowledge":
        if (numOfCorrectAnswers > userAccount.generalHighScore) {
          updateHighScore(userAccount.username, "generalHighScore", numOfCorrectAnswers);
          userAccount.generalHighScore = numOfCorrectAnswers;
          localStorage.setItem("userAccount", JSON.stringify(userAccount));
        }
        highScore.textContent = `High Score: ${userAccount.generalHighScore}`;
        break;
      case "Film and TV":
        if (numOfCorrectAnswers > userAccount.filmHighScore) {
          updateHighScore(userAccount.username, "filmHighScore", numOfCorrectAnswers);
          userAccount.filmHighScore = numOfCorrectAnswers;
          localStorage.setItem("userAccount", JSON.stringify(userAccount));
        }
        highScore.textContent = `High Score: ${userAccount.filmHighScore}`;
        break;
      case "Sport and Leisure":
        if (numOfCorrectAnswers > userAccount.sportHighScore) {
          updateHighScore(userAccount.username, "sportHighScore", numOfCorrectAnswers);
          userAccount.sportHighScore = numOfCorrectAnswers;
          localStorage.setItem("userAccount", JSON.stringify(userAccount));
        }
        highScore.textContent = `High Score: ${userAccount.sportHighScore}`;
        break;
      case "Music":
        if (numOfCorrectAnswers > userAccount.musicHighScore) {
          updateHighScore(userAccount.username, "musicHighScore", numOfCorrectAnswers);
          userAccount.musicHighScore = numOfCorrectAnswers;
          localStorage.setItem("userAccount", JSON.stringify(userAccount));
        }
        highScore.textContent = `High Score: ${userAccount.musicHighScore}`;
        break;
      case "Geography":
        if (numOfCorrectAnswers > userAccount.geographyHighScore) {
          updateHighScore(userAccount.username, "geographyHighScore", numOfCorrectAnswers);
          userAccount.geographyHighScore = numOfCorrectAnswers;
          localStorage.setItem("userAccount", JSON.stringify(userAccount));
        }
        highScore.textContent = `High Score: ${userAccount.geographyHighScore}`;
        break;
      case "History":
        if (numOfCorrectAnswers > userAccount.historyHighScore) {
          updateHighScore(userAccount.username, "historyHighScore", numOfCorrectAnswers);
          userAccount.historyHighScore = numOfCorrectAnswers;
          localStorage.setItem("userAccount", JSON.stringify(userAccount));
        }
        highScore.textContent = `High Score: ${userAccount.historyHighScore}`;
        break;
      default:
        highScore.textContent = "High Score: Error";
        break;
    }
  } else {
    highScore.textContent = "High Score: Not Logged In";
  }
}

// Update high score for quiz
async function updateHighScore(username, quizCategory, correctAnswers) {
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
  if (result.ok) {
    //
  } else {
    console.error("Failed to update high score", response.status);
  }
}

// Make exit button return to main menu when clicked
function setupExitButtons() {
  exitButton.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  returnToMainMenuButton.addEventListener("click", () => {
    window.location.href = "index.html";
  });
  replayQuizButton.addEventListener("click", () => {
    window.location.href = "quiz.html";
  });
}

setupExitButtons();
displayQuizInfo();
