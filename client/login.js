const form = document.getElementById("form");
const infoMessage = document.getElementById("info-message");
const backButton = document.getElementById("back-button");

const baseURL = import.meta.env.VITE_ServerURL;

// Listen to form login and register buttons
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Create a FormData object from the form
  const formData = new FormData(form);
  // Access the values of the username and password inputs
  const usernameInput = formData.get("username");
  const passwordInput = formData.get("password");

  // The form uses 2 submit buttons so get the button clicked (login or register user)
  const button = event.submitter.id;
  if (button === "login-button") {
    loginUser(usernameInput, passwordInput);
  } else if (button === "register-button") {
    createUser(formData);
  }
});

// Check if the user has entered a username and password to login in with
async function loginUser(usernameInput, passwordInput) {
  let user = await fetchUser(usernameInput, passwordInput);
  // Has the server found and returned the user?
  if (user.length > 0) {
    // Login the user
    infoMessage.textContent = `Signed in as: ${usernameInput}`;
    // Store account info in local storage
    localStorage.setItem("userAccount", JSON.stringify(user[0]));
  } else {
    // Incorrect username or password
    infoMessage.textContent = "Incorrect username or password";
  }
}

// Create a new user to add to the database using the given username and password
async function createUser(formData) {
  // Read form data (username and password)
  const userData = Object.fromEntries(formData);

  // Send data to server to add a new user to the database
  const response = await fetch(`${baseURL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (response.ok) {
    infoMessage.textContent = "Account successfully created";
  } else {
    infoMessage.textContent = "Username already exists";
    console.error("Failed to create user", response.status);
  }
}

// Get a user from the users database with the given username and password
async function fetchUser(usernameParam, passwordParam) {
  const user = await fetch(`${baseURL}/users?username=${usernameParam}&password=${passwordParam}`);
  // Parse into an array
  return await user.json();
}

// Give each main menu button a listener to load a page
function setupMenuButtons() {
  backButton.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

setupMenuButtons();
