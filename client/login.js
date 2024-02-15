import { getBaseURL } from "./main.js";
const baseURL = await getBaseURL();

const form = document.getElementById("form");
const registerButton = document.getElementById("register-button");
const loginButton = document.getElementById("login-button");
const logoutButton = document.getElementById("logout-button");
const deleteButton = document.getElementById("delete-button");
const infoMessage = document.getElementById("info-message");
const backButton = document.getElementById("back-button");

let userAccount = JSON.parse(localStorage.getItem("userAccount"));

// Listen to form login and register buttons
function setupFormListener() {
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
}
// Check if the user has entered a username and password to login in with
async function loginUser(usernameInput, passwordInput) {
  let user = await fetchUser(usernameInput, passwordInput);
  // Has the server found and returned the user?
  if (user.length > 0) {
    // Login the user
    infoMessage.textContent = `Logged in as: ${usernameInput}`;
    // Store account info in local storage
    localStorage.setItem("userAccount", JSON.stringify(user[0]));
    userAccount = JSON.parse(localStorage.getItem("userAccount"));
    // Show delete and logout button
    registerButton.disabled = true;
    loginButton.disabled = true;
    deleteButton.style.visibility = "visible";
    logoutButton.style.visibility = "visible";
  } else {
    // Incorrect username or password
    infoMessage.textContent = "Incorrect username or password";
  }
}

// Logout user by setting local storage to null
function logoutUser() {
  // Hide logout button
  localStorage.setItem("userAccount", null);
  registerButton.disabled = false;
  loginButton.disabled = false;
  deleteButton.style.visibility = "hidden";
  logoutButton.style.visibility = "hidden";
  infoMessage.textContent = `You have been logged out`;
}

// Display info depending on user login state
function checkUserIsLoggedIn() {
  infoMessage.style.visibility = "visible";
  // User is not logged in so hide logout button
  if (!userAccount || userAccount === null || userAccount === undefined) {
    registerButton.disabled = false;
    loginButton.disabled = false;
    deleteButton.style.visibility = "hidden";
    logoutButton.style.visibility = "hidden";
  }
  // User is logged in so show who they are signed in as
  else {
    registerButton.disabled = true;
    loginButton.disabled = true;
    deleteButton.style.visibility = "visible";
    logoutButton.style.visibility = "visible";
    infoMessage.textContent = `Logged in as: ${userAccount.username}`;
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
    infoMessage.textContent = "Account successfully created, please now login";
  } else {
    infoMessage.textContent = "Username already exists";
    console.error("Failed to create user", response.status);
  }
}

// Delete user account from the database
async function deleteUser() {
  // Need username and password to delete the account
  const result = await fetch(`${baseURL}/users/${userAccount.username}/${userAccount.password}`, {
    method: "DELETE",
  });
  if (result.ok) {
    logoutUser();
    infoMessage.textContent = "Account successfully deleted, you have been logged out";
  } else {
    console.error("Failed to delete account", response.status);
  }
}

// Get a user from the users database with the given username and password
async function fetchUser(usernameParam, passwordParam) {
  const user = await fetch(`${baseURL}/users?username=${usernameParam}&password=${passwordParam}`);
  // Parse into an array
  return await user.json();
}

// Give each menu button a listener
function setupMenuButtons() {
  logoutButton.addEventListener("click", () => {
    logoutUser();
  });

  deleteButton.addEventListener("click", () => {
    deleteUser();
  });

  backButton.addEventListener("click", () => {
    window.location.href = "./index.html";
  });
}

setupMenuButtons();
setupFormListener();
checkUserIsLoggedIn();
