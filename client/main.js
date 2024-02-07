const playButton = document.getElementById("play-quiz");
const leaderboardButton = document.getElementById("leaderboard");
const loginButton = document.getElementById("login");

// Give each main menu button a listener to load a page
function setupMenuButtons() {
  playButton.addEventListener("click", () => {
    window.location.href = "quiz-setup.html";
  });

  leaderboardButton.addEventListener("click", () => {
    window.location.href = "leaderboard.html";
  });

  loginButton.addEventListener("click", () => {
    window.location.href = "login.html";
  });
}

setupMenuButtons();
