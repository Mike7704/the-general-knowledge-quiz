const usersContainer = document.getElementById("users-container");
const backButton = document.getElementById("back-button");

const baseURL = import.meta.env.VITE_ServerURL;

// Get users from database
async function fetchUsers() {
  const users = await fetch(`${baseURL}/users?username=admin&password=admin123`);
  // Parse into an array
  return await users.json();
}

// Iterate through database and generate html elements for each message
async function displayUsers() {
  let users = await fetchUsers();
  usersContainer.innerHTML = ""; // Clear previous users

  // slice(1) ignores the first element (admin)
  users.slice(1).forEach((user) => {
    // Create HTML elements
    let userDivTag = document.createElement("div");
    let usernamePTag = document.createElement("p");
    let generalPTag = document.createElement("p");
    let filmPTag = document.createElement("p");
    let musicPTag = document.createElement("p");
    let sportPTag = document.createElement("p");
    let historyPTag = document.createElement("p");
    let geographyPTag = document.createElement("p");

    userDivTag.classList.add("user-container");

    // Set content of HTML elements
    usernamePTag.textContent = user.username;
    generalPTag.textContent = user.generalHighScore;
    filmPTag.textContent = user.filmHighScore;
    sportPTag.textContent = user.sportHighScore;
    musicPTag.textContent = user.musicHighScore;
    geographyPTag.textContent = user.geographyHighScore;
    historyPTag.textContent = user.historyHighScore;

    userDivTag.appendChild(usernamePTag);
    userDivTag.appendChild(generalPTag);
    userDivTag.appendChild(filmPTag);
    userDivTag.appendChild(sportPTag);
    userDivTag.appendChild(musicPTag);
    userDivTag.appendChild(geographyPTag);
    userDivTag.appendChild(historyPTag);
    usersContainer.appendChild(userDivTag);
  });
}

// Give each main menu button a listener to load a page
function setupMenuButtons() {
  backButton.addEventListener("click", () => {
    window.location.href = "./index.html";
  });
}

setupMenuButtons();
displayUsers();
