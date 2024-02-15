const playButton = document.getElementById("play-quiz");
const leaderboardButton = document.getElementById("leaderboard");
const loginButton = document.getElementById("login");

const baseURL = import.meta.env.VITE_SERVERURL;
console.log(baseURL);

// Give each main menu button a listener to load a page
function setupMenuButtons() {
  playButton.addEventListener("click", () => {
    window.location.href = "./quiz-setup.html";
  });

  leaderboardButton.addEventListener("click", () => {
    window.location.href = "./leaderboard.html";
  });

  loginButton.addEventListener("click", () => {
    window.location.href = "./login.html";
  });
}

setupMenuButtons();
