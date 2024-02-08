const generalKnowledgeButton = document.getElementById("general-knowledge-button");
const filmAndTvButton = document.getElementById("film-tv-button");
const sportAndLeisureButton = document.getElementById("sport-leisure-button");
const musicButton = document.getElementById("music-button");
const geographyButton = document.getElementById("geography-button");
const historyButton = document.getElementById("history-button");

const backButton = document.getElementById("back-button");

// Give each main menu button a listener to start quiz with selected category
function setupMenuButtons() {
  generalKnowledgeButton.addEventListener("click", () => {
    localStorage.setItem("categoryParam", "general_knowledge");
    localStorage.setItem("categoryText", "General Knowledge");
    window.location.href = "quiz.html";
  });

  filmAndTvButton.addEventListener("click", () => {
    localStorage.setItem("categoryParam", "film_and_tv");
    localStorage.setItem("categoryText", "Film and TV");
    window.location.href = "quiz.html";
  });

  sportAndLeisureButton.addEventListener("click", () => {
    localStorage.setItem("categoryParam", "sport_and_leisure");
    localStorage.setItem("categoryText", "Sport and Leisure");
    window.location.href = "quiz.html";
  });

  musicButton.addEventListener("click", () => {
    localStorage.setItem("categoryParam", "music");
    localStorage.setItem("categoryText", "Music");
    window.location.href = "quiz.html";
  });

  geographyButton.addEventListener("click", () => {
    localStorage.setItem("categoryParam", "geography");
    localStorage.setItem("categoryText", "Geography");
    window.location.href = "quiz.html";
  });

  historyButton.addEventListener("click", () => {
    localStorage.setItem("categoryParam", "history");
    localStorage.setItem("categoryText", "History");
    window.location.href = "quiz.html";
  });

  backButton.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

setupMenuButtons();
