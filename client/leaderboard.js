const backButton = document.getElementById("back-button");

// Give each main menu button a listener to load a page
function setupMenuButtons() {
  backButton.addEventListener("click", () => {
    window.location.href = "./index.html";
  });
}

setupMenuButtons();
