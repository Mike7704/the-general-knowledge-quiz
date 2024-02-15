// Seems only Main.js can import VITE_SERVERURL, so allow other .js files to import it from here
export function getBaseURL() {
  return import.meta.env.VITE_SERVERURL;
}

const playButton = document.getElementById("play-quiz");
const leaderboardButton = document.getElementById("leaderboard");
const loginButton = document.getElementById("login");

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

// If these buttons exist, we must be on the main menu/page, so assign listeners
if (playButton && leaderboardButton && loginButton) {
  setupMenuButtons();
}
