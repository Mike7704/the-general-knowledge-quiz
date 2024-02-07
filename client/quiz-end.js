const questionCategory = document.getElementById("question-category");
const correctAnswers = document.getElementById("correct-answers");
const leaderboardPosition = document.getElementById("leaderboard-position");
const exitButton = document.getElementById("exit-button");
const returnToMainMenuButton = document.getElementById("return-to-main-button");

function displayQuizInfo() {
  // Set category label
  const categoryText = localStorage.getItem("categoryText");
  questionCategory.textContent = `Category: ${categoryText}`;

  // Show number of correct answers
  correctAnswers.textContent = "Correct Answers: " + localStorage.getItem("correctAnswers");

  // Sow leaderboard position
  leaderboardPosition.textContent = "Leaderboard Position:";
}

// Make exit button return to main menu when clicked
function setupExitButton() {
  exitButton.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  returnToMainMenuButton.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

setupExitButton();
displayQuizInfo();