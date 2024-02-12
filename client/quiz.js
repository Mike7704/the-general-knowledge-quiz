const questionCategory = document.getElementById("question-category");
const questionContainer = document.getElementById("question-container");
const answersContainer = document.getElementById("answers-container");
const exitButton = document.getElementById("exit-button");

const baseURL = import.meta.env.VITE_SERVERURL;

let questionNumber = 0;
let categoryParam;
let categoryText;

// Load category from local storage and display it
function getLocalStorage() {
  categoryParam = localStorage.getItem("categoryParam");
  categoryText = localStorage.getItem("categoryText");
  questionCategory.textContent = `Category: ${categoryText}`;
}

// Get a question from the server
async function fetchQuestion() {
  let difficulty = "easy";
  // 25% chance of fetching a medium difficulty question
  if (Math.random() <= 0.25) {
    difficulty = "medium";
  }
  // 5% chance of fetching a hard difficulty question
  if (Math.random() <= 0.05) {
    difficulty = "hard";
  }

  const question = await fetch(`${baseURL}/question?category=${categoryParam}&difficulty=${difficulty}`);
  // Parse into an array
  return await question.json();
}

// Update the display with a new question
async function displayQuestion() {
  let question = await fetchQuestion();
  // Use local storage to track number of correct answers
  localStorage.setItem("correctAnswers", questionNumber);
  questionNumber++;

  questionContainer.innerHTML = ""; // Clear previous question
  answersContainer.innerHTML = ""; // Clear previous answers

  // Create HTML elements
  const questionNumH3Tag = document.createElement("h3");
  const questionH2Tag = document.createElement("h2");
  const answer1ButtonTag = document.createElement("button");
  const answer2ButtonTag = document.createElement("button");
  const answer3ButtonTag = document.createElement("button");
  const answer4ButtonTag = document.createElement("button");
  // Assign text
  questionNumH3Tag.textContent = `Question #${questionNumber}`;
  questionH2Tag.textContent = question.question.text;

  // Store each button into an array to iterate through and assign correct and incorrect answers
  const answerButtons = [answer1ButtonTag, answer2ButtonTag, answer3ButtonTag, answer4ButtonTag];
  assignAnswerButtons(answerButtons, question);

  // Add elements to the display
  questionContainer.appendChild(questionNumH3Tag);
  questionContainer.appendChild(questionH2Tag);
  answersContainer.appendChild(answer1ButtonTag);
  answersContainer.appendChild(answer2ButtonTag);
  answersContainer.appendChild(answer3ButtonTag);
  answersContainer.appendChild(answer4ButtonTag);
}

// Randomise order of answer buttons and give click listeners
function assignAnswerButtons(answerButtons, question) {
  // Select a random button index to be the answer
  const correctAnswerButtonIndex = Math.floor(Math.random() * answerButtons.length);
  // Track index of incorrect answers (incorrect answers are stored in an array of 3)
  let incorrectAnswerIndex = 0;
  // Iterate through each button
  answerButtons.forEach((button, index) => {
    if (index == correctAnswerButtonIndex) {
      // This is the correct answer, clicking it will display a new question
      button.textContent = question.correctAnswer;
      button.addEventListener("click", (event) => {
        event.preventDefault();
        correctAnswer(button);
        disableButtons(answerButtons);
      });
    } else {
      // This is an incorrect answer, clicking it will end the quiz
      button.textContent = question.incorrectAnswers[incorrectAnswerIndex];
      incorrectAnswerIndex++; // Increase index so we end up with 3 different incorrect answers
      button.addEventListener("click", (event) => {
        event.preventDefault();
        // Pass in the correct answer button too so we can show the user the correct answer
        incorrectAnswer(button, answerButtons[correctAnswerButtonIndex]);
        disableButtons(answerButtons);
      });
    }
  });
}

// Show the user they got the question correct and display the next question
function correctAnswer(button) {
  button.style.backgroundColor = "green";
  setTimeout(() => {
    displayQuestion();
  }, 1500);
}

// Show the user the correct answer and end the quiz
function incorrectAnswer(button, correctAnswerButton) {
  button.style.backgroundColor = "darkred";
  correctAnswerButton.style.backgroundColor = "green";
  setTimeout(() => {
    // Make quiz end here
    window.location.href = "./quiz-end.html";
  }, 2000);
}

// Disable buttons after selecting an answer to avoid multiple inputs
function disableButtons(answerButtons) {
  answerButtons.forEach((button) => {
    button.disabled = true;
  });
}

// Make exit button return to main menu when clicked
function setupExitButton() {
  exitButton.addEventListener("click", () => {
    window.location.href = "./index.html";
  });
}

getLocalStorage();
setupExitButton();
displayQuestion();
